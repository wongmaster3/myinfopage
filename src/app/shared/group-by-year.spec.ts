import { groupByYear, featured, rest } from './group-by-year';
import { Project } from '../data/projects';
import { PROJECTS } from '../data/projects';

function project(name: string, year?: number, isFeatured = false): Project {
  return { name, description: 'x', tags: ['x'], links: [], year, featured: isFeatured };
}

describe('groupByYear', () => {
  it('orders years newest first', () => {
    const groups = groupByYear([project('a', 2019), project('b', 2026), project('c', 2021)]);
    expect(groups.map((g) => g.year)).toEqual([2026, 2021, 2019]);
  });

  it('collects projects sharing a year into one group', () => {
    const groups = groupByYear([project('a', 2021), project('b', 2019), project('c', 2021)]);
    expect(groups.length).toBe(2);
    expect(groups[0].projects.map((p) => p.name)).toEqual(['a', 'c']);
  });

  it('preserves the authored order within a year', () => {
    const groups = groupByYear([project('first', 2021), project('second', 2021)]);
    expect(groups[0].projects.map((p) => p.name)).toEqual(['first', 'second']);
  });

  it('puts undated projects in a trailing "Earlier" group', () => {
    const groups = groupByYear([project('undated'), project('dated', 2019)]);
    expect(groups.map((g) => g.label)).toEqual(['2019', 'Earlier']);
    expect(groups[1].year).toBeNull();
  });

  it('omits the "Earlier" group when every project has a year', () => {
    const groups = groupByYear([project('a', 2019)]);
    expect(groups.map((g) => g.label)).toEqual(['2019']);
  });

  it('loses no projects', () => {
    const groups = groupByYear(PROJECTS);
    const total = groups.reduce((n, g) => n + g.projects.length, 0);
    expect(total).toBe(PROJECTS.length);
  });

  it('assigns no year in the future', () => {
    const thisYear = new Date().getFullYear();
    for (const p of PROJECTS) {
      if (p.year != null) {
        expect(p.year).toBeLessThanOrEqual(thisYear);
      }
    }
  });
});

describe('featured / rest tiering', () => {
  it('splits on the featured flag with nothing lost or duplicated', () => {
    const inFull = featured(PROJECTS).flatMap((g) => g.projects);
    const inMore = rest(PROJECTS);
    expect(inFull.length + inMore.length).toBe(PROJECTS.length);

    const names = [...inFull, ...inMore].map((p) => p.name);
    expect(new Set(names).size).toBe(PROJECTS.length);
  });

  it('puts only featured projects in the full list', () => {
    for (const p of featured(PROJECTS).flatMap((g) => g.projects)) {
      expect(p.featured).toBeTrue();
    }
    for (const p of rest(PROJECTS)) {
      expect(p.featured).toBeFalsy();
    }
  });

  it('sorts the compact list newest first, undated last', () => {
    const sorted = rest([
      project('old', 2016),
      project('undated'),
      project('new', 2021),
      project('mid', 2019),
    ]);
    expect(sorted.map((p) => p.name)).toEqual(['new', 'mid', 'old', 'undated']);
  });

  it('does not reorder two undated projects into a NaN comparison', () => {
    const sorted = rest([project('a'), project('b')]);
    expect(sorted.map((p) => p.name)).toEqual(['a', 'b']);
  });

  it('features at least one project, so the section is never only a compact list', () => {
    expect(featured(PROJECTS).length).toBeGreaterThan(0);
  });
});
