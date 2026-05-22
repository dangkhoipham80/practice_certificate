import { useEffect, useMemo, useState } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import { SectionHeader } from './components/ui/SectionHeader';

const CHEVRON_SVG =
  '<svg class="kb-chevron-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

function patchKbHtml(html) {
  return html
    .replace(/onclick="tog\(this\)"/g, 'data-kb-toggle="true"')
    .replace(/<button([^>]*?)data-kb-toggle/g, '<button type="button"$1data-kb-toggle')
    .replace(/<div([^>]*?)data-kb-toggle/g, '<div$1role="button" tabindex="0" data-kb-toggle')
    .replace(/class="hidden /g, 'class="kb-content ')
    .replace(/class="hidden"/g, 'class="kb-content"');
}

function isChevronSvg(svg) {
  const path = svg.querySelector('path')?.getAttribute('d') ?? '';
  return /M19\s*9|m6\s*9/i.test(path) || svg.classList.contains('arr') || svg.classList.contains('kb-arr');
}

function attachChevron(toggle) {
  toggle.querySelectorAll('svg').forEach((svg) => {
    if (isChevronSvg(svg)) svg.remove();
  });
  if (toggle.querySelector('.kb-chevron')) return;
  const wrap = document.createElement('span');
  wrap.className = 'kb-chevron';
  wrap.innerHTML = CHEVRON_SVG;
  toggle.appendChild(wrap);
}

function normalizeKbRoot(root) {
  root.querySelectorAll('.kcard').forEach((card) => {
    card.classList.add('kb-card');
    const toggle = card.querySelector('[data-kb-toggle]');
    if (toggle) {
      toggle.classList.add('kb-header');
      attachChevron(toggle);
      toggle.querySelectorAll('div').forEach((el) => {
        if (el.querySelector(':scope > svg') && !el.closest('.kb-chevron')) el.classList.add('kb-module-icon');
      });
    }

    const content =
      card.querySelector('.kb-content') ??
      [...card.children].find((el) => el !== toggle && !el.hasAttribute('data-kb-toggle'));
    if (!content) return;

    content.classList.remove('hidden');
    content.classList.add('kb-content');
    content.setAttribute('aria-hidden', card.classList.contains('kb-open') ? 'false' : 'true');
    if (!content.querySelector(':scope > .kb-content-inner')) {
      const inner = document.createElement('div');
      inner.className = 'kb-content-inner';
      while (content.firstChild) inner.appendChild(content.firstChild);
      content.appendChild(inner);
    }
  });

  root.querySelectorAll('div.text-xs.font-bold.uppercase').forEach((el) => {
    if (/Part \d|Fundamentals|Enterprise/i.test(el.textContent)) el.classList.add('kb-section-label');
  });
}

function setKbCardOpen(card, open) {
  const trigger = card.querySelector('[data-kb-toggle]');
  const content = card.querySelector('.kb-content');
  card.classList.toggle('kb-open', open);
  trigger?.setAttribute('aria-expanded', open ? 'true' : 'false');
  content?.setAttribute('aria-hidden', open ? 'false' : 'true');
}

function toggleKbCard(trigger) {
  const card = trigger.closest('.kcard');
  if (!card) return;
  setKbCardOpen(card, !card.classList.contains('kb-open'));
}

export function Learn() {
  const [html, setHtml] = useState('');
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState('');
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    fetch('/knowledge-base.html')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load');
        return response.text();
      })
      .then((text) => setHtml(patchKbHtml(text)))
      .catch(() => setLoadError('Không tải được Knowledge Base. Kiểm tra file public/knowledge-base.html.'));
  }, []);

  useEffect(() => {
    const root = document.getElementById('kb-learn');
    if (!root || !html) return undefined;
    normalizeKbRoot(root);

    function onClick(event) {
      const trigger = event.target.closest('[data-kb-toggle]');
      if (trigger) {
        event.preventDefault();
        toggleKbCard(trigger);
      }
    }

    function onKeyDown(event) {
      const trigger = event.target.closest('[data-kb-toggle]');
      if (!trigger) return;
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleKbCard(trigger);
      }
    }

    root.addEventListener('click', onClick);
    root.addEventListener('keydown', onKeyDown);
    return () => {
      root.removeEventListener('click', onClick);
      root.removeEventListener('keydown', onKeyDown);
    };
  }, [html]);

  useEffect(() => {
    const root = document.getElementById('kb-learn');
    if (!root) return;
    const query = search.trim().toLowerCase();
    let visible = 0;
    root.querySelectorAll('.kcard').forEach((card) => {
      const match = !query || card.textContent.toLowerCase().includes(query);
      card.style.display = match ? '' : 'none';
      if (match) {
        visible += 1;
        if (query) setKbCardOpen(card, true);
      } else {
        setKbCardOpen(card, false);
      }
    });
    setVisibleCount(visible);
  }, [search, html]);

  const totalCards = useMemo(() => {
    if (!html) return 0;
    return (html.match(/class="kcard/g) ?? []).length;
  }, [html]);

  function expandAll() {
    document.getElementById('kb-learn')?.querySelectorAll('.kcard:not([style*="none"])').forEach((card) => {
      setKbCardOpen(card, true);
    });
  }

  function collapseAll() {
    document.getElementById('kb-learn')?.querySelectorAll('.kcard').forEach((card) => {
      setKbCardOpen(card, false);
    });
  }

  return (
    <section className="animate-slide-up space-y-6">
      <SectionHeader
        kicker="Study"
        title="Knowledge Base"
        description="Nội dung học GH-300 — mở từng chủ đề để đọc. Layout một cột ổn định, không nhảy khi expand."
      />

      <div className="flex flex-wrap gap-3 text-sm">
        <a
          className="inline-flex items-center gap-1.5 font-semibold text-accent-600 hover:underline dark:text-accent-300"
          href="https://learn.microsoft.com/en-us/training/paths/copilot/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Part 1 — Microsoft Learn
          <ExternalLink size={14} />
        </a>
        <a
          className="inline-flex items-center gap-1.5 font-semibold text-accent-600 hover:underline dark:text-accent-300"
          href="https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Part 2 — Microsoft Learn
          <ExternalLink size={14} />
        </a>
      </div>

      <div className="panel p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Search className="shrink-0 text-accent-500" size={18} />
            <input
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search topics, modules, exam domains..."
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button className="ghost-button !px-3 !py-1.5 text-xs" type="button" onClick={expandAll}>
              Expand all
            </button>
            <button className="ghost-button !px-3 !py-1.5 text-xs" type="button" onClick={collapseAll}>
              Collapse all
            </button>
          </div>
        </div>
        {html && (
          <p className="mt-2 text-xs text-muted dark:text-slate-500">
            {search.trim()
              ? `${visibleCount} / ${totalCards} topics match`
              : `${totalCards} topics · click a row to expand`}
          </p>
        )}
      </div>

      {loadError && <div className="empty-state">{loadError}</div>}
      {!loadError && !html && <div className="empty-state">Đang tải Knowledge Base…</div>}
      {html && (
        <div
          id="kb-learn"
          className="learn-kb"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </section>
  );
}
