import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Home } from './home';
import { PROFILE } from '../../data/profile';
import { PROJECTS } from '../../data/projects';
import { EXPERIENCE } from '../../data/experience';
import { SECTIONS } from '../../shared/sections';

describe('Home', () => {
  let fixture: ComponentFixture<Home>;
  let root: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Home] }).compileComponents();
    fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    root = fixture.nativeElement as HTMLElement;
  });

  it('renders the name and tagline', () => {
    expect(root.querySelector('.masthead__name')?.textContent).toContain(PROFILE.name);
    expect(root.querySelector('.masthead__tagline')?.textContent).toContain(PROFILE.tagline);
  });

  it('renders every project across the featured and compact lists', () => {
    const full = root.querySelectorAll('.project').length;
    const compact = root.querySelectorAll('.compact').length;
    expect(full + compact).toBe(PROJECTS.length);
    expect(full).toBeGreaterThan(0);
    expect(compact).toBeGreaterThan(0);
  });

  it('renders every skill group as a term with all its values', () => {
    const labels = Array.from(root.querySelectorAll('.skills > dt'));
    const values = Array.from(root.querySelectorAll('.skills > dd'));
    expect(labels.length).toBe(PROFILE.skills.length);
    expect(values.length).toBe(PROFILE.skills.length);

    PROFILE.skills.forEach((group, i) => {
      expect(labels[i].textContent).toContain(group.label);
      const chips = Array.from(values[i].querySelectorAll('.tag')).map((c) =>
        c.textContent!.trim(),
      );
      expect(chips).toEqual([...group.items]);
    });
  });

  it('makes every compact project expandable, with its description inside', () => {
    const rows = Array.from(root.querySelectorAll<HTMLElement>('.compact'));
    expect(rows.length).toBeGreaterThan(0);

    for (const row of rows) {
      const details = row.querySelector('details');
      const summary = row.querySelector('summary');
      expect(details).withContext('compact row is a <details>').toBeTruthy();
      expect(summary).withContext('compact row has a <summary>').toBeTruthy();

      const name = summary!.querySelector('.compact__name')!.textContent!.trim();
      const project = PROJECTS.find((p) => p.name === name);
      expect(project).withContext(`"${name}" matches a project`).toBeTruthy();

      const body = row.querySelector('.compact__body');
      expect(body?.textContent).toContain(project!.description.split(/\s+/)[0]);
    }
  });

  it('keeps compact rows collapsed by default', () => {
    for (const details of Array.from(root.querySelectorAll('.compact details'))) {
      expect((details as HTMLDetailsElement).open).toBeFalse();
    }
  });

  it('puts compact project links in the body, not the summary', () => {
    // Anchors inside <summary> fight the disclosure toggle for clicks.
    expect(root.querySelectorAll('.compact summary a').length).toBe(0);
    expect(root.querySelectorAll('.compact__body a').length).toBeGreaterThan(0);
  });

  it('gives the nav a link per section, each pointing at a real element', () => {
    const links = Array.from(root.querySelectorAll<HTMLAnchorElement>('.sectionnav a'));
    expect(links.length).toBe(SECTIONS.length);
    for (const link of links) {
      const id = link.getAttribute('href')?.slice(1) ?? '';
      expect(root.querySelector(`#${id}`)).withContext(`#${id} exists`).toBeTruthy();
    }
  });

  it('renders every role, newest first', () => {
    const roles = root.querySelectorAll('.role');
    expect(roles.length).toBe(EXPERIENCE.length);
    expect(roles[0].querySelector('.role__title')?.textContent).toContain(EXPERIENCE[0].title);
    expect(roles[0].querySelector('.role__meta')?.textContent).toContain('Present');
  });

  it('gives every role highlights and tags', () => {
    for (const role of EXPERIENCE) {
      expect(role.highlights.length).toBeGreaterThan(0);
      expect(role.tags.length).toBeGreaterThan(0);
    }
  });

  it('gives every project at least a description and tags', () => {
    for (const project of PROJECTS) {
      expect(project.description.trim().length).toBeGreaterThan(0);
      expect(project.tags.length).toBeGreaterThan(0);
    }
  });

  it('opens external links safely', () => {
    const external = Array.from(root.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'));
    expect(external.length).toBeGreaterThan(0);
    for (const link of external) {
      expect(link.rel).toContain('noopener');
      // Regression guard: the 2021 site used (click) handlers with no href, which
      // were unreachable by keyboard and un-openable in a new tab.
      expect(link.getAttribute('href')).toBeTruthy();
    }
  });

  it('assembles the email at runtime instead of embedding it in the template', () => {
    const expected = `${PROFILE.email.user}@${PROFILE.email.domain}`;
    expect(root.querySelector<HTMLAnchorElement>(`a[href="mailto:${expected}"]`)).toBeTruthy();
  });

  it('does not publish a phone number', () => {
    expect(root.textContent ?? '').not.toMatch(/\d{3}[-.\s]\d{3}[-.\s]\d{4}/);
  });

  it('shows the current year in the footer', () => {
    const year = String(new Date().getFullYear());
    expect(root.querySelector('.footer')?.textContent).toContain(year);
  });
});
