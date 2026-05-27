/**
 * Exam Readiness Zone — AI-102 (6 episodes).
 * Topic bullets distilled from Microsoft prep video transcripts (video_scripts/part_1–6).
 * Exam weights: official study guide (Dec 23, 2025). Video weights noted where they differ.
 */

const MS_BASE = 'https://learn.microsoft.com/en-us/shows/exam-readiness-zone';

export const AI102_EXAM_DOMAINS = [
  {
    id: 'plan-manage',
    title: 'Plan and manage an Azure AI solution',
    weightMin: 20,
    weightMax: 25,
    videoWeight: '10–15%',
    color: 'violet',
  },
  {
    id: 'generative-ai',
    title: 'Implement generative AI solutions',
    weightMin: 15,
    weightMax: 20,
    videoWeight: '25–30% (heaviest in video series)',
    color: 'sky',
    highlight: true,
  },
  {
    id: 'agentic',
    title: 'Implement an agentic solution',
    weightMin: 5,
    weightMax: 10,
    videoWeight: '10–15%',
    color: 'emerald',
  },
  {
    id: 'computer-vision',
    title: 'Implement computer vision solutions',
    weightMin: 10,
    weightMax: 15,
    videoWeight: '15–20%',
    color: 'amber',
  },
  {
    id: 'nlp',
    title: 'Implement natural language processing solutions',
    weightMin: 15,
    weightMax: 20,
    videoWeight: '15–20%',
    color: 'rose',
  },
  {
    id: 'knowledge-mining',
    title: 'Implement knowledge mining and information extraction solutions',
    weightMin: 15,
    weightMax: 20,
    videoWeight: '10–15%',
    color: 'indigo',
  },
];

