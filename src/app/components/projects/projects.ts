import { Component, ChangeDetectionStrategy } from '@angular/core';

import { PROJECTS } from '../../data/projects';
import { Icon } from '../../shared/icon';
import { isExternal } from '../../shared/links';
import { featured, rest } from '../../shared/group-by-year';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon],
  templateUrl: './projects.html',
})
export class Projects {
  protected readonly groups = featured(PROJECTS);
  protected readonly more = rest(PROJECTS);
  protected readonly isExternal = isExternal;
}
