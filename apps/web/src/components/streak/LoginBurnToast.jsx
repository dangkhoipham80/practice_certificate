import { useEffect } from 'react';
import { Flame, X } from 'lucide-react';
import { useCertContext } from '../../context/CertContext';
import { getActiveStreakCerts } from '../../lib/streakUtils';

export function LoginBurnToast({ streaks, burnStreak, onDismiss }) {
  const { certifications } = useCertContext();
  useEffect(() => {
    const timer = setTimeout(onDismiss, burnStreak > 0 ? 5200 : 4000);
    return () => clearTimeout(timer);
  }, [burnStreak, onDismiss]);

  const activeCerts = getActiveStreakCerts(streaks);

  return (
    <div className="login-burn-toast animate-slide-up" role="status" aria-live="polite">
      <div className={`login-burn-toast-inner ${burnStreak > 0 ? 'login-burn-toast-inner--burning' : ''}`}>
        <span className={`login-burn-toast-icon ${burnStreak > 0 ? 'burn-streak-flame' : ''}`}>
          <Flame size={22} />
        </span>
        <div className="min-w-0 flex-1">
          {burnStreak > 0 ? (
            <>
              <p className="text-sm font-extrabold tracking-tight">
                {burnStreak} day streak — it&apos;s burning!
              </p>
              <p className="mt-0.5 text-xs text-muted dark:text-slate-400">
                {activeCerts.map(([certId, count]) => {
                  const cert = certifications.find((item) => item.id === certId);
                  const label = cert?.exam ?? certId;
                  return `${label}: ${count}`;
                }).join(' · ')}
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-extrabold tracking-tight">Welcome back!</p>
              <p className="mt-0.5 text-xs text-muted dark:text-slate-400">
                Finish a quiz today to ignite your streak.
              </p>
            </>
          )}
        </div>
        <button className="icon-button shrink-0" type="button" onClick={onDismiss} title="Dismiss">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
