export interface SectionTop {
  readonly id: string;
  /** Viewport-relative top edge, i.e. getBoundingClientRect().top. */
  readonly top: number;
}

/**
 * The section a reader is currently "in": the last one whose top edge has passed the
 * cutoff line. Pulled out of the component so the rule is testable without a viewport.
 *
 * Sections are expected in document order. The first is the fallback, so the nav shows
 * something sensible while the page is still scrolled above every heading.
 */
export function activeSectionId(sections: readonly SectionTop[], cutoff: number): string | null {
  if (sections.length === 0) return null;

  let current = sections[0].id;
  for (const section of sections) {
    if (section.top <= cutoff) current = section.id;
  }
  return current;
}
