import { certifications, getCert, isCertReady } from '../../config/certRegistry';
import { useCertContext } from '../../context/CertContext';
import { InfoTile } from '../ui/InfoTile';
import { SectionHeader } from '../ui/SectionHeader';
import { Award, ArrowRight, Layers3, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  const { openCertWorkspace } = useCertContext();
  const readyCerts = certifications.filter((cert) => isCertReady(getCert(cert.id)));
  const readyCount = certifications.filter((c) => c.status === 'Ready').length;

  return (
    <section className="animate-slide-up space-y-6">
      <div className="hero-card">
        <div className="hero-card-accent" />
        <div className="hero-card-accent-2" />
        <div className="relative p-6 sm:p-8">
          <p className="section-kicker">CertForge</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Certification workspace</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-muted dark:text-slate-400">
            Practice exams, flashcards, and progress tracking for multiple certifications — GH-300 and AI-102.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="primary-button" to="/catalog">
              <Layers3 size={16} />
              Browse catalog
            </Link>
            {readyCerts[0] && (
              <button className="secondary-button" onClick={() => openCertWorkspace(readyCerts[0].id)}>
                Open {readyCerts[0].exam}
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <InfoTile label="Ready certs" value={readyCount} />
        <InfoTile label="Total tracks" value={certifications.length} />
        <InfoTile label="AI-102 bank" value={`${certifications.find((c) => c.id === 'ai-102')?.questions ?? 0} Q`} />
      </div>

      <div>
        <SectionHeader
          kicker="Quick access"
          title="Available certifications"
          description="Open a workspace to practice, review flashcards, or browse the full question library."
        />
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {certifications.map((cert) => {
            const ready = isCertReady(getCert(cert.id));
            return (
              <article
                key={cert.id}
                className={`panel flex h-full flex-col p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${ready ? 'cert-card-ready' : 'opacity-90'}`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-500">{cert.provider}</p>
                    <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{cert.exam}</h3>
                    <p className="mt-1 text-sm text-muted dark:text-slate-400">{cert.name}</p>
                  </div>
                  <span className={`status-badge shrink-0 ${ready ? 'status-ready' : 'status-muted'}`}>{cert.status}</span>
                </div>
                <p className="text-sm leading-6 text-muted dark:text-slate-400">{cert.description}</p>
                <div className="mb-4 mt-auto grid grid-cols-2 gap-3 pt-4 text-sm">
                  <InfoTile label="Questions" value={cert.questions || '—'} />
                  <InfoTile label="Quiz pool" value={cert.quizEligible || '—'} />
                </div>
                <button
                  className="primary-button cert-card-cta"
                  disabled={!ready}
                  onClick={() => openCertWorkspace(cert.id)}
                >
                  <Award size={16} />
                  <span>{ready ? 'Open workspace' : 'Coming soon'}</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>

      <div className="panel p-5 sm:p-6">
        <SectionHeader
          kicker="What's new"
          title="AI-102 support"
          description="AI-102 includes 330 questions from ExamTopics (178 MC for quiz)."
        />
        <div className="mt-4 flex items-center gap-2 text-sm text-muted dark:text-slate-400">
          <Sparkles size={16} className="text-accent-500" />
          Topic-based parts, image support, and per-cert progress storage.
        </div>
      </div>
    </section>
  );
}
