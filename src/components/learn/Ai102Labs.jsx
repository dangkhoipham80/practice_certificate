import { useMemo } from 'react';
import { AlertTriangle, ExternalLink, FlaskConical } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const SOURCE_LINKS = [
  {
    title: 'AI-102 credential page',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/',
    note: 'Current exam domains and retirement notice.',
  },
  {
    title: 'AI-102T00 course page',
    url: 'https://learn.microsoft.com/training/courses/ai-102t00/',
    note: 'Current course scope: Foundry, agents, generative AI, vision, extraction.',
  },
  {
    title: 'Deprecated AI-102 lab repo',
    url: 'https://github.com/MicrosoftLearning/AI-102-AIEngineer',
    note: 'Microsoft says the old course labs moved to the newer mslearn-* repos.',
  },
];

const OFFICIAL_LABS = [
  {
    title: 'Get Started with Azure AI Services',
    url: 'https://microsoftlearning.github.io/mslearn-ai-services/Instructions/Labs/01-use-azure-ai-services.html',
    level: 'Foundation',
    domain: 'Plan and manage Azure AI solutions',
    source: 'mslearn-ai-services',
    fit: 'High',
    note: 'Provision a multi-service Azure AI resource and call it from app code.',
  },
  {
    title: 'Manage Azure AI Services Security',
    url: 'https://microsoftlearning.github.io/mslearn-ai-services/Instructions/Labs/02-ai-services-security.html',
    level: 'Foundation',
    domain: 'Plan and manage Azure AI solutions',
    source: 'mslearn-ai-services',
    fit: 'High',
    note: 'Keys, endpoints, identities, network access, and secure service usage.',
  },
  {
    title: 'Monitor Azure AI Services',
    url: 'https://microsoftlearning.github.io/mslearn-ai-services/Instructions/Labs/03-monitor-ai-services.html',
    level: 'Foundation',
    domain: 'Plan and manage Azure AI solutions',
    source: 'mslearn-ai-services',
    fit: 'High',
    note: 'Diagnostics, metrics, alerts, and operational visibility.',
  },
  {
    title: 'Use an Azure AI Services Container',
    url: 'https://microsoftlearning.github.io/mslearn-ai-services/Instructions/Labs/04-use-a-container.html',
    level: 'Advanced',
    domain: 'Plan and manage Azure AI solutions',
    source: 'mslearn-ai-services',
    fit: 'Medium',
    note: 'Containerized AI service deployment and endpoint configuration.',
  },
  {
    title: 'Implement Azure AI Content Safety',
    url: 'https://microsoftlearning.github.io/mslearn-ai-services/Instructions/Labs/05-implement-content-safety.html',
    level: 'Core',
    domain: 'Responsible AI and generative AI guardrails',
    source: 'mslearn-ai-services',
    fit: 'High',
    note: 'Moderate harmful content with Azure AI Content Safety.',
  },
  {
    title: 'Prepare for an AI development project',
    url: 'https://microsoftlearning.github.io/mslearn-ai-studio/Instructions/Exercises/01-Explore-ai-studio.html',
    level: 'Foundation',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-ai-studio',
    fit: 'High',
    note: 'Create a Foundry project and understand project assets.',
  },
  {
    title: 'Explore and compare models',
    url: 'https://microsoftlearning.github.io/mslearn-ai-studio/Instructions/Exercises/02-model-catalog-evaluation.html',
    level: 'Foundation',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-ai-studio',
    fit: 'High',
    note: 'Use model catalog and evaluation basics for model selection.',
  },
  {
    title: 'Create a generative AI chat app',
    url: 'https://microsoftlearning.github.io/mslearn-ai-studio/Instructions/Exercises/03-foundry-sdk.html',
    level: 'Core',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-ai-studio',
    fit: 'High',
    note: 'Build a chat app with Foundry SDK patterns.',
  },
  {
    title: 'Create a generative AI app that uses tools',
    url: 'https://microsoftlearning.github.io/mslearn-ai-studio/Instructions/Exercises/04a-use-own-data.html',
    level: 'Core',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-ai-studio',
    fit: 'High',
    note: 'Ground a generative app with your own data and tool usage.',
  },
  {
    title: 'Fine-tune a language model',
    url: 'https://microsoftlearning.github.io/mslearn-ai-studio/Instructions/Exercises/04b-finetune-model.html',
    level: 'Advanced',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-ai-studio',
    fit: 'Medium',
    note: 'Fine-tuning workflow and model customization considerations.',
  },
  {
    title: 'Apply guardrails to prevent harmful output',
    url: 'https://microsoftlearning.github.io/mslearn-ai-studio/Instructions/Exercises/06-Explore-content-filters.html',
    level: 'Core',
    domain: 'Responsible AI and generative AI guardrails',
    source: 'mslearn-ai-studio',
    fit: 'High',
    note: 'Configure content filters and review safety behavior.',
  },
  {
    title: 'Application development with Azure OpenAI Service',
    url: 'https://microsoftlearning.github.io/mslearn-openai/Instructions/Labs/01-app-develop.html',
    level: 'Core',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-openai',
    fit: 'High',
    note: 'Develop apps against Azure OpenAI with SDK/API flow.',
  },
  {
    title: 'Use your own data with Azure OpenAI',
    url: 'https://microsoftlearning.github.io/mslearn-openai/Instructions/Labs/02-use-own-data.html',
    level: 'Core',
    domain: 'Implement generative AI solutions',
    source: 'mslearn-openai',
    fit: 'High',
    note: 'RAG-style grounding with data sources and chat experiences.',
  },
  {
    title: 'Build AI agents with portal and VS Code',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/01-build-agent-portal-and-vscode.html',
    level: 'Foundation',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'High',
    note: 'Create an agent in Foundry and work from portal/VS Code.',
  },
  {
    title: 'Use a custom function in an AI agent',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/02-agent-custom-tools.html',
    level: 'Core',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'High',
    note: 'Define function tools and handle function calls.',
  },
  {
    title: 'Extend agents with MCP tools',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/03-mcp-integration.html',
    level: 'Advanced',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'High',
    note: 'Integrate Model Context Protocol tools into an agent.',
  },
  {
    title: 'Integrate an AI agent with Foundry IQ',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/04-integrate-agent-with-foundry-iq.html',
    level: 'Advanced',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'Medium',
    note: 'Connect agents to enterprise knowledge using Foundry IQ.',
  },
  {
    title: 'Deploy agents to Microsoft Teams and Copilot',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/05a-m365-teams-integration.html',
    level: 'Advanced',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'Medium',
    note: 'Publish and integrate an agent into collaboration surfaces.',
  },
  {
    title: 'Work IQ for AI agents',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/05b-work-iq-integration.html',
    level: 'Advanced',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'Medium',
    note: 'Use workplace intelligence concepts with agents.',
  },
  {
    title: 'Build a workflow in Microsoft Foundry',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/06-build-workflow-ms-foundry.html',
    level: 'Core',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'High',
    note: 'Create a workflow for agentic orchestration.',
  },
  {
    title: 'Develop an Azure AI chat agent with Microsoft Agent Framework',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/07-agent-framework.html',
    level: 'Core',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'High',
    note: 'Build a coded chat agent with Microsoft Agent Framework.',
  },
  {
    title: 'Develop a multi-agent solution with Microsoft Agent Framework',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/08-agent-framework-multi-agents.html',
    level: 'Advanced',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'High',
    note: 'Coordinate multiple agents in a single solution.',
  },
  {
    title: 'Connect to remote agents with A2A protocol',
    url: 'https://microsoftlearning.github.io/mslearn-ai-agents/Instructions/Exercises/09-multi-remote-agents-with-a2a.html',
    level: 'Advanced',
    domain: 'Implement an agentic solution',
    source: 'mslearn-ai-agents',
    fit: 'Medium',
    note: 'Remote agent interoperability using Agent-to-Agent protocol.',
  },
  {
    title: 'Develop a vision-enabled chat app',
    url: 'https://microsoftlearning.github.io/mslearn-ai-vision/Instructions/Exercises/01-gen-ai-vision.html',
    level: 'Core',
    domain: 'Implement computer vision solutions',
    source: 'mslearn-ai-vision',
    fit: 'High',
    note: 'Use image inputs in a generative chat workflow.',
  },
  {
    title: 'Generate images with AI',
    url: 'https://microsoftlearning.github.io/mslearn-ai-vision/Instructions/Exercises/02-generate-image.html',
    level: 'Core',
    domain: 'Implement computer vision solutions',
    source: 'mslearn-ai-vision',
    fit: 'Medium',
    note: 'Generate image outputs and inspect image generation workflow.',
  },
  {
    title: 'Generate video with Sora in Microsoft Foundry',
    url: 'https://microsoftlearning.github.io/mslearn-ai-vision/Instructions/Exercises/03-generate-video.html',
    level: 'Advanced',
    domain: 'Implement computer vision solutions',
    source: 'mslearn-ai-vision',
    fit: 'Low',
    note: 'Useful Foundry exposure, but lower direct AI-102 exam fit.',
  },
  {
    title: 'Analyze images with Azure Content Understanding',
    url: 'https://microsoftlearning.github.io/mslearn-ai-vision/Instructions/Exercises/04-content-understanding.html',
    level: 'Core',
    domain: 'Implement computer vision solutions',
    source: 'mslearn-ai-vision',
    fit: 'High',
    note: 'Extract structured information from visual content.',
  },
  {
    title: 'Analyze Text',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/01-analyze-text.html',
    level: 'Foundation',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'High',
    note: 'Language detection, sentiment, key phrases, and entity extraction.',
  },
  {
    title: 'Develop a text analysis agent',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/02-language-agent.html',
    level: 'Core',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'High',
    note: 'Combine language analysis with an agentic workflow.',
  },
  {
    title: 'Use speech-capable generative AI models',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/03-gen-ai-speech.html',
    level: 'Core',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'High',
    note: 'Use speech input/output with generative models.',
  },
  {
    title: 'Recognize and synthesize speech',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/04-azure-speech.html',
    level: 'Foundation',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'High',
    note: 'Speech-to-text and text-to-speech with Azure AI Speech.',
  },
  {
    title: 'Use Azure Speech in an agent',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/05-azure-speech-mcp.html',
    level: 'Advanced',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'Medium',
    note: 'Expose speech capabilities to an agent through tools.',
  },
  {
    title: 'Develop a Voice Live agent',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/06-voice-live-agent.html',
    level: 'Advanced',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'Medium',
    note: 'Build a real-time voice-based agent in Microsoft Foundry.',
  },
  {
    title: 'Translate text and speech',
    url: 'https://microsoftlearning.github.io/mslearn-ai-language/Instructions/Exercises/07-translation.html',
    level: 'Foundation',
    domain: 'Implement natural language processing solutions',
    source: 'mslearn-ai-language',
    fit: 'High',
    note: 'Translator and speech translation scenarios.',
  },
  {
    title: 'Use prebuilt Document Intelligence models',
    url: 'https://microsoftlearning.github.io/mslearn-ai-document-intelligence/Instructions/Labs/01-use-prebuilt-models.html',
    level: 'Foundation',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-ai-document-intelligence',
    fit: 'High',
    note: 'Analyze receipts, invoices, IDs, and other prebuilt model cases.',
  },
  {
    title: 'Extract Data from Forms',
    url: 'https://microsoftlearning.github.io/mslearn-ai-document-intelligence/Instructions/Labs/02-custom-document-intelligence.html',
    level: 'Core',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-ai-document-intelligence',
    fit: 'High',
    note: 'Train and use a custom extraction model.',
  },
  {
    title: 'Create a composed Document Intelligence model',
    url: 'https://microsoftlearning.github.io/mslearn-ai-document-intelligence/Instructions/Labs/03-composed-model.html',
    level: 'Advanced',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-ai-document-intelligence',
    fit: 'High',
    note: 'Route varied document types through composed models.',
  },
  {
    title: 'Analyze content with Azure AI Content Understanding',
    url: 'https://microsoftlearning.github.io/mslearn-ai-document-intelligence/Instructions/Labs/05-content-understanding.html',
    level: 'Core',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-ai-document-intelligence',
    fit: 'High',
    note: 'Extract information from mixed content using Content Understanding.',
  },
  {
    title: 'Create an Azure AI Search solution',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/01-azure-search.html',
    level: 'Foundation',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Create indexes, data sources, indexers, and run search queries.',
  },
  {
    title: 'Create a Custom Skill for Azure AI Search',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/02-search-skills.html',
    level: 'Advanced',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Extend enrichment pipelines with a custom web API skill.',
  },
  {
    title: 'Create a Knowledge Store with Azure AI Search',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/03-knowledge-store.html',
    level: 'Core',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Persist enriched content projections to a knowledge store.',
  },
  {
    title: 'Enrich an AI search index with custom classes',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/04-exercise-enrich-cognitive-custom-classes.html',
    level: 'Advanced',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'Medium',
    note: 'Use custom classes for enrichment-oriented indexing.',
  },
  {
    title: 'Implement enhancements to search results',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/05-exercise-implement-enhancements-to-search-results.html',
    level: 'Core',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Improve relevance and result presentation for search experiences.',
  },
  {
    title: 'Enrich a search index using an Azure ML model',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/06-exercise-enrich-search-index-use-model.html',
    level: 'Advanced',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'Medium',
    note: 'Invoke a model as part of a search enrichment pipeline.',
  },
  {
    title: 'Add to an index using the push API',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/07-exercise-add-to-index-use-push-api.html',
    level: 'Core',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Populate an index programmatically instead of using an indexer.',
  },
  {
    title: 'Debug search issues',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/08-exercise-debug-search-issues.html',
    level: 'Advanced',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Diagnose indexer, skillset, and query problems.',
  },
  {
    title: 'Set up semantic ranker',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/09-semantic-search-exercise.html',
    level: 'Core',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Enable semantic ranking and compare search results.',
  },
  {
    title: 'Use REST API to run vector search queries',
    url: 'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/10-vector-search-exercise.html',
    level: 'Advanced',
    domain: 'Implement knowledge mining and information extraction',
    source: 'mslearn-knowledge-mining',
    fit: 'High',
    note: 'Create embeddings and query a vector-enabled search index.',
  },
];

