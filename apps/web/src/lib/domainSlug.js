/** URL-safe slug for certification domains (matches API slug column). */
export function slugifyDomainTitle(title) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  return slug || 'domain';
}

export function isValidDomainSlug(slug) {
  return /^[a-z0-9][a-z0-9-]*$/.test(slug);
}
