import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { homeRoutes } from './modules/home/home.route';
import { errorRoute } from './shared/error/error.route';


const routes: Routes = [...homeRoutes, errorRoute];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
