import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouteEdge } from '../../../../core/models/route-edge';
import { START_END_POINT_COLOR } from '../../../../core/config/common.config';

@Component({
  selector: 'bb-route-display',
  templateUrl: './route-display.component.html',
  styleUrls: ['./route-display.component.scss']
})
export class RouteDisplayComponent implements OnChanges {
  @Input() routeStart: string;
  @Input() routeEnd: string;
  @Input() routeEdges: RouteEdge[] = [];

  lineRoutes: { startNode: string, endNode: string, lineColor: string, totalTime: number }[] = [];

  startEndColor = START_END_POINT_COLOR;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.lineRoutes = [];
    this.createLineRoutes();
  }

  private createLineRoutes() {
    let lineRoute: { startNode: string, endNode: string, lineColor: string, totalTime: number } = {
      startNode: '',
      endNode: '',
      lineColor: '',
      totalTime: 0
    };
    this.routeEdges.forEach((edge, i) => {
      if (!lineRoute.startNode) {
        lineRoute.startNode = edge.edgeSource;
      }
      if (i < this.routeEdges.length - 1) {
        if (edge.lineColor !== this.routeEdges[i + 1].lineColor) {
          lineRoute.endNode = edge.edgeTarget;
        }
      } else {
        lineRoute.endNode = edge.edgeTarget;
      }
      lineRoute.lineColor = edge.lineColor;
      lineRoute.totalTime += edge.edgeWeight;
      if (lineRoute.endNode !== '') {
        this.lineRoutes.push(lineRoute);
        lineRoute = {
          startNode: '',
          endNode: '',
          lineColor: '',
          totalTime: 0
        };
      }
    });
  }

  calculateTotalTime() {
    let totalTime = 0;
    this.routeEdges.forEach(e => totalTime += e.edgeWeight);
    return totalTime;
  }
}
