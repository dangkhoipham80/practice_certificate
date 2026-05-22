import { Brain, ClipboardList, Flag, Layers3, Play, RotateCcw, Search } from 'lucide-react';
import { gh300Questions } from '../../data/gh300Questions';
import { ActionButton } from '../ui/ActionButton';
import { SectionHeader } from '../ui/SectionHeader';
import { PartGrid } from '../shared/PartGrid';
import { QuizCustomSetup } from './QuizCustomSetup';

export function PracticeSetup({ startQuiz, partProgress }) {
  return (
    <section className="space-y-6">
      <SectionHeader
        kicker="GH-300 practice"
        title="Choose a session"
        description="Random drills, wrong/new pools, custom filters, or practice by exam part — with Check, Reveal, and Try Again."
      />
      <QuizCustomSetup startQuiz={startQuiz} partProgress={partProgress} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[10, 20, 50, 100].map((count) => (
          <ActionButton key={count} icon={Play} label={`Random ${count}`} meta="Mixed question bank" onClick={() => startQuiz({ count, label: `Random · ${count}` })} />
        ))}
        <ActionButton icon={ClipboardList} label="Full bank" meta={`${gh300Questions.length} questions`} onClick={() => startQuiz({ count: 'all', label: `Full Exam · ${gh300Questions.length}` })} />
        <ActionButton icon={Layers3} label="Multi-answer" meta="Multiple choice only" onClick={() => startQuiz({ mode: 'multi', count: 50, label: 'Multi-Select' })} />
        <ActionButton icon={RotateCcw} label="Random wrong" meta="From part progress" onClick={() => startQuiz({ mode: 'wrong', count: 20, label: 'Random Wrong' })} />
        <ActionButton icon={Search} label="Random new" meta="Unanswered only" onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: 'Random New' })} />
        <ActionButton icon={Brain} label="Weak areas" meta="Spaced repetition" onClick={() => startQuiz({ mode: 'weak', count: 'all', label: 'Weak Areas' })} />
        <ActionButton icon={Flag} label="Flagged" meta="Saved for review" onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: 'Flagged' })} />
      </div>
      <div>
        <SectionHeader kicker="Exam parts" title="Focused practice" description="Sequential part runs — progress tracked per question." />
        <PartGrid startQuiz={startQuiz} partProgress={partProgress} />
      </div>
    </section>
  );
}
