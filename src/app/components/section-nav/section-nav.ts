import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';

import { SECTIONS } from '../../shared/sections';
import { activeSectionId } from '../../shared/active-section';

/**
 * The "you are here" line, in px below the top of the viewport — roughly the height of
 * the sticky bar, so the active section is whatever sits just under it.
 *
 * Deliberately a fixed offset rather than a fraction of the viewport: at 30% of an 900px
 * window the line lands 270px down, which is taller than the Education section (170px),
 * so that section could never hold the highlight. A short constant works for any section
 * taller than itself.
 */
const CUTOFF_PX = 88;

/**
 * In-page navigation. Renders as a horizontal sticky bar on narrow viewports and as a
 * fixed vertical rail in the left margin once there's room for it — one component, one
 * observer, layout switched entirely in CSS.
 *
 * The links are plain anchors, so navigation works with JavaScript disabled; the observer
 * below only adds the active-section highlight.
 */
@Component({
  selector: 'app-section-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="sectionnav" #nav aria-label="Page sections">
      <ul>
        @for (section of sections; track section.id) {
          <li>
            <a
              [href]="'#' + section.id"
              [class.is-active]="active() === section.id"
              [attr.aria-current]="active() === section.id ? 'true' : null"
            >
              {{ section.label }}
            </a>
          </li>
        }
      </ul>
    </nav>
  `,
})
export class SectionNav {
  protected readonly sections = SECTIONS;
  protected readonly active = signal<string | null>(SECTIONS[0].id);

  private readonly navRef = viewChild.required<ElementRef<HTMLElement>>('nav');

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
        (el): el is HTMLElement => el !== null,
      );

      if (elements.length === 0) return;

      /**
       * The observer decides *when* to recompute; geometry decides *what* is active.
       * Reading the answer off the callback's `entries` would be wrong — entries only
       * cover sections whose intersection just changed, not all of them.
       */
      const recompute = () => {
        const tops = elements.map((el) => ({ id: el.id, top: el.getBoundingClientRect().top }));
        this.active.set(activeSectionId(tops, CUTOFF_PX));
      };

      const observer = new IntersectionObserver(recompute, {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      });
      for (const el of elements) observer.observe(el);

      /*
       * A tall section can fill the viewport for thousands of pixels without crossing any
       * observer threshold, so the observer alone leaves the highlight stale mid-section.
       *
       * recompute() is called straight from the listener rather than being coalesced into
       * requestAnimationFrame: it is five getBoundingClientRect reads, scroll already
       * fires at most once per frame, and the rAF hop made the highlight untestable in
       * headless Chrome (where rAF does not run under a virtual time budget).
       */
      /**
       * Publishes the nav's real height so `.section`'s scroll-margin-top can clear it,
       * landing anchor jumps with the section label optically centred above its underline.
       * Zero in side-rail mode, where the nav sits in the margin and covers no content.
       */
      const nav = this.navRef().nativeElement;
      const publishNavHeight = () => {
        const overlays = getComputedStyle(nav).position === 'sticky';
        const height = overlays ? Math.round(nav.getBoundingClientRect().height) : 0;
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
      };

      /**
       * Publishes the offset that makes an anchored section label sit with equal *visible*
       * gaps above its text and below it to its underline.
       *
       * Matching the label's padding-bottom is not enough: the gap the eye sees above the
       * text runs to the top of the capitals, while the gap below runs from the baseline,
       * and the leftover ascent/descent space is not symmetric. Those metrics differ per
       * font — system-ui is SF Pro on macOS, Segoe UI on Windows — so this is measured
       * from the font actually in use rather than hardcoded.
       */
      const publishLabelOffset = () => {
        const label = document.querySelector<HTMLElement>('.section .section__label');
        const ctx = document.createElement('canvas').getContext('2d');
        if (!label || !ctx) return;

        const cs = getComputedStyle(label);
        const lineHeight = parseFloat(cs.lineHeight);
        if (!Number.isFinite(lineHeight)) return;

        ctx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const text = label.textContent?.trim() ?? '';
        const metrics = ctx.measureText(
          cs.textTransform === 'uppercase' ? text.toUpperCase() : text,
        );

        // Where the baseline falls inside the line box, then where the ink sits around it.
        const contentHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
        const baseline = (lineHeight - contentHeight) / 2 + metrics.fontBoundingBoxAscent;
        const inkTop = baseline - metrics.actualBoundingBoxAscent;
        const inkBottom = baseline + metrics.actualBoundingBoxDescent;

        const ruleTop = label.getBoundingClientRect().height - parseFloat(cs.borderBottomWidth);
        const gapBelow = ruleTop - inkBottom;

        // gapAbove = offset + inkTop, so this makes gapAbove equal gapBelow exactly.
        const offset = gapBelow - inkTop;
        if (!Number.isFinite(offset)) return;

        document.documentElement.style.setProperty('--label-offset', `${offset.toFixed(2)}px`);
      };

      const onViewportChange = () => {
        publishNavHeight();
        publishLabelOffset();
        recompute();
      };

      window.addEventListener('scroll', recompute, { passive: true });
      window.addEventListener('resize', onViewportChange, { passive: true });

      publishNavHeight();
      publishLabelOffset();
      recompute();

      destroyRef.onDestroy(() => {
        observer.disconnect();
        window.removeEventListener('scroll', recompute);
        window.removeEventListener('resize', onViewportChange);
        document.documentElement.style.removeProperty('--nav-height');
      });
    });
  }
}
