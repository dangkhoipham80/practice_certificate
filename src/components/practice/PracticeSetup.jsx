import { Brain, ClipboardList, Flag, Layers3, Play, RotateCcw, Search } from 'lucide-react';
import { getQuizQuestions } from '../../config/certRegistry';
import { ActionButton } from '../ui/ActionButton';
import { SectionHeader } from '../ui/SectionHeader';
import { PartGrid } from '../shared/PartGrid';
import { QuizCustomSetup } from './QuizCustomSetup';

export function PracticeSetup({ cert, startQuiz, partProgress }) {
  const quizCount = getQuizQuestions(cert).length;
  const sectionLabel = cert.id.startsWith('ai-') ? 'topics' : 'parts';

  return (
    <section className="space-y-6">
      <SectionHeader
        kicker={`${cert.exam} practice`}
        title="Choose a session"
        description="Random drills, wrong/new pools, custom filters, or practice by exam section — with Check, Reveal, and Try Again."
      />
      <QuizCustomSetup cert={cert} startQuiz={startQuiz} partProgress={partProgress} />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {[10, 20, 50, 100].map((count) => (
          <ActionButton key={count} icon={Play} label={`Random ${count}`} meta="Mixed question bank" onClick={() => startQuiz({ count, label: `${cert.exam} · Random ${count}` })} />
        ))}
        <ActionButton icon={ClipboardList} label="Full bank" meta={`${quizCount} MC questions`} onClick={() => startQuiz({ count: 'all', label: `${cert.exam} · Full Exam` })} />
        <ActionButton icon={Layers3} label="Multi-answer" meta="Multiple choice only" onClick={() => startQuiz({ mode: 'multi', count: 50, label: `${cert.exam} · Multi-Select` })} />
        <ActionButton icon={RotateCcw} label="Random wrong" meta="From part progress" onClick={() => startQuiz({ mode: 'wrong', count: 20, label: `${cert.exam} · Random Wrong` })} />
        <ActionButton icon={Search} label="Random new" meta="Unanswered only" onClick={() => startQuiz({ mode: 'unanswered', count: 20, label: `${cert.exam} · Random New` })} />
        <ActionButton icon={Brain} label="Weak areas" meta="Spaced repetition" onClick={() => startQuiz({ mode: 'weak', count: 'all', label: `${cert.exam} · Weak Areas` })} />
        <ActionButton icon={Flag} label="Flagged" meta="Saved for review" onClick={() => startQuiz({ mode: 'flagged', count: 'all', label: `${cert.exam} · Flagged` })} />
      </div>
      <div>
        <SectionHeader kicker={`Exam ${sectionLabel}`} title="Focused practice" description="Sequential section runs — progress tracked per question." />
        <PartGrid cert={cert} startQuiz={startQuiz} partProgress={partProgress} />
      </div>
    </section>
  );
}
