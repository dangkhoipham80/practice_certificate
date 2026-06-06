import { useMemo } from 'react';
import { buildExamSections, getSectionSizes } from '../lib/examSections';
import { useCertTaxonomy } from './useCertTaxonomy';

export function useExamSections(cert) {
  const { domains, domainLabelMap, loading, source, refreshTaxonomy } = useCertTaxonomy(cert.id);
  const sections = useMemo(() => buildExamSections(cert, domains), [cert, domains]);
  const sectionSizes = useMemo(() => getSectionSizes(sections), [sections]);

  return {
    sections,
    sectionSizes,
    domains,
    domainLabelMap,
    loading,
    source,
    refreshTaxonomy,
  };
}
