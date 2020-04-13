import { Injectable } from '@angular/core';
import { RouteEdge } from '../models/route-edge';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {

  constructor(private dataService: DataService) {
  }

  public getRouteNodeAndEdgeIds(routeStartId: string, routeEndId: string): string[] {
    return ['A', 'AC', 'C', 'CE', 'E', 'EM', 'M', 'MN', 'N', 'NO', 'O', 'OP', 'P'];
  }

  public getRouteEdges(routeIds: string[]): RouteEdge[] {
    const edges: RouteEdge[] = [];
    routeIds.forEach((id, i) => {
      if (id.length === 2) {
        edges.push({
          edgeStart: id[0],
          edgeEnd: id[1],
          lineColor: i === 0 ? null : this.dataService.getColorForEdge(id),
          nextLineColor: i < routeIds.length - 2 ? this.dataService.getColorForEdge(routeIds[i + 2]) : null,
          edgeWeight: this.dataService.getWeightForEdge(id)
        });
      }
    });
    return edges;
  }
}
