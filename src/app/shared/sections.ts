/** The page's sections, in document order. Drives both the nav and the anchor ids. */
export const SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
] as const;

export type SectionId = (typeof SECTIONS)[number]['id'];
