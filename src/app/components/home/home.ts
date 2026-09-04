import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PROFILE } from '../../data/profile';
import { Icon } from '../../shared/icon';
import { Experience } from '../experience/experience';
import { Projects } from '../projects/projects';
import { SectionNav } from '../section-nav/section-nav';

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, Experience, Projects, SectionNav],
  templateUrl: './home.html',
})
export class Home {
  protected readonly profile = PROFILE;

  /** Auto-advances, so the footer can't go stale the way "© 2021" did. */
  protected readonly year = new Date().getFullYear();

  /**
   * Assembled at runtime so the address never sits in the served HTML for scrapers
   * to lift. Not encryption — just not free for a crawler.
   */
  protected readonly email = `${PROFILE.email.user}@${PROFILE.email.domain}`;
}
