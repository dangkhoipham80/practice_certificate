import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Brain,
  ClipboardList,
  Flag,
  Layers3,
  Play,
  RotateCcw,
  Search,
  Sparkles
} from 'lucide-react';
import { gh300Questions } from '../../data/gh300Questions';
import { getUnansweredIndices, getWrongIndices } from '../../lib/progressUtils';
import { ActionButton } from '../ui/ActionButton';
import { Metric } from '../ui/Metric';
import { SectionHeader } from '../ui/SectionHeader';
import { HistoryPanel } from '../shared/HistoryPanel';
import { PartGrid } from '../shared/PartGrid';

export function Dashboard({
  stats,
  history,
  flagged,
  weak,
  partProgress,
  hasSavedQuiz,
  startQuiz,
  resumeQuiz,
  onNavigate
}) {
  const weakCount = Object.keys(weak).length;
  const wrongCount = getWrongIndices(partProgress).length;
  const newCount = getUnansweredIndices(partProgress).length;

  return (
    <section className="animate-slide-up space-y-6">
      <div className="hero-card">
        <div className="hero-card-accent" />
        <div className="hero-card-accent-2" />
        <div className="relative p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="section-kicker">Active certification</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">GH-300 GitHub Copilot</h2>
              <p className="mt-3 text-sm leading-7 text-muted dark:text-slate-400">
                Work through the question bank, isolate weak topics, and keep your review loop tight with focused drills.
              </p>
            </div>
            <span className="status-badge status-ready">{gh300Questions.length} questions ready</span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {hasSavedQuiz && (
              <button className="primary-button" onClick={resumeQuiz}>
                <Play size={16} />
                Resume quiz
              </button>
            )}
            <button className="secondary-button" onClick={() => startQuiz({ mode: 'wrong', count: 20, label: 'Random Wrong' })}>
              Random wrong
            </button>
            <button className="secondary-button" onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: 'Random New' })}>
              Random new
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr]">
            <button className="start-card sm:col-span-2 lg:col-span-1" onClick={() => startQuiz({ count: 20, label: 'GH-300 - Random 20' })}>
              <span className="start-card-icon">
                <Play size={22} fill="currentColor" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-extrabold">Start random 20</span>
                <span className="block text-sm text-muted dark:text-slate-400">Best default for daily practice</span>
              </span>
              <ArrowRight className="ml-auto text-accent-500" size={20} />
            </button>
            <ActionButton icon={Brain} label="Weak areas" meta={`${weakCount} tracked`} onClick={() => startQuiz({ mode: 'weak', count: 'all', label: 'GH-300 - Weak areas' })} />
            <ActionButton icon={Flag} label="Flagged" meta={`${flagged.length} saved`} onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: 'GH-300 - Flagged' })} />
            <ActionButton icon={RotateCcw} label="Random wrong" meta={`${wrongCount} from parts`} onClick={() => startQuiz({ mode: 'wrong', count: 20, label: 'Random Wrong' })} />
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <ActionButton icon={Play} label="Random 10" meta="Quick drill" onClick={() => startQuiz({ count: 10, label: 'Random · 10' })} />
        <ActionButton icon={Play} label="Random 50" meta="Long session" onClick={() => startQuiz({ count: 50, label: 'Random · 50' })} />
        <ActionButton icon={Play} label="Random 100" meta="Marathon" onClick={() => startQuiz({ count: 100, label: 'Random · 100' })} />
        <ActionButton icon={ClipboardList} label="Full exam" meta={`${gh300Questions.length} questions`} onClick={() => startQuiz({ count: 'all', label: 'Full Exam · 337' })} />
        <ActionButton icon={Layers3} label="Multi only" meta="Multiple-answer pool" onClick={() => startQuiz({ mode: 'multi', count: 50, label: 'Multi-Select' })} />
        <ActionButton icon={Search} label="Random new" meta={`${newCount} unanswered`} onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: 'Random New' })} />
        <ActionButton icon={BookOpen} label="Flashcards" meta={`Up to ${gh300Questions.length} cards`} onClick={() => onNavigate('flashcards')} />
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Attempts" value={stats.attempts} icon={Award} highlight />
        <Metric label="Average" value={`${stats.avg}%`} icon={BarChart3} />
        <Metric label="Best score" value={`${stats.best}%`} icon={Sparkles} variant="success" />
        <Metric label="Answered" value={stats.answered} icon={ClipboardList} variant="warning" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <div className="mb-4 flex items-end justify-between gap-3">
            <SectionHeader kicker="Exam parts" title="Focused sets" description="Compact drills mapped to the GH-300 bank." />
            <button className="secondary-button hidden sm:inline-flex" onClick={() => onNavigate('flashcards')}>
              <BookOpen size={16} />
              Flashcards
            </button>
          </div>
          <PartGrid startQuiz={startQuiz} partProgress={partProgress} compact />
        </div>
        <HistoryPanel history={history} />
      </div>
    </section>
  );
}
