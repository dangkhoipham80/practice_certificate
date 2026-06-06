import {
  ANSWER_AREA_FORMATS,
  TEMPLATE_LANGUAGES,
  handleCodeTextareaKeyDown,
  normalizeAnswerAreaFormat,
} from '../../lib/codeTemplateFormat';

function patchAnswerArea(uiConfig, patchUiConfig, partial) {
  const prev = uiConfig.answer_area ?? {};
  const format = normalizeAnswerAreaFormat(partial.format ?? prev.format ?? 'code');
  const answer_area = { ...prev, ...partial, format };

  if (format === 'text') {
    const text = answer_area.text_template ?? answer_area.template ?? uiConfig.template ?? '';
    answer_area.text_template = text;
    answer_area.template = text;
    return patchUiConfig(uiConfig, { template: text, answer_area });
  }

  if (format === 'both') {
    answer_area.template = answer_area.template ?? '';
    answer_area.text_template = answer_area.text_template ?? '';
    return patchUiConfig(uiConfig, {
      template: answer_area.template,
      answer_area,
    });
  }

  answer_area.template = answer_area.template ?? uiConfig.template ?? '';
  answer_area.text_template = answer_area.text_template ?? '';
  return patchUiConfig(uiConfig, { template: answer_area.template, answer_area });
}

const templateHint =
  'Use {{drop_1}}, {{drop_2}}, … for dropdown blanks. Enter = new line · Tab = indent in code (saved as tab).';

export function AnswerAreaTemplateEditor({ uiConfig, patchDragDrop, patchUiConfig, onUiConfigChange }) {
  const patch = patchUiConfig ?? patchDragDrop;
  const answer_area = uiConfig.answer_area ?? {};
  const format = normalizeAnswerAreaFormat(answer_area.format ?? 'code');
  const language = answer_area.language ?? 'csharp';
  const codeTemplate = format === 'text' ? '' : (answer_area.template ?? uiConfig.template ?? '');
  const textTemplate =
    format === 'code' ? '' : (answer_area.text_template ?? (format === 'text' ? uiConfig.template : '') ?? '');

  function update(partial) {
    onUiConfigChange(patchAnswerArea(uiConfig, patch, partial));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <label className="min-w-[10rem] flex-1">
          <span className="auth-field-label">Answer layout</span>
          <select
            className="auth-input !pl-4 mt-1 w-full text-sm"
            value={format}
            onChange={(e) => {
              const nextFormat = e.target.value;
              if (nextFormat === 'text') {
                update({
                  format: nextFormat,
                  text_template: textTemplate || codeTemplate,
                  template: textTemplate || codeTemplate,
                  language: language === 'plain' ? language : 'plain',
                });
              } else if (nextFormat === 'code') {
                update({
                  format: nextFormat,
                  template: codeTemplate || textTemplate,
                  text_template: '',
                });
              } else {
                update({
                  format: nextFormat,
                  template: codeTemplate,
                  text_template: textTemplate,
                });
              }
            }}
          >
            {ANSWER_AREA_FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>

        {(format === 'code' || format === 'both') && (
          <label className="min-w-[10rem] flex-1">
            <span className="auth-field-label">Code language (optional)</span>
            <select
              className="auth-input !pl-4 mt-1 w-full text-sm"
              value={language}
              onChange={(e) => update({ language: e.target.value })}
            >
              {TEMPLATE_LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      {(format === 'text' || format === 'both') && (
        <label className="block">
          <span className="auth-field-label">
            {format === 'both' ? 'Text / prose block' : 'Answer template (text)'}
          </span>
          <p className="mb-1.5 text-xs text-muted dark:text-slate-500">{templateHint}</p>
          <textarea
            className="auth-input !pl-4 min-h-[100px] w-full resize-y text-sm leading-relaxed"
            spellCheck
            rows={5}
            value={textTemplate}
            placeholder="e.g. Select the appropriate service for each requirement: {{drop_1}} …"
            onChange={(e) => update({ text_template: e.target.value, ...(format === 'text' ? { template: e.target.value } : {}) })}
          />
        </label>
      )}

      {(format === 'code' || format === 'both') && (
        <label className="block">
          <span className="auth-field-label">
            {format === 'both' ? 'Code block' : 'Answer template (code)'}
          </span>
          <p className="mb-1.5 text-xs text-muted dark:text-slate-500">{templateHint}</p>
          <textarea
            className="auth-input !pl-4 min-h-[160px] w-full resize-y overflow-x-auto font-mono text-[13px] leading-[1.5] whitespace-pre [tab-size:4]"
            spellCheck={false}
            rows={10}
            value={codeTemplate}
            onKeyDown={(e) =>
              handleCodeTextareaKeyDown(e, (template) => update({ template, format, language }))
            }
            onChange={(e) => update({ template: e.target.value, format, language })}
          />
        </label>
      )}
    </div>
  );
}
