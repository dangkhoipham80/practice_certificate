/** AI-102 skills-measured domains (Dec 23, 2025) */
export const AI102_DOMAIN_IDS = [
  'plan-manage',
  'generative-ai',
  'agentic',
  'computer-vision',
  'nlp',
  'knowledge-mining',
];

const RULES = [
  {
    id: 'plan-manage',
    weight: 5,
    re: /\b(content safety|responsible ai|content filter|blocklist|prompt shield|harm detection|protected material|moderate (?:text|image|content)|hateful|self-harm|sexual|violence)\b/i,
  },
  {
    id: 'agentic',
    weight: 3,
    re: /\b(agent service|azure ai agent|ai agent|autogen|semantic kernel|multi-?agent|agent framework|agent playground|chatcompletionagent|model context protocol|\bmcp\b|foundry iq|voice live agent|a2a protocol)\b/i,
  },
  {
    id: 'generative-ai',
    weight: 2,
    re: /\b(retrieval augmented|\brag\b|azure openai|openai service|gpt-?|dall-?e|sora|prompt flow|fine-?tun|embedding|chat playground|ground(?:ing)? model|generative ai|prompt engineering|foundry model|responses api)\b/i,
  },
  {
    id: 'computer-vision',
    weight: 2,
    re: /\b(custom vision|image analysis|video indexer|spatial analysis|face api|face detection|object detection|image classification|computer vision|detect objects in images)\b/i,
  },
  {
    id: 'nlp',
    weight: 2,
    re: /\b(luis|clu\b|language understanding|conversational language|speech-to-text|text-to-speech|speech sdk|translator|sentiment|key phrase|entity recognition|pii|question answering|qna|ssml|word error rate|keyword recognition|utterance|intent)\b/i,
  },
  {
    id: 'knowledge-mining',
    weight: 2,
    re: /\b(cognitive search|azure ai search|search index|indexer|skillset|knowledge store|document intelligence|form recognizer|semantic rank|vector (?:index|search)|projection|prebuilt model|composed model|layout model)\b/i,
  },
  {
    id: 'plan-manage',
    weight: 1,
    re: /\b(azure monitor|pricing calculator|private link|subscription key|entra id|multi-service|foundry hub|foundry project|model catalog|cicd|ci\/cd|diagnostic setting|key vault|managed identity|rbac|cost management)\b/i,
  },
];

/** ExamTopics topic → primary domain (majority from keyword classification). */
export const AI102_EXAMTOPIC_PRIMARY_DOMAIN = {
  1: 'plan-manage',
  2: 'computer-vision',
  3: 'nlp',
  4: 'knowledge-mining',
  5: 'computer-vision',
  6: 'generative-ai',
  7: 'nlp',
  8: 'knowledge-mining',
  9: 'plan-manage',
  10: 'generative-ai',
  11: 'nlp',
  12: 'knowledge-mining',
  13: 'computer-vision',
  14: 'nlp',
  15: 'plan-manage',
};

export function classifyAi102Domain(question) {
  const blob = `${question.text ?? ''} ${question.explanation ?? ''}`;
  let best = { id: null, score: 0 };

  for (const rule of RULES) {
    const matches = blob.match(new RegExp(rule.re.source, 'gi'));
    const score = (matches?.length ?? 0) * rule.weight;
    if (score > best.score) best = { id: rule.id, score };
  }

  if (best.id) return best.id;

  const topic = Number(question.topic);
  return AI102_EXAMTOPIC_PRIMARY_DOMAIN[topic] ?? 'plan-manage';
}

export function getDomainLabel(domainId) {
  const labels = {
    'plan-manage': 'Plan and manage an Azure AI solution',
    'generative-ai': 'Implement generative AI solutions',
    agentic: 'Implement an agentic solution',
    'computer-vision': 'Implement computer vision solutions',
    nlp: 'Implement natural language processing solutions',
    'knowledge-mining': 'Implement knowledge mining and information extraction',
  };
  return labels[domainId] ?? domainId;
}

/** Maps Ai102Labs `domain` string to skills-measured domain id. */
export function labDomainToId(labDomain = '') {
  const d = labDomain.toLowerCase();
  if (d.includes('agentic') || d.includes('agent')) return 'agentic';
  if (d.includes('generative ai') && !d.includes('guardrail')) return 'generative-ai';
  if (d.includes('vision') || d.includes('computer vision')) return 'computer-vision';
  if (d.includes('language') || d.includes('nlp') || d.includes('natural language'))
    return 'nlp';
  if (d.includes('knowledge mining') || d.includes('information extraction'))
    return 'knowledge-mining';
  if (d.includes('responsible') || d.includes('plan and manage') || d.includes('guardrail'))
    return 'plan-manage';
  return 'plan-manage';
}
