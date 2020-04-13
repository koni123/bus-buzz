import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GraphState } from '../models/graph-state';

@Injectable({
  providedIn: 'root'
})
/**
 * used to spread map state across application, holds for example animating state
 */
export class BusMapService {

  private busMapState = new BehaviorSubject<GraphState>(new GraphState(false));

  constructor() { }

  public getBusMapState(): Observable<GraphState> {
    return this.busMapState;
  }

  public setBusMapState(state: GraphState): void {
    this.busMapState.next(state);
  }
}
