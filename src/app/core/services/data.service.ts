import { Injectable } from '@angular/core';
import reittiopas from '../../../assets/reittiopas.json';
import { COLORS_OF_LINES, DEFAULT_NODE_COLOR, DEFAULT_NODE_SHAPE } from '../config/common.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() {
  }
  public getNodes(): any[] {
    const nodes = [];
    reittiopas.pysakit.forEach(p => {
      nodes.push({ data: { id: p, shape: DEFAULT_NODE_SHAPE, color: DEFAULT_NODE_COLOR } });
    });
    return nodes;
  }

  public getEdges(): any[] {
    const edges = [];
    reittiopas.tiet.forEach(t => {
      if (this.getBusLineEdges().includes(t.mista + t.mihin)) {
        edges.push(
          {
            data:
              {
                id: t.mista + t.mihin,
                weight: t.kesto,
                source: t.mista,
                target: t.mihin,
                color: 'gray'
              }
          }
        );
      }
    });
    return edges;
  }

  private getBusLineEdges(): string[] {
    let busLines = [];
    for (const color in reittiopas.linjastot) {
      if (Object.prototype.hasOwnProperty.call(reittiopas.linjastot, color)) {
        busLines = [...busLines, ...this.getEdgeStringsFromArray(reittiopas.linjastot[color])];
      }
    }
    return busLines;
  }

  public getColorForEdge(edge: string): string {
    for (const color in reittiopas.linjastot) {
      if (Object.prototype.hasOwnProperty.call(reittiopas.linjastot, color)) {
        if (this.getEdgeStringsFromArray(reittiopas.linjastot[color]).includes(edge)) {
          return COLORS_OF_LINES[color];
        }
      }
    }
    return 'gray';
  }

  public getWeightForEdge(id: string): number {
    return reittiopas.tiet.find(e => e.mista + e.mihin === id).kesto;
  }

  private getEdgeStringsFromArray(arr: string[]): string[] {
    const edges = [];
    for (let i = 0; i < arr.length - 1; i++) {
      edges.push(arr[i] + arr[i + 1]);
    }
    edges.forEach(e => edges.push(e[1] + e[0]));
    return edges;
  }
}
