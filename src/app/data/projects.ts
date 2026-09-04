/**
 * Project list. Rendered grouped under year headings, newest year first — see
 * `groupByYear` in ../shared/group-by-year.ts.
 *
 * Order *within* a year is the order below, so put the entry you most want seen first.
 *
 * On the `year` values: the 2021 site recorded no dates, so each one below was recovered
 * from a dated artifact and the evidence is noted inline. Anything I could not date is
 * left off rather than guessed — those render in a trailing "Earlier" group.
 */

export interface ProjectLink {
  readonly label: string;
  readonly href: string;
}

export interface Project {
  readonly name: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly links: readonly ProjectLink[];
  /** Omit when unknown; the project then groups under "Earlier". */
  readonly year?: number;
  /**
   * Featured projects get a full entry under their year heading. Everything else drops
   * to a one-line row under "More" — nothing is removed, only de-emphasised, so a
   * high-school Scratch game stops carrying the same weight as a master's thesis.
   */
  readonly featured?: boolean;
}

export const PROJECTS: readonly Project[] = [
  {
    name: 'Personal Website',
    // Repo created 2017-07-27; rebuilt from scratch on Angular 20 in Sept 2026.
    year: 2026,
    featured: true,
    description: `This site. Rebuilt in 2026 on Angular 20 as a single typographic page,
      with all copy driven from two data files.`,
    tags: ['Angular', 'TypeScript', 'CSS'],
    links: [{ label: 'Code', href: 'https://github.com/wongmaster3/myinfopage' }],
  },
  {
    name: 'SharedSpace',
    // Master's ran through May 2021 and the work continued at VisiSonics after.
    year: 2021,
    featured: true,
    description: `A video conferencing system with spatial audio and video layouts, built
      during my master's at the University of Maryland and continued at VisiSonics.`,
    tags: ['Angular', 'Node.js', 'Socket.IO', 'mediasoup'],
    links: [
      { label: 'Paper', href: 'assets/sharedspace_paper.pdf' },
      // Removed 2026-09-02: the old demo at realrooms.visisonics.com no longer has a
      // DNS record. Re-add here if VisiSonics stands it back up.
    ],
  },
  {
    name: 'Measuring IoT Speaker Misactivations',
    // Speaker-Misactivations repo created 2021-03-26, last pushed 2021-05-18.
    year: 2021,
    featured: true,
    description: `A security study assessing the risk of smart-speaker misactivation across
      American, Indian, and British accents. Data collected and analyzed on an Amazon Echo
      Dot and a Google Home Mini.`,
    tags: ['Security', 'Data Analysis'],
    links: [
      { label: 'Code', href: 'https://github.com/wongmaster3/Speaker-Misactivations' },
      { label: 'Paper', href: 'assets/CMSC614_Speaker_Misactivations.pdf' },
    ],
  },
  {
    name: 'Nori Ray Tracer',
    // CMSC740 coursework, taken during the master's (Aug 2020 - May 2021). No dated
    // artifact pins the semester, so this is the least certain year here.
    year: 2021,
    featured: true,
    description: `Extended the Nori ray tracer to render diffuse and specular scenes using
      unidirectional and bidirectional path tracing, with Monte Carlo integration and
      importance sampling.`,
    tags: ['C++', 'Monte Carlo', 'Graphics'],
    links: [{ label: 'Paper', href: 'assets/CMSC740_FinalProject.pdf' }],
  },
  {
    name: 'GoalKeeper',
    // GoalKeeper repo created and pushed 2019-12-22.
    year: 2019,
    description: `A full-stack web app for tracking personal goals, with a social feed.
      Deployed behind a CI/CD pipeline running on GitLab runners.`,
    tags: ['Python', 'Flask', 'SQLAlchemy', 'Docker', 'CI/CD'],
    links: [{ label: 'Code', href: 'https://github.com/wongmaster3/GoalKeeper' }],
  },
  {
    name: 'Analyzing Citibike Data',
    // Collaborator's repo (arunsrinivas20.github.io) created 2019-12-07, pushed 2019-12-16.
    year: 2019,
    description: `Found, analyzed, and visualized NYC Citibike trip data to surface the
      densest source and destination stations and rider segments, then trained and
      cross-validated a model to predict rider gender.`,
    tags: ['Python', 'NumPy', 'scikit-learn'],
    links: [{ label: 'Code', href: 'https://github.com/arunsrinivas20/arunsrinivas20.github.io' }],
  },
  {
    name: 'MeeshQuest',
    // Year confirmed by Matt (2026-09-02); no dated artifact exists for this one.
    year: 2019,
    description: `A scaled-down MapQuest built for CMSC420 (Data Structures): parses an XML
      map definition into PR/PM quadtrees and AVL trees, then answers nearest-neighbor and
      nearest-road queries against it.`,
    tags: ['Java', 'Quadtrees', 'AVL Trees'],
    links: [],
  },
  {
    name: 'Measuring H₂O Water Contamination',
    // Devpost entry ("Water != H2O") posted 2016-12-01, which matches "as a freshman".
    year: 2016,
    description: `An early hackathon project — as a freshman — mapping water contamination
      data across sectors of Maryland onto a web app.`,
    tags: ['Web App', 'Hackathon'],
    links: [{ label: 'Featured article', href: 'https://devpost.com/software/not-just-h2o' }],
  },
  {
    name: 'Betting Game',
    // Scratch project 89911232 ("Bet Game") created 2015-12-02, shared 2015-12-07.
    year: 2015,
    description: `One of my first projects, written in Scratch in high school: a two-player
      game where both players bet, then race a timer to test their luck.`,
    tags: ['Scratch'],
    links: [{ label: 'Demo', href: 'https://scratch.mit.edu/projects/89911232/' }],
  },
];
