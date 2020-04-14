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
    const nodes = this.findShortestRoute(routeStartId, routeEndId);
    const nodesAndEdges = [];
    for (let i = 0; i < nodes.length; i++) {
      nodesAndEdges.push(nodes[i]);
      if (i < nodes.length - 1) {
        nodesAndEdges.push(nodes[i] + nodes[i + 1]);
      }
    }
    return nodesAndEdges;
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

  /**
   * find shortest route between nodes
   *
   * @param routeStartId start
   * @param routeEndId le end
   * @return nodes from start to end
   */
  private findShortestRoute(routeStartId: string, routeEndId: string) {
    // get bus line edges
    const edges = this.dataService.getEdges();

    // arrange nodes to array of arrays
    // handle both ways of edge while iterating
    // a: [ { target: b, weight: 2},... ]
    const arrangedNodes = [];
    edges.forEach(edge => {
      if (!arrangedNodes[edge.data.source]) {
        arrangedNodes[edge.data.source] = [];
      }
      if (!arrangedNodes[edge.data.target]) {
        arrangedNodes[edge.data.target] = [];
      }
      arrangedNodes[edge.data.source].push({ target: edge.data.target, weight: edge.data.weight });
      arrangedNodes[edge.data.target].push({ target: edge.data.source, weight: edge.data.weight });
    });

    // visited nodes to avoid endless loops containing nodes that have all of their edges checked
    const visitedNodes = [];
    // what to do next
    let nodesToBeSearchedNext = [];
    // route object for storing shortest routes from start to other nodes
    // initialize with route start and end properties
    const route = {};
    route[routeStartId] = { length: 0, nodes: [routeStartId] };
    route[routeEndId] = { length: Infinity, nodes: [] };
    // to kick off while loop
    nodesToBeSearchedNext.push(routeStartId);

    while (nodesToBeSearchedNext.length > 0) {
      for (const node of nodesToBeSearchedNext) {
        if (arrangedNodes[node] && !visitedNodes.includes(node)) {
          // if start => end route has been found AND is shorter than possible from current node then don't search
          // with this amount of data does not make a difference to solve all possibilities, but if data gets bigger..
          // assumption is that weight > 0
          if (route[routeEndId].length > route[node].length) {
            arrangedNodes[node].forEach(edge => {
              if (!nodesToBeSearchedNext.includes(edge.target) && !visitedNodes.includes(edge.target)) {
                nodesToBeSearchedNext.push(edge.target);
              }
              // if target length is not present in route, add object and length infinity to be caught in next if block
              if (!route[edge.target]) {
                route[edge.target] = { length: Infinity, nodes: [] };
              }

              if (route[edge.target].length > route[node].length + edge.weight) {
                // if target length in route is longer than this newly found route to target and change route
                route[edge.target].length = route[node].length + edge.weight;
                route[edge.target].nodes = [...route[node].nodes];
                route[edge.target].nodes.push(edge.target);
              }
            });
          }
          visitedNodes.push(node);
        }
        // remove node from queue
        nodesToBeSearchedNext = nodesToBeSearchedNext.filter(n => n !== node);
      }
    }
    return route[routeEndId].nodes;
  }
}
