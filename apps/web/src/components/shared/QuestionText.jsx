export function QuestionText({ text, images = [], className = '' }) {
  const imageUrls = images?.length ? images : [];
  const parts = String(text).split(/(\[Image: https?:\/\/[^\]]+\])/g);

  return (
    <div className={className}>
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
        if (!part.trim()) return null;
        return (
          <p key={`text-${index}`} className="whitespace-pre-wrap leading-7">
            {part.trim()}
          </p>
        );
      })}
      {imageUrls.map((url) => {
        if (text.includes(url)) return null;
        return (
          <img
            key={url}
            src={url}
            alt=""
            className="my-3 max-h-80 max-w-full rounded-lg border border-line/70 dark:border-gh-border"
            loading="lazy"
          />
        );
      })}
    </div>
  );
}
