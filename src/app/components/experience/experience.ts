import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EXPERIENCE, Highlight } from '../../data/experience';
import { Icon } from '../../shared/icon';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './experience.html',
})
export class Experience {
  /**
   * Highlights are authored as bare strings, or as objects when a bullet carries a link.
   * Normalising to one shape here keeps the data file terse and the template branch-free.
   */
  protected readonly roles = EXPERIENCE.map((role) => ({
    ...role,
    highlights: role.highlights.map((h): Highlight => (typeof h === 'string' ? { text: h } : h)),
  }));
}
