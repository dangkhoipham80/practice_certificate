import { classifyInteractiveKind } from '../../src/utils/ai102InteractiveKind.js';

const CHOICE_ORDER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

export function normalizeText(text = '', images = []) {
  let result = text.replace(/\r\n/g, '\n').trim();
  if (result.includes('//IMG//') && images.length) {
    const imgTags = images.map((url) => `\n[Image: ${url}]\n`).join('');
    result = result.replace(/\/\/IMG\/\//g, imgTags);
  }
  return result;
}

export function transformRawQuestion(raw, classifyDomain) {
  const images = raw.question_images ?? [];
  const text = normalizeText(raw.question_text, images);
  const topic = String(raw.topic ?? '0');
  const explanation = (raw.answer_description || raw.answer_ET || '').trim();
  const domainId = classifyDomain ? classifyDomain({ text, explanation, topic }) : undefined;
  const base = {
    topic,
    domainId,
    questionId: raw.question_id,
    images,
    explanation: explanation || undefined,
    quizEligible: false,
    type: raw.isMC ? 'mc' : 'interactive',
    choices: [],
    correct: [],
    multiple: false,
  };

  if (!raw.isMC || !raw.choices || !raw.answer) {
    return {
      ...base,
      text,
      questionKind: classifyInteractiveKind(text),
      warn: 'Interactive question — review in library only.',
    };
  }

  const choiceEntries = CHOICE_ORDER.filter((key) => raw.choices[key] !== undefined).map((key) => [
    key,
    String(raw.choices[key]),
  ]);

  if (!choiceEntries.length) {
    return {
      ...base,
      text,
      questionKind: classifyInteractiveKind(text),
      warn: 'Missing choices — review in library only.',
    };
  }

  const choices = choiceEntries.map(([, value]) => value);
  const letterToIndex = Object.fromEntries(choiceEntries.map(([letter], index) => [letter, index]));
  const answerLetters = String(raw.answer)
    .toUpperCase()
    .split('')
    .filter((char) => letterToIndex[char] !== undefined);
  const correct = [...new Set(answerLetters.map((letter) => letterToIndex[letter]))].sort((a, b) => a - b);

  if (!correct.length) {
    return {
      ...base,
      text,
      choices,
      questionKind: classifyInteractiveKind(text),
      warn: 'Answer not mapped — review in library only.',
    };
  }

  return {
    ...base,
    text,
    choices,
    correct,
    multiple: correct.length > 1,
    quizEligible: true,
    type: 'mc',
    questionKind: 'mc',
  };
}

export function buildDomainStats(questions) {
  const stats = {};
  for (const q of questions) {
    const id = q.domainId ?? 'unknown';
    if (!stats[id]) stats[id] = { total: 0, quizEligible: 0, examTopics: {} };
    stats[id].total += 1;
    if (q.quizEligible) stats[id].quizEligible += 1;
    stats[id].examTopics[q.topic] = (stats[id].examTopics[q.topic] ?? 0) + 1;
  }
  return stats;
}

export function buildTopicParts(questions, topics) {
  const partSizes = topics.map((topic) => questions.filter((q) => q.topic === topic).length);
  const partStarts = partSizes.reduce((acc, size, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + partSizes[index - 1]);
    return acc;
  }, []);
  const partTitles = topics.map((topic) => `Topic ${topic}`);
  return { partSizes, partStarts, partTitles, topics };
}

export function buildDomainParts(questions, classifier) {
  const domainIds = classifier.AI102_DOMAIN_IDS;
  const domainOrder = new Map(domainIds.map((id, index) => [id, index]));
  const sortedQuestions = [...questions].sort((a, b) => {
    const domainDelta = (domainOrder.get(a.domainId) ?? 999) - (domainOrder.get(b.domainId) ?? 999);
    if (domainDelta) return domainDelta;
    return a.questionId - b.questionId;
  });
  const partSizes = domainIds.map((domainId) => sortedQuestions.filter((q) => q.domainId === domainId).length);
  const partStarts = partSizes.reduce((acc, size, index) => {
    acc.push(index === 0 ? 0 : acc[index - 1] + partSizes[index - 1]);
    return acc;
  }, []);
  const partTitles = domainIds.map((domainId) => classifier.getDomainLabel(domainId));
  return {
    questions: sortedQuestions,
    parts: {
      partSizes,
      partStarts,
      partTitles,
      partDomains: domainIds,
      topics: [...new Set(sortedQuestions.map((q) => q.topic))].sort((a, b) => Number(a) - Number(b)),
    },
  };
}
