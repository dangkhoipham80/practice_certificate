import { useCallback, useRef, useState } from 'react';

/**
 * Two-pane layout with a draggable vertical divider (pointer events).
 */
export function ResizableColumns({
  left,
  right,
  initialLeftPercent = 36,
  minLeftPercent = 18,
  minRightPercent = 22,
  className = '',
}) {
  const [leftPercent, setLeftPercent] = useState(initialLeftPercent);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const draggingRef = useRef(false);

  const onDividerPointerDown = useCallback((e) => {
    draggingRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }, []);

  const updateFromClientX = useCallback(
    (clientX) => {
      const el = containerRef.current;
      if (!el) return;
      const { left: x0, width } = el.getBoundingClientRect();
      if (width <= 0) return;
      const pct = ((clientX - x0) / width) * 100;
      setLeftPercent(Math.min(100 - minRightPercent, Math.max(minLeftPercent, pct)));
    },
    [minLeftPercent, minRightPercent]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      updateFromClientX(e.clientX);
    },
    [updateFromClientX]
  );

  const endDrag = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex min-h-[220px] overflow-hidden ${className}`}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="min-w-0 shrink-0 overflow-auto" style={{ width: `${leftPercent}%` }}>
        {left}
      </div>
      <div
        role="separator"
        aria-orientation="vertical"
        aria-valuenow={Math.round(leftPercent)}
        title="Drag to resize"
        className={[
          'relative z-[1] w-2 shrink-0 cursor-col-resize touch-none',
          'bg-line/40 transition-colors hover:bg-accent-400/60 dark:bg-gh-border dark:hover:bg-accent-500/50',
          isDragging ? 'bg-accent-500/70 dark:bg-accent-500/60' : '',
        ].join(' ')}
        onPointerDown={onDividerPointerDown}
      >
        <span className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-line/80 dark:bg-gh-border" />
      </div>
      <div className="min-w-0 flex-1 overflow-auto">{right}</div>
    </div>
  );
}
