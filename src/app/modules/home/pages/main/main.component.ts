import { Component, OnInit } from '@angular/core';
import { RouteEdge } from '../../../../core/models/route-edge';
import { ActivatedRoute } from '@angular/router';
import { BusRouteService } from '../../../../core/services/bus-route.service';
import { DataService } from '../../../../core/services/data.service';

@Component({
  selector: 'bb-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  route: string[] = [];
  routeEdges: RouteEdge[] = [];
  routeStart: string;
  routeEnd: string;
  error = false;

  constructor(private activatedRoute: ActivatedRoute, private routeService: BusRouteService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.routeStart && qp.routeEnd) {
        this.routeStart = this.dataService.verifyNode(qp.routeStart);
        this.routeEnd = this.dataService.verifyNode(qp.routeEnd);
        if (this.routeStart !== 'error' && this.routeEnd !== 'error') {
          this.loadRoute();
        } else {
          this.handleErrorInParams();
        }
      } else {
        this.handleErrorInParams();
      }
    });
  }

  private loadRoute() {
    this.route = this.routeService.getRouteNodeAndEdgeIds(this.routeStart, this.routeEnd);
    this.routeEdges = this.routeService.getRouteEdges(this.route.filter(r => r.length === 2));
  }

  private handleErrorInParams() {
    this.routeStart = undefined;
    this.routeEnd = undefined;
    this.routeEdges = [];
  }
}
