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

  constructor(private activatedRoute: ActivatedRoute, private routeService: BusRouteService, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.routeStart && qp.routeEnd) {
        this.routeStart = this.dataService.verifyNode(qp.routeStart);
        this.routeEnd = this.dataService.verifyNode(qp.routeEnd);
        this.loadRoute();
      } else {
        this.routeStart = undefined;
        this.routeEnd = undefined;
        this.routeEdges = [];
      }
    });
  }

  private loadRoute() {
    this.route = this.routeService.getRouteNodeAndEdgeIds(this.routeStart, this.routeEnd);
    this.routeEdges = this.routeService.getRouteEdges(this.route);
  }
}
