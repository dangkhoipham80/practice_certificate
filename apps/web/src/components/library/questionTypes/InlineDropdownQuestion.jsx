import { Fragment, useMemo, useState } from 'react';
import { normalizeHotAreaUiConfig } from '../../../lib/hotAreaUiFormat';
import { DropdownCell } from './HotAreaQuestion';

const CONTENT_RE = /(\[Image: https?:\/\/[^\]]+\]|\{\{drop_\d+\}\})/g;
const DROP_RE = /^\{\{(drop_\d+)\}\}$/;

export function InlineDropdownQuestion({
  text,
  images = [],
  uiConfig: rawConfig,
  filled,
  onFilledChange,
  readOnly = false,
  answerOnly = false,
  className = '',
}) {
  const uiConfig = useMemo(() => normalizeHotAreaUiConfig(rawConfig), [rawConfig]);
  const hotspots = uiConfig.answer_area?.hotspots ?? uiConfig.hotspots ?? [];
  const zoneById = Object.fromEntries(hotspots.map((zone) => [zone.id, zone]));
  const correctByZone = Object.fromEntries(
    hotspots.map((zone) => [
      zone.id,
      zone.options?.find((option) => option.id === zone.correct_option_id)?.label ?? '',
    ]),
  );
  const [localFilled, setLocalFilled] = useState({});
  const controlled = onFilledChange != null;
  const displayFilled = answerOnly ? correctByZone : controlled ? (filled ?? {}) : localFilled;
  const dropdownReadOnly = readOnly || answerOnly;
  const parts = String(text).split(CONTENT_RE);

  function updateZone(zoneId, label) {
    if (dropdownReadOnly) return;
    const previous = controlled ? (filled ?? {}) : localFilled;
    const next = { ...previous };
    if (label) next[zoneId] = label;
    else delete next[zoneId];
    if (controlled) onFilledChange(next);
    else setLocalFilled(next);
  }

  return (
    <div className={className}>
      <p className="whitespace-pre-wrap leading-7">
        {parts.map((part, index) => {
          const imageMatch = part.match(/^\[Image: (https?:\/\/[^\]]+)\]$/);
          if (imageMatch) {
            return (
              <img
                key={`img-${index}`}
                src={imageMatch[1]}
                alt=""
                className="my-3 max-h-80 max-w-full rounded-lg border border-line/70 dark:border-gh-border"
                loading="lazy"
              />
            );
          }

          const dropMatch = part.match(DROP_RE);
          if (dropMatch) {
            const zoneId = dropMatch[1];
            const zone = zoneById[zoneId] ?? { id: zoneId, placeholder: zoneId, options: [] };
            const value = displayFilled[zoneId] ?? '';
            return (
              <DropdownCell
                key={`${zoneId}-${index}`}
                zone={zone}
                value={value}
                readOnly={dropdownReadOnly}
                isCorrect={dropdownReadOnly && Boolean(value) && correctByZone[zoneId] === value}
                onChange={(label) => updateZone(zoneId, label)}
              />
            );
          }

          return <Fragment key={`text-${index}`}>{part}</Fragment>;
        })}
      </p>
      {images.map((url) =>
        text.includes(url) ? null : (
          <img
            key={url}
            src={url}
            alt=""
            className="my-3 max-h-80 max-w-full rounded-lg border border-line/70 dark:border-gh-border"
            loading="lazy"
          />
        ),
      )}
    </div>
  );
}
