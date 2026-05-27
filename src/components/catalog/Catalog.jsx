import { Play, ArrowRight, Award } from 'lucide-react';
import { certifications, getCert, isCertReady } from '../../config/certRegistry';
import { useCertContext } from '../../context/CertContext';
import { InfoTile } from '../ui/InfoTile';
import { SectionHeader } from '../ui/SectionHeader';

export function Catalog({ startQuiz }) {
  const { openCertWorkspace } = useCertContext();

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="Certification catalog"
        title="Training paths"
        description="GH-300 and AI-102 — each with its own workspace, progress tracking, and question bank."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {certifications.map((cert) => {
          const fullCert = getCert(cert.id);
          const ready = isCertReady(fullCert);
          return (
            <article className={`panel flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${ready ? 'cert-card-ready' : 'opacity-90'}`} key={cert.id}>
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-500">{cert.provider}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{cert.exam}</h3>
                  <p className="mt-1 text-sm text-muted dark:text-slate-400">{cert.name}</p>
                </div>
                <span className={`status-badge shrink-0 ${ready ? 'status-ready' : 'status-muted'}`}>{cert.status}</span>
              </div>
              <p className="mb-4 text-sm leading-6 text-muted dark:text-slate-400">{cert.description}</p>
              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                <InfoTile label="Level" value={cert.level} />
                <InfoTile label="Questions" value={cert.questions || '—'} />
                <InfoTile label="Quiz pool" value={cert.quizEligible || '—'} />
                <InfoTile label="Provider" value={cert.provider} />
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  className="primary-button cert-card-cta"
                  disabled={!ready}
                  onClick={() => openCertWorkspace(cert.id)}
                >
                  <Award size={16} />
                  <span>{ready ? 'Open workspace' : 'Not available'}</span>
                </button>
                {ready && (
                  <button
                    className="secondary-button cert-card-cta"
                    onClick={() => {
                      openCertWorkspace(cert.id);
                      startQuiz({ count: 20, label: `${cert.exam} · Random 20` });
                    }}
                  >
                    <Play size={16} />
                    <span>Quick practice 20</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
