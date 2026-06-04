/**
 * Migrate question banks → PostgreSQL (normalized layout).
 * Prerequisites: alembic upgrade head
 */
import pg from 'pg';
import { loadAllQuestionBanks } from './lib/question-sources.mjs';
import { loadRepoEnv, requireEnv } from './lib/load-env.mjs';

loadRepoEnv();

const { Pool } = pg;

function poolFromEnv() {
  return new Pool({
    host: requireEnv('PGHOST'),
    port: Number(requireEnv('PGPORT')),
    database: requireEnv('PGDATABASE'),
    user: requireEnv('PGUSER'),
    password: requireEnv('PGPASSWORD'),
  });
}

function rowFromQuestion(certId, question, sortOrder) {
  const externalId = question.questionId ?? sortOrder + 1;
  return {
    cert_id: certId,
    external_id: externalId,
    sort_order: sortOrder,
    topic: question.topic ?? null,
    domain_id: question.domainId ?? null,
    question_kind: question.questionKind ?? question.type ?? 'mc',
    type: question.type ?? 'mc',
    quiz_eligible: Boolean(question.quizEligible),
    text: question.text,
    choices: JSON.stringify(question.choices ?? []),
    correct: JSON.stringify(question.correct ?? []),
    multiple: Boolean(question.multiple),
    images: JSON.stringify(question.images ?? []),
    explanation: question.explanation ?? null,
    warn: question.warn ?? null,
    ui_config: JSON.stringify(question.uiConfig ?? {}),
  };
}

async function upsertCertification(client, cert) {
  await client.query(
    `INSERT INTO certifications (
       id, exam_code, name, provider, level, description, status,
       grid_page_size, source_file_count
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     ON CONFLICT (id) DO UPDATE SET
       exam_code = EXCLUDED.exam_code,
       name = EXCLUDED.name,
       provider = EXCLUDED.provider,
       level = EXCLUDED.level,
       description = EXCLUDED.description,
       status = EXCLUDED.status,
       grid_page_size = EXCLUDED.grid_page_size,
       source_file_count = EXCLUDED.source_file_count,
       updated_at = NOW()`,
    [
      cert.id,
      cert.examCode,
      cert.name,
      cert.provider,
      cert.level,
      cert.description,
      cert.status,
      cert.gridPageSize ?? 50,
      cert.sourceFileCount ?? 0,
    ],
  );
}

async function replaceParts(client, certId, parts) {
  await client.query('DELETE FROM certification_parts WHERE cert_id = $1', [certId]);
  for (const part of parts) {
    await client.query(
      `INSERT INTO certification_parts (cert_id, sort_order, domain_id, title, question_count)
       VALUES ($1, $2, $3, $4, $5)`,
      [certId, part.sortOrder, part.domainId ?? null, part.title, part.questionCount],
    );
  }
}

async function replaceQuestions(client, certId, questions) {
  await client.query('DELETE FROM questions WHERE cert_id = $1', [certId]);

  const batchSize = 100;
  for (let offset = 0; offset < questions.length; offset += batchSize) {
    const chunk = questions.slice(offset, offset + batchSize);
    const values = [];
    const params = [];
    let paramIndex = 1;

    for (let i = 0; i < chunk.length; i++) {
      const row = rowFromQuestion(certId, chunk[i], offset + i);
      values.push(
        `($${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}::jsonb, $${paramIndex++}::jsonb, $${paramIndex++}, $${paramIndex++}::jsonb, $${paramIndex++}, $${paramIndex++}, $${paramIndex++}::jsonb)`,
      );
      params.push(
        row.cert_id,
        row.external_id,
        row.sort_order,
        row.topic,
        row.domain_id,
        row.question_kind,
        row.type,
        row.quiz_eligible,
        row.text,
        row.choices,
        row.correct,
        row.multiple,
        row.images,
        row.explanation,
        row.warn,
        row.ui_config,
      );
    }

    await client.query(
      `INSERT INTO questions (
        cert_id, external_id, sort_order, topic, domain_id, question_kind, type,
        quiz_eligible, text, choices, correct, multiple, images, explanation, warn, ui_config
      ) VALUES ${values.join(', ')}`,
      params,
    );
  }
}

async function main() {
  const pool = poolFromEnv();
  const banks = await loadAllQuestionBanks();

  console.log(`Loading ${banks.length} certification banks…`);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    for (const { cert, parts, questions } of banks) {
      await upsertCertification(client, cert);
      await replaceParts(client, cert.id, parts);
      await replaceQuestions(client, cert.id, questions);
      console.log(
        `  ✓ ${cert.examCode} (${cert.id}): ${questions.length} questions, ${parts.length} parts`,
      );
    }

    await client.query('COMMIT');
    console.log('Migration complete.');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

main();
