import { TestBed } from '@angular/core/testing';

import { BusMapService } from './bus-map.service';

describe('BusMapService', () => {
  let service: BusMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
