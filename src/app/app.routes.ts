import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // Lazy-loaded so the shell paints before the page component is parsed.
    loadComponent: () => import('./components/home/home').then((m) => m.Home),
    title: 'Matt Wong — Software Engineer',
  },
  // Anything else lands back on the single page rather than a blank router error.
  { path: '**', redirectTo: '' },
];
