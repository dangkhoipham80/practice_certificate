export function buildStorageKeys(certId) {
  return {
    history: `certforge-${certId}-history`,
    savedQuiz: `certforge-${certId}-progress`,
    flagged: `certforge-${certId}-flagged`,
    weak: `certforge-${certId}-weak`,
    partProgress: `certforge-${certId}-part-progress`,
    fcKnown: `certforge-${certId}-fc-known`,
    fcUnknown: `certforge-${certId}-fc-unknown`,
  };
}

export function buildExamParts(meta) {
  return {
    partSizes: meta.partSizes ?? [],
    partStarts: meta.partStarts ?? [],
    partTitles: meta.partTitles ?? [],
    topics: meta.topics ?? [],
    GRID_PAGE_SIZE: 50,
  };
}
