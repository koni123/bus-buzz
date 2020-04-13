import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusRouteService } from './services/bus-route.service';
import { DataService } from './services/data.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [BusRouteService, DataService]
})
export class CoreModule {
}