export const AI102_READINESS_EPISODES = [
  {
    part: 1,
    domainId: 'plan-manage',
    title: 'Plan and manage an Azure AI solution',
    videoUrl: `${MS_BASE}/preparing-for-ai-102-01-fy25`,
    videoWeight: '10–15%',
    studyGuideWeight: '20–25%',
    learningPathMatch: 'Operationalize generative AI applications',
    studyPaths: [
      {
        title: 'Get started with AI apps and agents',
        url: 'https://learn.microsoft.com/en-us/training/paths/get-started-ai-apps-agents/',
      },
      {
        title: 'Operationalize generative AI applications',
        url: 'https://learn.microsoft.com/en-us/training/paths/operationalize-gen-ai-apps/',
      },
    ],
    sections: [
      {
        heading: 'Select services & Foundry',
        topics: [
          'Azure AI Foundry overview — projects, model catalog, portal navigation',
          'Computer Vision: tagging, colors, domain content, brands vs Face API for identity',
          'Language: PII detection, custom NER, feature selection by use case',
          'Four information-extraction model types: pre-trained document analysis, pre-trained scenario, custom extraction, custom classification',
          'Azure AI Search vs Microsoft Search — indexes, crawlers, heterogeneous content, typo tolerance',
          'Model catalog & benchmarks — right model for capability, price, and protections',
        ],
      },
      {
        heading: 'Deploy, SDKs & containers',
        topics: [
          'SDKs/APIs for development goals (e.g. safe prompt with Mistral-Large via Inference API)',
          'Standalone Docker vs Kubernetes for multi-component deployments',
          'Create Azure AI resources in Foundry — keys, endpoints, hub deployment side effects',
          'Default endpoints and CI/CD integration for AI services',
        ],
      },
      {
        heading: 'Monitor, cost & security',
        topics: [
          'Azure Monitor: metrics, alerts, diagnostic settings, activity logs for AI utilization',
          'Azure pricing calculator; cost reporting for consumed AI services',
          'Two keys per service; authentication: subscription key, token, Entra ID (granular permissions)',
        ],
      },
      {
        heading: 'Responsible AI',
        topics: [
          'Six Responsible AI principles',
          'Content Safety: policies, filters, blocklists, prompt shields (user/document/third-party attacks)',
          'Harm detection severity levels (0 = safe through 6 = high)',
          'Responsible AI insights and governance framework components',
        ],
      },
    ],
    examTips: [
      'Practice creating Foundry hub/project resources in a lab to see which resources are provisioned.',
      'Know when to pick Search vs database search vs Bing.',
      'Scenario questions often test service selection, not memorizing model names.',
    ],
  },
  {
    part: 2,
    domainId: 'generative-ai',
    title: 'Implement generative AI solutions',
    videoUrl: `${MS_BASE}/preparing-for-ai-102-02-fy25`,
    videoWeight: '25–30%',
    studyGuideWeight: '15–20%',
    learningPathMatch: 'Develop generative AI apps in Azure',
    studyPaths: [
      {
        title: 'Develop generative AI apps in Azure',
        url: 'https://learn.microsoft.com/en-us/training/paths/develop-generative-ai-apps/',
      },
    ],
    sections: [
      {
        heading: 'Foundry & hub/project',
        topics: [
          'Foundry: portal, SDK, CLI — hub, project, model catalog, management section',
          'Connections: Foundry project ↔ hub; deploy hub + project (know steps)',
          'Deploy generative AI models — identify deployment steps',
        ],
      },
      {
        heading: 'RAG, evaluation & SDK',
        topics: [
          'RAG purpose, phases, and pipeline: chunk → enrich → embed → persist (push/pull documents)',
          'Evaluation: CSV/JSONL test set + Azure OpenAI connection; targets — model+prompt, dataset, prompt flow',
          'Foundry SDK integration, connection strings, prompt templates for system messages',
        ],
      },
      {
        heading: 'Azure OpenAI',
        topics: [
          'Provision/deploy OpenAI resource (corporate email required for access)',
          'Model types: GPT-3.5/4, embeddings, DALL-E; newer GPT for language/code',
          'DALL-E generates images (not image search); chat playground; parameters: max tokens, top_p, message history',
          'Prompt structure: task, prompt, completion; code generation via prompt engineering',
          'Multimodal/multi-agent setup: local env, clone repo, project connection string, Models and Endpoints',
          'Azure OpenAI Assistant; model inference configuration steps',
        ],
      },
      {
        heading: 'Optimize & operationalize',
        topics: [
          'Prompt engineering: clear instructions, grounding content, cues, output composition, system message, few-shot, chain-of-thought',
          'Fine-tuning (e.g. GPT-3.5 Turbo) — expensive; use for essential cases only',
          'Prompt flow lifecycle; model reflection: base model, pre-prod eval, post-prod monitoring',
          'Monitoring, tracing → Application Insights; autoscale; deployment update policies (manual vs automatic)',
          'Edge/local containers; orchestration of multiple generative models',
        ],
      },
    ],
    examTips: [
      'Largest domain in the video series — allocate extra study time even if the study guide shows 15–20%.',
      'Hands-on: chat playground, RAG indexing, and one prompt flow exercise.',
    ],
  },
  {
    part: 3,
    domainId: 'agentic',
    title: 'Implement an agentic solution',
    videoUrl: `${MS_BASE}/preparing-for-ai-102-03-fy25`,
    videoWeight: '10–15%',
    studyGuideWeight: '5–10%',
    learningPathMatch: 'Develop AI agents on Azure',
    studyPaths: [
      {
        title: 'Develop AI agents on Azure',
        url: 'https://learn.microsoft.com/en-us/training/paths/develop-ai-agents-azure/',
      },
    ],
    sections: [
      {
        heading: 'Agents in Foundry',
        topics: [
          'Agent use cases (healthcare, energy, travel, retail, etc.)',
          'Basic vs standard agent setup: multi-tenant (Microsoft-managed) vs single-tenant (customer-owned search/storage)',
          'Create/debug agents — Agent playground (no code), parameters, instructions',
          'Test in playground (e.g. flight search); add intents, training data, actions',
        ],
      },
      {
        heading: 'Frameworks & orchestration',
        topics: [
          'Semantic Kernel: connectors, plugins, planner, memory',
          'AutoGen: multi-agent experimentation and advanced patterns',
          'Multi-agent orchestration — ChatCompletionAgent, search plugins, coordinated workflows',
          'Note: Microsoft Agent Framework is merging SK + AutoGen for newer exams',
        ],
      },
    ],
    examTips: [
      'Study guide weight is 5–10% but videos emphasize 10–15% — do not skip agent labs.',
    ],
  },
  {
    part: 4,
    domainId: 'computer-vision',
    title: 'Implement computer vision solutions',
    videoUrl: `${MS_BASE}/preparing-for-ai-102-04-fy25`,
    videoWeight: '15–20%',
    studyGuideWeight: '10–15%',
    learningPathMatch: 'Develop computer vision solutions with Microsoft Foundry',
    studyPaths: [
      {
        title: 'Develop computer vision with Foundry',
        url: 'https://learn.microsoft.com/en-us/training/paths/develop-computer-vision-with-foundry/',
      },
      {
        title: 'Classic computer vision (Custom Vision, Face, OCR)',
        url: 'https://learn.microsoft.com/en-us/training/paths/create-computer-vision-solutions-azure-cognitive-services/',
      },
    ],
    sections: [
      {
        heading: 'Image Analysis & OCR',
        topics: [
          'Vision Image Analysis: captions, tags, smart crop, objects/people, background removal',
          'Sync API OCR for non-document images; keys, endpoints, SDK/REST',
        ],
      },
      {
        heading: 'Custom Vision',
        topics: [
          'Classification vs object detection; domains: generic, compact, landmarks, food, retail',
          'Workflow: add images → tags → train → publish; quick vs advanced training',
          'Metrics: precision, recall, mAP, probability/overlap thresholds',
          'Publish via Performance tab; prevent overfitting; balanced datasets',
          'Code-first: Python SDK / REST — project, label, train, publish, predict',
        ],
      },
      {
        heading: 'Video & spatial',
        topics: [
          'Spatial Analysis: people counting, entrance counting, social distancing, face mask detection',
          'Video Indexer: 30+ models — transcripts, OCR, faces, topics, emotions on video/live stream',
        ],
      },
    ],
    examTips: [
      'Also review the Classic Vision learning path for Custom Vision and Face scenarios still in objective details.',
    ],
  },
  {
    part: 5,
    domainId: 'nlp',
    title: 'Implement natural language processing solutions',
    videoUrl: `${MS_BASE}/preparing-for-ai-102-05-fy25`,
    videoWeight: '15–20%',
    studyGuideWeight: '15–20%',
    learningPathMatch: 'Develop natural language solutions in Azure',
    studyPaths: [
      {
        title: 'Develop natural language solutions in Azure',
        url: 'https://learn.microsoft.com/en-us/training/paths/develop-language-solutions-azure-ai/',
      },
    ],
    sections: [
      {
        heading: 'Text analytics & translation',
        topics: [
          'Key phrases, entities (NER vs entity linking), sentiment, opinion mining',
          'Language detection with confidence scores; PII detection via Language Studio or REST',
          'Translator: text vs document, transliteration, dictionary lookup, glossaries, format preservation',
        ],
      },
      {
        heading: 'Speech',
        topics: [
          'Speech-to-text / text-to-speech; SSML for voice, style, pronunciation',
          'Custom neural voice (CNV); batch synthesis; keyword spotting vs CLU for intents',
          'Custom Speech: acoustic/language models, online testing, word error rate (WER)',
          'Speech translation: Speech Translator, API, CLI, SDK, Speech Studio',
        ],
      },
      {
        heading: 'Language understanding & QnA',
        topics: [
          'CLU: intents, entities (learned, list, prebuilt), utterances, train/evaluate/deploy',
          'Question answering: import URLs/PDFs/Docs, multi-turn, alternate phrasing, chitchat',
          'Train → test → publish knowledge base; export; multilingual QnA',
          'Active learning, backup/recover LU models; custom translation train/improve/publish',
        ],
      },
    ],
    examTips: [
      'WER and when a custom speech model is “good enough” are common scenario traps.',
    ],
  },
  {
    part: 6,
    domainId: 'knowledge-mining',
    title: 'Implement knowledge mining and information extraction',
    videoUrl: `${MS_BASE}/preparing-for-ai-102-05-fy25`,
    videoWeight: '10–15%',
    studyGuideWeight: '15–20%',
    learningPathMatch: 'Develop AI information extraction solutions in Azure',
    studyPaths: [
      {
        title: 'Develop AI information extraction solutions',
        url: 'https://learn.microsoft.com/en-us/training/paths/ai-extract-information/',
      },
      {
        title: 'Implement knowledge mining with Azure AI Search',
        url: 'https://learn.microsoft.com/en-us/training/paths/implement-knowledge-mining-azure-cognitive-search/',
      },
    ],
    sections: [
      {
        heading: 'Azure AI Search',
        topics: [
          'Indexing + query pipeline; data sources, indexers, skillsets',
          'Field attributes: searchable, filterable, sortable; create-on-update data sources',
          'Query types (simple vs full), parameters: search, queryType, searchFields, select, searchMode',
          'Query stages: parsing → lexical analysis → retrieval → scoring',
          'Knowledge store projections (table, file, object); semantic ranking; vector indexes (key + vector fields)',
        ],
      },
      {
        heading: 'Document Intelligence',
        topics: [
          'Prebuilt models (11+): invoice, receipt, business card, etc. — know what each extracts',
          'Custom extraction vs classification; template, neural, composed models',
          'Layout model: structure analysis, regions of interest, document roles',
          'Standard vs higher-resolution OCR; page-by-page classification',
          'Labeling in Document Intelligence Studio; customer data policies',
        ],
      },
      {
        heading: 'Content Understanding',
        topics: [
          'Process documents, images, video, audio — preprocessing: normalization, tokenization',
          'Semantic analysis; structured insights for search, DBs, apps',
        ],
      },
    ],
    examTips: [
      'Study guide weights this domain at 15–20% — prioritize Search + Document Intelligence labs.',
    ],
  },
];

export function getEpisodeByDomainId(domainId) {
  return AI102_READINESS_EPISODES.find((ep) => ep.domainId === domainId);
}
