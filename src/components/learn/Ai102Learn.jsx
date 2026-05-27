import { AlertTriangle, BookOpen, ExternalLink, Route } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const EXAM_RESOURCES = [
  {
    title: 'AI-102 Study Guide',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102',
    note: 'Skills measured as of Dec 23, 2025, including domain weights and retirement note.',
  },
  {
    title: 'Azure AI Engineer Associate credential',
    url: 'https://learn.microsoft.com/en-us/learn/certifications/exams/ai-102',
    note: 'Certification overview, practice assessment, scheduling, and renewal details.',
  },
  {
    title: 'Course AI-102T00-A',
    url: 'https://learn.microsoft.com/en-us/training/courses/ai-102t00',
    note: 'Instructor-led/self-paced course page for developing AI solutions in Azure.',
  },
  {
    title: 'Exam Readiness Zone - AI-102',
    url: 'https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-ai-102-01-fy25',
    note: 'Official readiness videos for reviewing exam objective areas.',
  },
];

const LEARNING_PATHS = [
  {
    phase: 'Start here',
    title: 'Get started with AI applications and agents on Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/get-started-ai-apps-agents/',
    level: 'Beginner',
    modules: 6,
    priority: 'Must do',
    domain: 'Baseline across all AI-102 domains',
    note: 'A fast Microsoft Foundry overview that touches generative AI, agents, text, speech, vision, and information extraction.',
  },
  {
    phase: 'Core path',
    title: 'Develop generative AI apps in Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/develop-generative-ai-apps/',
    level: 'Intermediate',
    modules: 6,
    priority: 'Must do',
    domain: 'Implement generative AI solutions',
    note: 'Plan apps, select and deploy models, build chat apps, use tools, optimize with RAG/fine-tuning, and apply responsible AI.',
  },
  {
    phase: 'Core path',
    title: 'Develop AI agents on Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/develop-ai-agents-azure/',
    level: 'Intermediate',
    modules: 9,
    priority: 'Must do',
    domain: 'Implement an agentic solution',
    note: 'Foundry Agent Service, custom tools, MCP, Foundry IQ, workflows, Microsoft Agent Framework, and multi-agent patterns.',
  },
  {
    phase: 'Core path',
    title: 'Develop natural language solutions in Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/develop-language-solutions-azure-ai/',
    level: 'Intermediate',
    modules: 7,
    priority: 'Must do',
    domain: 'Implement natural language processing solutions',
    note: 'Azure Language in Foundry Tools, language agents, speech-capable apps, speech agents, Voice Live, and translation.',
  },
  {
    phase: 'Core path',
    title: 'Develop AI information extraction solutions in Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/ai-extract-information/',
    level: 'Intermediate',
    modules: 5,
    priority: 'Must do',
    domain: 'Implement knowledge mining and information extraction solutions',
    note: 'Content Understanding, Document Intelligence, prebuilt/custom form extraction, and Azure AI Search knowledge mining.',
  },
  {
    phase: 'Core path',
    title: 'Develop computer vision solutions with Microsoft Foundry',
    url: 'https://learn.microsoft.com/en-us/training/paths/develop-computer-vision-with-foundry/',
    level: 'Intermediate',
    modules: 4,
    priority: 'Must do',
    domain: 'Implement computer vision solutions',
    note: 'Image generation, video generation, Content Understanding for images, and vision-enabled generative apps.',
  },
  {
    phase: 'Deepen',
    title: 'Implement knowledge mining with Azure AI Search',
    url: 'https://learn.microsoft.com/en-us/training/paths/implement-knowledge-mining-azure-cognitive-search/',
    level: 'Intermediate',
    modules: 8,
    priority: 'High value',
    domain: 'Knowledge mining with Azure AI Search',
    note: 'Indexes, custom skills, knowledge stores, semantic ranker, vector search, maintenance, and advanced search features.',
  },
  {
    phase: 'Deepen',
    title: 'Operationalize generative AI applications',
    url: 'https://learn.microsoft.com/en-us/training/paths/operationalize-gen-ai-apps/',
    level: 'Intermediate',
    modules: 6,
    priority: 'High value',
    domain: 'Plan, manage, monitor, and optimize AI solutions',
    note: 'GenAIOps, prompt versioning, evaluation, monitoring, tracing, and production-oriented AI operations.',
  },
  {
    phase: 'Classic review',
    title: 'Develop computer vision solutions in Azure',
    url: 'https://learn.microsoft.com/en-us/training/paths/create-computer-vision-solutions-azure-cognitive-services/',
    level: 'Intermediate',
    modules: 8,
    priority: 'Review',
    domain: 'Classic Vision, Face, OCR, Custom Vision, Video Indexer',
    note: 'Useful for older AI-102 question coverage and services that still appear in objective details.',
  },
];

