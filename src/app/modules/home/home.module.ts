import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './pages/main/main.component';
import { BusMapComponent } from './components/bus-map/bus-map.component';
import { RouteSelectorComponent } from './components/route-selector/route-selector.component';
import { RouteDisplayComponent } from './components/route-display/route-display.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainComponent,
    BusMapComponent,
    RouteSelectorComponent,
    RouteDisplayComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        CoreModule,
        FontAwesomeModule,
        RouterModule
    ]
})
export class HomeModule {
}
