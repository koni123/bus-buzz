import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { RouteEdge } from '../../../../core/models/route-edge';
import { DataService } from '../../../../core/services/data.service';
import cytoscape, { LayoutOptions } from 'cytoscape';
import { busMapStyles } from './bus-map-styles';
import {
  BUS_CHANGE_STATION_COLOR,
  BUS_CHANGE_STATION_SHAPE,
  DEFAULT_NODE_SHAPE,
  START_END_POINT_COLOR,
  START_END_POINT_SHAPE
} from '../../../../core/config/common.config';

@Component({
  selector: 'bb-bus-map',
  templateUrl: './bus-map.component.html',
  styleUrls: ['./bus-map.component.scss']
})
export class BusMapComponent implements OnChanges, AfterViewInit {
  @ViewChild('graph')
  graph: ElementRef;
  cy: any;
  @Input() routeStart: string;
  @Input() routeEnd: string;
  @Input() route: string[] = [];
  @Input() routeEdges: RouteEdge[] = [];

  private viewInitDone = false;
  private animationTimer: any[] = [];

  constructor(private dataService: DataService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.viewInitDone) {
      this.stopAnimation();
      this.resetGraph();
      this.renderBusRoute();
    }
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape({
      container: this.graph.nativeElement, // container to render in
      boxSelectionEnabled: false,
      autounselectify: true,

      style: [...busMapStyles],
      elements: {
        nodes: this.dataService.getNodes(),
        edges: [
          ...this.dataService.getEdges().map(edge => {
            return {
              data:
                {
                  id: edge.edgeSource + edge.edgeTarget,
                  weight: edge.edgeWeight,
                  source: edge.edgeSource,
                  target: edge.edgeTarget,
                  color: edge.lineColor
                }
            };
          })
          // ...GraphData.getBusLines()
        ]
      },
    });

    this.cy.layout({
      name: 'breadthfirst',
      animate: true,
      animationDuration: 800,
      avoidOverlap: true,
      spacingFactor: 2.5,
      fit: true, // padding: 10
    } as LayoutOptions).run();

    // don't touch my map plz
    this.cy.nodes().ungrabify();
    this.cy.nodes().unselectify();
    this.cy.panningEnabled(false);
    this.viewInitDone = true;
    this.renderBusRoute();
  }

  renderBusRoute() {
    // just to be sure
    if (this.routeStart && this.routeEnd && this.route && this.routeEdges) {
      const routeEdges = [...this.routeEdges];
      this.resetGraph();
      // have to handle edges both ways
      const pathAsElements = this.route.map(id => {
        const ele = this.cy.$id(id);
        if (ele.isNode() || ele.isEdge()) {
          return ele;
        } else {
          return this.cy.$id(id[1] + id[0]);
        }
      });
      let edge: RouteEdge;
      for (let index = 0; index < pathAsElements.length; index++) {
        this.animationTimer.push(setTimeout(() => {
          const ele = pathAsElements[index];
          if (ele.isEdge()) {
            edge = routeEdges.find(e => e.edgeSource + e.edgeTarget === ele.id() || e.edgeTarget + e.edgeSource === ele.id());
            ele.data('color', edge.lineColor);
            ele.addClass('highlighted-edge');
          }
          if (ele.isNode()) {
            if (index === pathAsElements.length - 1 || index === 0) {
              ele.data('color', START_END_POINT_COLOR);
              ele.data('shape', START_END_POINT_SHAPE);
              ele.data('size', 110);
            } else if (edge.lineColor !== edge.nextLineColor) {
              ele.data('color', BUS_CHANGE_STATION_COLOR);
              ele.data('shape', BUS_CHANGE_STATION_SHAPE);
              ele.data('size', 90);
            } else {
              ele.data('color', 'white');
              ele.data('shape', DEFAULT_NODE_SHAPE);
              ele.data('size', 80);
            }
            ele.addClass('highlighted-node');
          }
        }, index * 500));
      }
    }
  }

  private resetGraph() {
    this.cy.elements().forEach(e => {
      e.removeClass('highlighted-node');
      e.removeClass('highlighted-edge');
    });
    // this.routeEdges = [];
  }

  private stopAnimation() {
    this.animationTimer.forEach(timer => clearTimeout(timer));
  }
}
