import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'bb-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.scss']
})
export class RouteSelectorComponent {
  @Input() routeStart: string;
  @Input() routeEnd: string;
  routeIds: string[] = [];

  constructor(private router: Router, private dataService: DataService) {
    this.routeIds = this.dataService.getNodes()
      .map(node => node.data.id);
  }

  routeChangeHandler() {
    // if (this.routeStart && this.routeEnd && this.routeStart !== this.routeEnd) {
      this.router.navigate(['/'], { queryParams: { routeStart: this.routeStart, routeEnd: this.routeEnd } });
    // }
  }
}
