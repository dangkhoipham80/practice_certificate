import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

function patchKbHtml(html) {
  return html
    .replace(/onclick="tog\(this\)"/g, 'data-kb-toggle="true" role="button" tabindex="0"')
    .replace(/class="w-4 h-4 ml-auto text-gh-400/g, 'class="kb-arr w-4 h-4 ml-auto text-muted');
}

function toggleKbCard(header) {
  const content = header.nextElementSibling;
  const arrow = header.querySelector('.kb-arr');
  if (!content) return;
  content.classList.toggle('hidden');
  if (arrow) arrow.classList.toggle('rotate-180');
}

export function Learn() {
  const [html, setHtml] = useState('');
  const [search, setSearch] = useState('');
  const [loadError, setLoadError] = useState('');

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
    if (!root) return undefined;
    function onClick(event) {
      const header = event.target.closest('[data-kb-toggle]');
      if (header) toggleKbCard(header);
    }
    root.addEventListener('click', onClick);
    return () => root.removeEventListener('click', onClick);
  }, [html]);

  useEffect(() => {
    const root = document.getElementById('kb-learn');
    if (!root) return;
    const query = search.trim().toLowerCase();
    root.querySelectorAll('.kcard').forEach((card) => {
      if (!query) {
        card.style.display = '';
        return;
      }
      card.style.display = card.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
  }, [search, html]);

  return (
    <section className="animate-slide-up space-y-6">
      <div>
        <p className="section-kicker">Study</p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">Knowledge Base</h2>
        <p className="mt-2 text-sm leading-7 text-muted dark:text-slate-400">
          Nội dung học từ GH-300 Pro — Copilot fundamentals, prompt engineering, enterprise, và hướng dẫn thi.
        </p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <a
            className="font-semibold text-accent-600 hover:underline dark:text-accent-300"
            href="https://learn.microsoft.com/en-us/training/paths/copilot/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Part 1 (Microsoft Learn)
          </a>
          <a
            className="font-semibold text-accent-600 hover:underline dark:text-accent-300"
            href="https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Part 2 (Microsoft Learn)
          </a>
        </div>
      </div>

      <div className="panel flex items-center gap-3 p-4">
        <Search className="shrink-0 text-accent-500" size={18} />
        <input
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted/70"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search knowledge base..."
        />
      </div>

      {loadError && <div className="empty-state">{loadError}</div>}
      {!loadError && !html && <div className="empty-state">Đang tải Knowledge Base…</div>}
      {html && <div id="kb-learn" className="learn-kb space-y-4 lg:columns-2 lg:gap-4" dangerouslySetInnerHTML={{ __html: html }} />}
    </section>
  );
}
