import { useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';

const CURATED_LABS = [
  'https://microsoftlearning.github.io/mslearn-knowledge-mining/Instructions/Labs/03-knowledge-store.html',
  'https://microsoftlearning.github.io/mslearn-openai/Instructions/Exercises/01-get-started-azure-openai.html',
  'https://microsoftlearning.github.io/AI-102-AIEngineer.de-de/Instructions/08-translate-speech.html',
];

function extractUrls(text = '') {
  const matches = String(text).match(/https?:\/\/[^\s)"']+/g) ?? [];
  return matches.map((url) => url.replace(/[.,;]+$/, ''));
}

function humanize(url) {
  try {
    const parsed = new URL(url);
    return `${parsed.hostname}${parsed.pathname}`.replace(/\/$/, '');
  } catch {
    return url;
  }
}

export function Ai102Labs({ cert }) {
  const labLinks = useMemo(() => {
    const set = new Set(CURATED_LABS);
    cert.questions.forEach((q) => {
      const pool = [q.text, q.explanation, ...(q.images ?? [])].join(' ');
      extractUrls(pool).forEach((url) => {
        if (url.includes('microsoftlearning.github.io') || url.toLowerCase().includes('/labs/')) {
          set.add(url);
        }
      });
    });
    return [...set].sort((a, b) => a.localeCompare(b));
  }, [cert.questions]);

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="AI-102 Labs"
        title="Hands-on Labs"
        description="Trang rieng cho labs. Gom tu nguon AI_102 va bo sung cac lab chinh de ban thao tac truc tiep."
      />

      <div className="panel p-5">
        <p className="text-sm text-muted dark:text-slate-400">
          Tong labs links: <span className="font-bold text-ink dark:text-slate-200">{labLinks.length}</span>
        </p>
      </div>

      <div className="grid gap-3">
        {labLinks.map((url) => (
          <article className="panel p-5" key={url}>
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-semibold break-all">{humanize(url)}</p>
              <a className="secondary-button !min-h-9 shrink-0" href={url} target="_blank" rel="noopener noreferrer">
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
