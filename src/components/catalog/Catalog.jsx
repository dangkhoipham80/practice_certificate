import { Play } from 'lucide-react';
import { certifications } from '../../config/certifications';
import { InfoTile } from '../ui/InfoTile';
import { SectionHeader } from '../ui/SectionHeader';

export function Catalog({ startQuiz }) {
  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="Certification catalog"
        title="Training paths"
        description="GH-300 is available now. Additional certification sets are staged as placeholders."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {certifications.map((cert) => {
          const ready = cert.id === 'gh-300';
          return (
            <article className={`panel p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${ready ? 'cert-card-ready' : 'opacity-90'}`} key={cert.id}>
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-500">{cert.provider}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{cert.exam}</h3>
                  <p className="mt-1 text-sm text-muted dark:text-slate-400">{cert.name}</p>
                </div>
                <span className={`status-badge ${ready ? 'status-ready' : 'status-muted'}`}>{cert.status}</span>
              </div>
              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                <InfoTile label="Level" value={cert.level} />
                <InfoTile label="Questions" value={cert.questions || 'Seed data'} />
              </div>
              <button className="primary-button w-full" disabled={!ready} onClick={() => startQuiz({ count: 20, label: 'GH-300 - Random 20' })}>
                <Play size={16} />
                {ready ? 'Start practice' : 'Not available'}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