const LEGACY_LABS = [
  {
    title: 'Analyze Images with Azure AI Vision',
    url: 'https://microsoftlearning.github.io/AI-102-AIEngineer/Instructions/15-computer-vision.html',
    level: 'Foundation',
    domain: 'Implement computer vision solutions',
    source: 'AI-102-AIEngineer archived',
    fit: 'Medium',
    note: 'Classic Azure AI Vision lab from the archived AI-102 course repo.',
  },
  {
    title: 'Classify Images with Azure AI Custom Vision',
    url: 'https://microsoftlearning.github.io/AI-102-AIEngineer/Instructions/17-image-classification.html',
    level: 'Core',
    domain: 'Implement computer vision solutions',
    source: 'AI-102-AIEngineer archived',
    fit: 'Medium',
    note: 'Useful for Custom Vision coverage when reviewing older objectives.',
  },
  {
    title: 'Detect Objects in Images with Custom Vision',
    url: 'https://microsoftlearning.github.io/AI-102-AIEngineer/Instructions/18-object-detection.html',
    level: 'Core',
    domain: 'Implement computer vision solutions',
    source: 'AI-102-AIEngineer archived',
    fit: 'Medium',
    note: 'Object detection workflow from the older AI-102 lab set.',
  },
  {
    title: 'Detect and Analyze Faces',
    url: 'https://microsoftlearning.github.io/AI-102-AIEngineer/Instructions/19-face.html',
    level: 'Core',
    domain: 'Implement computer vision solutions',
    source: 'AI-102-AIEngineer archived',
    fit: 'Medium',
    note: 'Face service concepts and constraints from the archived labs.',
  },
  {
    title: 'Read Text in Images',
    url: 'https://microsoftlearning.github.io/AI-102-AIEngineer/Instructions/20-ocr.html',
    level: 'Foundation',
    domain: 'Implement computer vision solutions',
    source: 'AI-102-AIEngineer archived',
    fit: 'Medium',
    note: 'OCR lab for image text extraction review.',
  },
];

