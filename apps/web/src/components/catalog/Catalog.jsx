import { Play, ArrowRight, Award } from 'lucide-react';
import { useCertContext } from '../../context/CertContext';
import { useAuth } from '../../context/AuthContext';
import { CertificationsAdmin } from '../admin/CertificationsAdmin';
import { InfoTile } from '../ui/InfoTile';
import { SectionHeader } from '../ui/SectionHeader';

export function Catalog({ startQuiz }) {
  const { certifications, openCertWorkspace } = useCertContext();
  const { isAdmin } = useAuth();

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="Certification catalog"
        title="Training paths"
        description="Certifications loaded from the database, with a workspace available when their question bank is ready."
      />
      {isAdmin && <CertificationsAdmin />}
      <div className="grid gap-5 md:grid-cols-3">
        {certifications.map((cert) => {
          const ready = cert.status === 'Ready' && cert.quizEligibleCount > 0;
          const displayStatus = ready ? cert.status : cert.questionCount > 0 ? cert.status : 'No questions';
          return (
            <article className={`panel flex h-full flex-col p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${ready ? 'cert-card-ready' : 'opacity-90'}`} key={cert.id}>
              <div className="mb-6 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-500">{cert.provider}</p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{cert.exam}</h3>
                  <p className="mt-1 text-sm text-muted dark:text-slate-400">{cert.name}</p>
                </div>
                <span className={`status-badge shrink-0 ${ready ? 'status-ready' : 'status-muted'}`}>{displayStatus}</span>
              </div>
              <p className="mb-4 text-sm leading-6 text-muted dark:text-slate-400">{cert.description}</p>
              <div className="mb-6 grid grid-cols-2 gap-3 text-sm">
                <InfoTile label="Level" value={cert.level} />
                <InfoTile label="Questions" value={cert.questionCount || '—'} />
                <InfoTile label="Quiz pool" value={cert.quizEligibleCount || '—'} />
                <InfoTile label="Provider" value={cert.provider} />
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  className="primary-button cert-card-cta"
                  onClick={() => openCertWorkspace(cert.id)}
                >
                  <Award size={16} />
                  <span>Open workspace</span>
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
