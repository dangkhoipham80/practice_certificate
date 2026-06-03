import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import {
  Award,
  ArrowLeft,
  Lock,
  Mail,
  User,
  Sparkles,
  ShieldCheck,
  Layers3,
  Loader2,
} from 'lucide-react';

const ROLE_LABELS = {
  student: 'Student',
  teacher: 'Teacher',
  admin: 'Admin',
};

const BRAND_FEATURES = [
  {
    icon: Layers3,
    title: 'Multi-cert workspace',
    description: 'Practice GH-300, AI-102, and more from one place.',
  },
  {
    icon: Sparkles,
    title: 'Smart study tools',
    description: 'Quizzes, flashcards, and progress tracking built in.',
  },
  {
    icon: ShieldCheck,
    title: 'Role-based access',
    description: 'Students, teachers, and admins each get the right view.',
  },
];

export function AuthPage({ mode }) {
  const isLogin = mode === 'login';
  const { login, register, error, clearError, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [dark] = useState(() => localStorage.getItem('certforge-theme') === 'dark');

  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({ email, password, displayName });
      }
      navigate('/', { replace: true });
    } catch {
      /* error in context */
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="auth-shell">
        <aside className="auth-brand">
          <div className="auth-brand-inner">
            <div className="auth-brand-glow" />
            <div className="auth-brand-glow-2" />

            <div className="relative flex items-center gap-3">
              <span className="auth-logo">
                <Award size={26} />
              </span>
              <div>
                <p className="text-xl font-extrabold tracking-tight">CertForge</p>
                <p className="text-sm text-muted dark:text-slate-400">Certification workspace</p>
              </div>
            </div>

            <div className="relative mt-10">
              <p className="section-kicker">Welcome back</p>
              <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight xl:text-4xl">
                {isLogin ? 'Pick up where you left off' : 'Start your certification journey'}
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-7 text-muted dark:text-slate-400">
                {isLogin
                  ? 'Sign in to sync progress, resume quizzes, and access your personalized study dashboard.'
                  : 'Create a free student account to unlock practice exams, flashcards, and progress tracking.'}
              </p>
            </div>

            <ul className="relative mt-10 space-y-3">
              {BRAND_FEATURES.map(({ icon: Icon, title, description }) => (
                <li key={title} className="auth-feature">
                  <span className="auth-feature-icon">
                    <Icon size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-muted dark:text-slate-400">{description}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="auth-main">
          <Link className="auth-back" to="/">
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <div className="auth-card">
            <nav className="auth-tabs" aria-label="Authentication mode">
              <Link className={`auth-tab ${isLogin ? 'auth-tab-active' : ''}`} to="/login">
                Sign in
              </Link>
              <Link className={`auth-tab ${!isLogin ? 'auth-tab-active' : ''}`} to="/register">
                Register
              </Link>
            </nav>

            <div className="auth-form-body">
              <div className="mb-6 lg:hidden">
                <div className="flex items-center gap-2.5">
                  <span className="auth-logo grid h-10 w-10 place-items-center rounded-xl">
                    <Award size={20} />
                  </span>
                  <div>
                    <p className="text-base font-extrabold tracking-tight">CertForge</p>
                    <p className="text-xs text-muted dark:text-slate-400">
                      {isLogin ? 'Sign in to your account' : 'Create your account'}
                    </p>
                  </div>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <label className="block">
                    <span className="auth-field-label">Display name (optional)</span>
                    <div className="auth-field-wrap">
                      <User className="auth-field-icon" size={16} />
                      <input
                        className="auth-input"
                        type="text"
                        autoComplete="name"
                        placeholder="How should we call you?"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        maxLength={128}
                      />
                    </div>
                  </label>
                )}

                <label className="block">
                  <span className="auth-field-label">Email</span>
                  <div className="auth-field-wrap">
                    <Mail className="auth-field-icon" size={16} />
                    <input
                      className="auth-input"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="auth-field-label">Password</span>
                  <div className="auth-field-wrap">
                    <Lock className="auth-field-icon" size={16} />
                    <input
                      className="auth-input"
                      type="password"
                      autoComplete={isLogin ? 'current-password' : 'new-password'}
                      required
                      minLength={isLogin ? 1 : 8}
                      placeholder={isLogin ? 'Your password' : 'At least 8 characters'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {!isLogin && <p className="auth-hint">Use 8 or more characters for a secure password.</p>}
                </label>

                {error && (
                  <p className="auth-error" role="alert">
                    {error}
                  </p>
                )}

                <button className="primary-button w-full" type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Please wait…
                    </>
                  ) : isLogin ? (
                    'Sign in'
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>
            </div>

            {!isLogin && (
              <p className="auth-footer-note">
                New accounts are registered as students. Teachers and admins are assigned by an administrator.
              </p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export function RoleBadge({ role }) {
  const label = ROLE_LABELS[role] ?? role;
  const tone =
    role === 'admin'
      ? 'bg-accent-100 text-accent-800 dark:bg-accent-500/20 dark:text-accent-200'
      : role === 'teacher'
        ? 'bg-success-100 text-success-800 dark:bg-success-500/20 dark:text-success-200'
        : 'bg-subtle text-muted dark:bg-gh-subtle dark:text-slate-300';
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${tone}`}>
      {label}
    </span>
  );
}