const LEVELS = ['Foundation', 'Core', 'Advanced'];
const FIT_TONE = {
  High: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200',
  Medium: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200',
  Low: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200',
};

function extractUrls(text = '') {
  const matches = String(text).match(/https?:\/\/[^\s)"']+/g) ?? [];
  return matches.map((url) => url.replace(/[.,;]+$/, ''));
}

function normalizeUrl(url) {
  return url.replace(/\/$/, '');
}

function getStats(labs) {
  return {
    total: labs.length,
    official: labs.filter((lab) => !lab.source.includes('archived')).length,
    highFit: labs.filter((lab) => lab.fit === 'High').length,
    domains: new Set(labs.map((lab) => lab.domain)).size,
  };
}

export function Ai102Labs({ cert }) {
  const discoveredLinks = useMemo(() => {
    const known = new Set([...OFFICIAL_LABS, ...LEGACY_LABS].map((lab) => normalizeUrl(lab.url)));
    const discovered = new Set();
    cert.questions.forEach((q) => {
      const pool = [q.text, q.explanation, ...(q.images ?? [])].join(' ');
      extractUrls(pool).forEach((url) => {
        if (url.includes('microsoftlearning.github.io') || url.toLowerCase().includes('/labs/')) {
          const normalized = normalizeUrl(url);
          if (!known.has(normalized)) {
            discovered.add(normalized);
          }
        }
      });
    });
    return [...discovered].sort((a, b) => a.localeCompare(b));
  }, [cert.questions]);

  const labs = useMemo(() => [...OFFICIAL_LABS, ...LEGACY_LABS], []);
  const stats = useMemo(() => getStats(labs), [labs]);
  const domains = useMemo(() => [...new Set(labs.map((lab) => lab.domain))], [labs]);

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="AI-102 Labs"
        title="Hands-on lab catalog"
        description="Da research tu Microsoft Learn, MicrosoftLearning GitHub Pages va cac repo mslearn-* hien hanh. Labs duoc phan cap de hoc dung trong tam AI-102."
      />

      <div className="grid gap-3 md:grid-cols-4">
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Total labs</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.total}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Current official</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.official}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">High fit</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.highFit}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">AI-102 domains</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.domains}</p>
        </div>
      </div>

      <div className="panel border-amber-200 bg-amber-50/70 p-5 dark:border-amber-400/30 dark:bg-amber-500/10">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" size={20} />
          <div>
            <p className="font-bold text-amber-900 dark:text-amber-100">Research note</p>
            <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-100/80">
              Microsoft lists AI-102 as retiring on June 30, 2026. The old AI-102-AIEngineer repo is archived, so this
              page prioritizes current MicrosoftLearning mslearn-* labs and keeps a small archived section only for
              classic vision coverage.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {SOURCE_LINKS.map((source) => (
          <article className="panel p-5" key={source.url}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold">{source.title}</h3>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">{source.note}</p>
              </div>
              <a className="secondary-button !min-h-9 shrink-0" href={source.url} target="_blank" rel="noopener noreferrer">
                Open
                <ExternalLink size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className="panel p-5">
        <h3 className="text-base font-black">Coverage map</h3>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {domains.map((domain) => (
            <div className="rounded-lg border border-line bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/60" key={domain}>
              <p className="text-sm font-bold">{domain}</p>
              <p className="mt-1 text-xs text-muted dark:text-slate-400">
                {labs.filter((lab) => lab.domain === domain).length} labs
              </p>
            </div>
          ))}
        </div>
      </div>

      {LEVELS.map((level) => {
        const levelLabs = labs.filter((lab) => lab.level === level);
        return (
          <section className="space-y-3" key={level}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Level</p>
                <h2 className="text-2xl font-black text-ink dark:text-slate-100">{level}</h2>
              </div>
              <p className="text-sm font-semibold text-muted dark:text-slate-400">{levelLabs.length} labs</p>
            </div>

            <div className="grid gap-3">
              {levelLabs.map((lab) => (
                <article className="panel p-5" key={lab.url}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-800 dark:bg-sky-500/15 dark:text-sky-200">
                          <FlaskConical size={13} />
                          {lab.source}
                        </span>
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${FIT_TONE[lab.fit]}`}>
                          {lab.fit} AI-102 fit
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-black text-ink dark:text-slate-100">{lab.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-accent dark:text-sky-300">{lab.domain}</p>
                      <p className="mt-2 text-sm text-muted dark:text-slate-400">{lab.note}</p>
                    </div>
                    <a className="secondary-button !min-h-10 shrink-0" href={lab.url} target="_blank" rel="noopener noreferrer">
                      Open lab
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {discoveredLinks.length > 0 && (
        <section className="space-y-3">
          <div>
            <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Discovered from question bank</p>
            <h2 className="text-2xl font-black text-ink dark:text-slate-100">Extra references</h2>
          </div>
          <div className="grid gap-3">
            {discoveredLinks.map((url) => (
              <article className="panel p-5" key={url}>
                <div className="flex items-start justify-between gap-3">
                  <p className="min-w-0 break-all text-sm font-semibold">{url}</p>
                  <a className="secondary-button !min-h-9 shrink-0" href={url} target="_blank" rel="noopener noreferrer">
                    Open
                    <ExternalLink size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
