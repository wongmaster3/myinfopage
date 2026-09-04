# myinfopage

Personal website — [mattwong77.info](https://mattwong77.info/)

Angular 20, single page, no CSS framework. All copy lives in data files, so updating the
site does not mean touching markup:

| File | What it holds |
| --- | --- |
| `src/app/data/profile.ts` | Name, tagline, bio, education, skills, links, email |
| `src/app/data/experience.ts` | Work history |
| `src/app/data/projects.ts` | The project list, with tags and links |
| `src/styles.css` | The whole design system — colors, type scale, spacing, layout |

## Running it

Requires Node 20.19+, 22.12+, or 24+.

```bash
npm install
npm start          # dev server on http://localhost:4200
npm run build      # production build into dist/myinfopage/browser
npm test           # unit tests, watch mode
npm run test:ci    # unit tests, headless, single run
```

## Deploying

Pushing to `master` runs `.github/workflows/deploy.yml`, which tests, builds, and publishes
to GitHub Pages. The repo's Pages source must be set to **GitHub Actions** (Settings →
Pages), not "Deploy from a branch".

## Design notes

- Light and dark themes come from `prefers-color-scheme` — no toggle, no JavaScript.
- Icons are inline SVG (`src/app/shared/icon.ts`) rather than an icon font.
- `featured: true` projects get a full entry under their year heading; the rest become
  `<details>` rows under "More", so they work without JavaScript and Chrome reveals them on
  find-in-page.
- The section nav (`src/app/components/section-nav/`) is one component with two CSS
  presentations: a vertical rail at ≥68rem, a sticky bar below that. Links are plain
  anchors; the observer only adds the active highlight, and the rule for which section is
  active lives in `src/app/shared/active-section.ts` as a pure function so it can be tested
  without a viewport.

Rebuilt September 2026, replacing an Angular 12 site on the HTML5 UP "Strata" template.
That version dropped ~7 MB of unused payload (FontAwesome webfonts, unreferenced photos,
jQuery, Bootstrap, Angular Material); initial transfer is now ~69 kB.
