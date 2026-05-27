import { ExternalLink } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const LEARN_PATHS = [
  {
    title: 'AI-102 Study Guide (Official)',
    url: 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-102',
    note: 'Skills measured, weight, and latest exam updates.',
  },
  {
    title: 'Prepare for AI-102 Learning Path',
    url: 'https://learn.microsoft.com/en-us/training/paths/prepare-for-ai-engineer/',
    note: 'Core Microsoft Learn path for AI Engineer preparation.',
  },
  {
    title: 'Implement Knowledge Mining with Azure AI Search',
    url: 'https://learn.microsoft.com/en-us/training/paths/implement-knowledge-mining-azure-cognitive-search/',
    note: 'Search, indexers, enrichment, and knowledge store.',
  },
  {
    title: 'Azure OpenAI / Generative AI Learn Collection',
    url: 'https://learn.microsoft.com/en-us/training/paths/develop-ai-solutions-azure-openai/',
    note: 'Prompting, grounding, deployment, and integration basics.',
  },
  {
    title: 'Exam Readiness Zone - AI-102',
    url: 'https://learn.microsoft.com/en-us/shows/exam-readiness-zone/preparing-for-ai-102-01-fy25',
    note: 'Official readiness video series by objective domain.',
  },
];

export function Ai102Learn() {
  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="AI-102 Learn"
        title="Learning Paths & Study Guide"
        description="Tach rieng phan Learn/Path cho AI-102 de ban hoc theo lo trinh chuan Microsoft."
      />

      <div className="grid gap-3">
        {LEARN_PATHS.map((item) => (
          <article className="panel p-5" key={item.url}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">{item.note}</p>
              </div>
              <a
                className="secondary-button !min-h-9"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open
                <ExternalLink size={14} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
