import { Route } from '@angular/router';
import { ErrorComponent } from './error.component';

export const errorRoute: Route = {
  path: 'error',
  pathMatch: 'full',
  component: ErrorComponent
};
