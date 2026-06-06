import { parseExplanationBlocks } from './parseExplanationBlocks';

/** Convert explanation text (with auto-detected code) into markdown for rendering. */
export function explanationToMarkdown(text) {
  const blocks = parseExplanationBlocks(text);
  return blocks
    .map((block) => {
      if (block.type === 'code') {
        const lang = block.language && block.language !== 'plain' ? block.language : '';
        return `\`\`\`${lang}\n${block.content}\n\`\`\``;
      }
      return block.content;
    })
    .join('\n\n');
}
