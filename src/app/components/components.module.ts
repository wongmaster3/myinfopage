import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  

import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './projects/projects.component';
import { WorkExperiencesComponent } from './work-experiences/work-experiences.component';
import { ContactComponent } from './contact/contact.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    HomeComponent,
    ProjectsComponent,
    WorkExperiencesComponent,
    ContactComponent
  ],
  exports: [
    HomeComponent,
    ProjectsComponent,
    WorkExperiencesComponent,
    ContactComponent
  ]
})

export class ComponentsModule { }