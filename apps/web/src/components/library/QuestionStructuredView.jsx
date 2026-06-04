import { normalizeDragDropUiConfig } from '../../lib/dragDropUiFormat';
import { getUiConfig } from '../../lib/examQuestionParser';
import { useQuestionTypes } from '../../context/QuestionTypesContext';
import { isDragDropType } from '../../lib/questionUiTypes';
import { DragDropQuestion } from './questionTypes/DragDropQuestion';

export function QuestionStructuredView({ question, readOnly = true }) {
  const { types } = useQuestionTypes();
  const uiConfig = getUiConfig(question);
  if (!uiConfig?.type) return null;

  if (isDragDropType(types, uiConfig.type)) {
    return <DragDropQuestion uiConfig={normalizeDragDropUiConfig(uiConfig)} readOnly={readOnly} />;
  }

  const typeLabel = types.find((t) => t.slug === uiConfig.type)?.label ?? uiConfig.type;

  return (
    <p className="rounded-xl border border-line/70 bg-subtle/50 px-3 py-2 text-xs text-muted dark:border-gh-border dark:bg-gh-subtle/50 dark:text-slate-400">
      Structured type: <span className="font-semibold text-ink dark:text-slate-200">{typeLabel}</span>
      {uiConfig.instruction_text && ` — ${uiConfig.instruction_text.slice(0, 120)}…`}
    </p>
  );
}