const DOCS = [
  {
    title: 'Microsoft Foundry documentation',
    url: 'https://learn.microsoft.com/en-us/azure/foundry/',
    note: 'Architecture, models, agents, Foundry Tools, SDKs, monitoring, evaluation, and governance.',
  },
  {
    title: 'Azure AI services documentation',
    url: 'https://learn.microsoft.com/en-us/azure/ai-services/',
    note: 'Service docs for Foundry Models, Agent Service, Language, Speech, Vision, Document Intelligence, and Search-related tooling.',
  },
  {
    title: 'Microsoft Foundry training hub',
    url: 'https://learn.microsoft.com/en-us/training/azure/ai-foundry',
    note: 'Browse all current Foundry training and role-based learning paths.',
  },
];

const PHASES = ['Start here', 'Core path', 'Deepen', 'Classic review'];
const PRIORITY_TONE = {
  'Must do': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-200',
  'High value': 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-200',
  Review: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-200',
};

function getStats(paths) {
  return {
    totalPaths: paths.length,
    totalModules: paths.reduce((sum, path) => sum + path.modules, 0),
    mustDo: paths.filter((path) => path.priority === 'Must do').length,
    domains: new Set(paths.map((path) => path.domain)).size,
  };
}

export function Ai102Learn() {
  const stats = getStats(LEARNING_PATHS);

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="AI-102 Learn"
        title="Microsoft Learn roadmap"
        description="Lo trinh hoc AI-102 da duoc cap nhat theo Microsoft Learn hien hanh: Microsoft Foundry, generative AI, agents, vision, language va information extraction."
      />

      <div className="grid gap-3 md:grid-cols-4">
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Learning paths</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.totalPaths}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Modules</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.totalModules}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Must do</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.mustDo}</p>
        </div>
        <div className="panel p-5">
          <p className="text-xs font-bold uppercase text-muted dark:text-slate-400">Coverage areas</p>
          <p className="mt-2 text-3xl font-black text-ink dark:text-slate-100">{stats.domains}</p>
        </div>
      </div>

      <div className="panel border-amber-200 bg-amber-50/70 p-5 dark:border-amber-400/30 dark:bg-amber-500/10">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-300" size={20} />
          <div>
            <p className="font-bold text-amber-900 dark:text-amber-100">Exam status</p>
            <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-100/80">
              Microsoft says AI-102 retires on June 30, 2026. The study guide currently uses the Dec 23, 2025 skills
              measured list, so this roadmap prioritizes the newer Microsoft Foundry paths over older Azure Cognitive
              Services-only material.
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="text-accent" size={20} />
          <h2 className="text-2xl font-black text-ink dark:text-slate-100">Official exam resources</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {EXAM_RESOURCES.map((item) => (
            <article className="panel p-5" key={item.url}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted dark:text-slate-400">{item.note}</p>
                </div>
                <a className="secondary-button !min-h-9 shrink-0" href={item.url} target="_blank" rel="noopener noreferrer">
                  Open
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {PHASES.map((phase) => {
        const paths = LEARNING_PATHS.filter((path) => path.phase === phase);
        return (
          <section className="space-y-3" key={phase}>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div className="flex items-center gap-2">
                <Route className="text-accent" size={20} />
                <h2 className="text-2xl font-black text-ink dark:text-slate-100">{phase}</h2>
              </div>
              <p className="text-sm font-semibold text-muted dark:text-slate-400">{paths.length} paths</p>
            </div>

            <div className="grid gap-3">
              {paths.map((path) => (
                <article className="panel p-5" key={path.url}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${PRIORITY_TONE[path.priority]}`}>
                          {path.priority}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                          {path.level}
                        </span>
                        <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-bold text-violet-800 dark:bg-violet-500/15 dark:text-violet-200">
                          {path.modules} modules
                        </span>
                      </div>
                      <h3 className="mt-3 text-lg font-black text-ink dark:text-slate-100">{path.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-accent dark:text-sky-300">{path.domain}</p>
                      <p className="mt-2 text-sm text-muted dark:text-slate-400">{path.note}</p>
                    </div>
                    <a className="secondary-button !min-h-10 shrink-0" href={path.url} target="_blank" rel="noopener noreferrer">
                      Open path
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <section className="space-y-3">
        <h2 className="text-2xl font-black text-ink dark:text-slate-100">Reference docs</h2>
        <div className="grid gap-3 md:grid-cols-3">
          {DOCS.map((doc) => (
            <article className="panel p-5" key={doc.url}>
              <div className="flex h-full flex-col gap-4">
                <div>
                  <h3 className="text-base font-bold">{doc.title}</h3>
                  <p className="mt-1 text-sm text-muted dark:text-slate-400">{doc.note}</p>
                </div>
                <a className="secondary-button mt-auto !min-h-9 self-start" href={doc.url} target="_blank" rel="noopener noreferrer">
                  Open
                  <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
