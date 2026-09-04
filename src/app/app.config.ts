import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    /*
     * Deliberately no withInMemoryScrolling(). With anchorScrolling enabled the router
     * performs #fragment jumps through ViewportScroller, which calls
     * window.scrollTo(elementTop - offset) and therefore ignores CSS scroll-margin-top —
     * section labels landed flush against the top of the viewport.
     *
     * Leaving it off lets the browser handle fragment navigation natively, which honours
     * scroll-margin-top. There is only one route, so nothing else here needs the router's
     * scroll management.
     */
    provideRouter(routes),
  ],
};
