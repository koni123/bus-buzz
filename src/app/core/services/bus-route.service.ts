import { Injectable } from '@angular/core';
import { RouteEdge } from '../models/route-edge';
import { DataService } from './data.service';
import { findSimilarStringsInArrays } from '../util/util';

@Injectable({
  providedIn: 'root'
})
export class BusRouteService {

  constructor(private dataService: DataService) {
  }

  /**
   * finds shortest route between two points
   * returns nodes and edges in order i.e. ['A', 'AB', 'B', ...]
   * @param routeStartId yes we need this
   * @param routeEndId and this
   */
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

  /**
   * finds route with least bus changes
   * idea is to check possible edge color arrays from start to finish and continue as long as possible with same color
   * @param routeEdges edges for route
   */
  public getRouteEdges(routeEdges: string[]): RouteEdge[] {
    // for storing edge and corresponding color possibilities
    const routeEdgeColors = [];

    // get all possible colors per edge
    routeEdges.forEach(e => routeEdgeColors[e] = this.dataService.getColorsForEdge(e));
    // store checked edges here
    let checked = [];
    // found same color for checked edges
    let foundColor = 'gray';
    for (let i = 0; i < routeEdges.length;) {
      checked.push(routeEdges[i]);
      // check all arrays with similar color so far plus this iteration
      const arraysToBeChecked = [];
      checked.forEach(c => arraysToBeChecked.push(routeEdgeColors[c]));
      const found = findSimilarStringsInArrays(arraysToBeChecked);
      // if we find no match with previous, continue building arrays from this index
      if (found === '') {
        // remove last
        checked.pop();
        // filter found color among checked and empty checked array => convert array to string
        checked.forEach(ch => routeEdgeColors[ch] = routeEdgeColors[ch].filter(color => color === foundColor)[0]);
        checked = [];
      } else {
        // if a match is found, mark the color and move on
        // single array ends up here
        foundColor = found;
        i++;
      }
    }
    // once more for the last checked OR if whole route was the same color
    checked.forEach(ch => routeEdgeColors[ch] = routeEdgeColors[ch].filter(color => color === foundColor)[0]);

    // finally we can return something
    const edges: RouteEdge[] = [];
    for (let i = 0; i < routeEdges.length; i++) {
      edges.push({
        edgeSource: routeEdges[i][0],
        edgeTarget: routeEdges[i][1],
        lineColor: routeEdgeColors[routeEdges[i]],
        nextLineColor: i < routeEdges.length - 1 ? routeEdgeColors[routeEdges[i + 1]] : null,
        edgeWeight: this.dataService.getWeightForEdge(routeEdges[i])
      });
    }
    return edges;
  }

  /**
   * find shortest route between nodes
   *
   * @param routeStartId start
   * @param routeEndId le end
   * @return nodes from start to end
   */
  private findShortestRoute(routeStartId: string, routeEndId: string): string[] {
    const arrangedNodes = this.edgesToNodeDefinitions(this.dataService.getEdges());
    // already visited nodes to avoid endless loops containing nodes that have all of their edges checked
    const visitedNodes = [];
    // what to do next
    let nodesToBeSearchedNext = [];

    // route object for storing shortest routes from start to other nodes
    // initialize with route start and end properties
    // i.e. [ D: { length: 10, nodes: ['A', 'B', 'D'] }, ... ]
    const route = {};
    route[routeStartId] = { length: 0, nodes: [routeStartId] };
    route[routeEndId] = { length: Infinity, nodes: [] };

    // to kick off while loop
    nodesToBeSearchedNext.push(routeStartId);
    while (nodesToBeSearchedNext.length > 0) {
      for (const node of nodesToBeSearchedNext) {
        // just to make sure node is in arranged nodes and has not been visited yet
        if (arrangedNodes[node] && !visitedNodes.includes(node)) {
          // if start => end route has been found AND is shorter than possible from current node then don't search
          // with this amount of data does not make a difference to solve shortest routes from start to all nodes, but if data gets bigger..
          // assumption is that weight > 0
          if (route[routeEndId].length > route[node].length) {
            // check child nodes
            arrangedNodes[node].forEach(edge => {
              // if edge target is not already on the list to be searched next and has not been visited
              if (!nodesToBeSearchedNext.includes(edge.target) && !visitedNodes.includes(edge.target)) {
                nodesToBeSearchedNext.push(edge.target);
              }
              // if length from starting node to target node is not present in route,
              // add object and length of infinity to be caught in next if block
              if (!route[edge.target]) {
                route[edge.target] = { length: Infinity, nodes: [] };
              }

              // if target length stored in route array from starting node to target node is longer than this newly found route
              if (route[edge.target].length > route[node].length + edge.weight) {
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

  /**
   * converts route edges to array of objects containing nodes, their connected child nodes and weights to reach child nodes
   * i.e. [ A: [ { target: B, weight 3 }, { target: C, weight: 1} ], B: [ { target....]
   * @param edges route edges to be converted of type RouteEdge
   */
  private edgesToNodeDefinitions(edges: RouteEdge[]): any[] {
    const nodeDefinitions = [];
    edges.forEach(edge => {
      if (!nodeDefinitions[edge.edgeSource]) {
        nodeDefinitions[edge.edgeSource] = [];
      }
      if (!nodeDefinitions[edge.edgeTarget]) {
        nodeDefinitions[edge.edgeTarget] = [];
      }
      nodeDefinitions[edge.edgeSource].push({ target: edge.edgeTarget, weight: edge.edgeWeight });
      nodeDefinitions[edge.edgeTarget].push({ target: edge.edgeSource, weight: edge.edgeWeight });
    });
    return nodeDefinitions;
  }
}
