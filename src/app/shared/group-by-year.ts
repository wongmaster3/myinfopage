import { Project } from '../data/projects';

export interface ProjectGroup {
  /** null for projects with no known year. */
  readonly year: number | null;
  readonly label: string;
  readonly projects: readonly Project[];
}

/**
 * Groups projects under year headings, newest year first. Order within a year is the
 * order they appear in `PROJECTS`, so the data file stays the place to express
 * "which of my 2021 projects matters most".
 *
 * Anything without a year collects into a trailing "Earlier" group rather than being
 * dropped or guessed at.
 */
export function groupByYear(projects: readonly Project[]): readonly ProjectGroup[] {
  const dated = projects.filter((p) => p.year != null);
  const undated = projects.filter((p) => p.year == null);

  const years = [...new Set(dated.map((p) => p.year as number))].sort((a, b) => b - a);

  const groups: ProjectGroup[] = years.map((year) => ({
    year,
    label: String(year),
    projects: dated.filter((p) => p.year === year),
  }));

  if (undated.length > 0) {
    groups.push({ year: null, label: 'Earlier', projects: undated });
  }

  return groups;
}

/** Featured projects, grouped by year for full display. */
export function featured(projects: readonly Project[]): readonly ProjectGroup[] {
  return groupByYear(projects.filter((p) => p.featured));
}

/**
 * Everything not featured, newest first, for the compact "More" list. Undated entries
 * sort last so the list still reads chronologically.
 */
export function rest(projects: readonly Project[]): readonly Project[] {
  return projects
    .filter((p) => !p.featured)
    .slice()
    .sort((a, b) => {
      // Explicit null handling: `(b.year ?? -Infinity) - (a.year ?? -Infinity)` would
      // yield NaN for two undated projects, which is undefined comparator behaviour.
      if (a.year == null && b.year == null) return 0;
      if (a.year == null) return 1;
      if (b.year == null) return -1;
      return b.year - a.year;
    });
}
