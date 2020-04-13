import { Component, OnInit } from '@angular/core';
import { RouteEdge } from '../../../../core/models/route-edge';
import { ActivatedRoute } from '@angular/router';
import { BusRouteService } from '../../../../core/services/bus-route.service';
import { START_END_POINT_COLOR } from '../../../../core/config/common.config';

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

  headerSquareColor = START_END_POINT_COLOR;

  constructor(private activatedRoute: ActivatedRoute, private routeService: BusRouteService) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(qp => {
      this.routeStart = qp.routeStart;
      this.routeEnd = qp.routeEnd;
      if (this.routeStart && this.routeEnd) {
        this.loadRoute();
      }
    });
  }

  private loadRoute() {
    this.route = this.routeService.getRouteNodeAndEdgeIds(this.routeStart, this.routeEnd);
    this.routeEdges = this.routeService.getRouteEdges(this.route);
  }
}
