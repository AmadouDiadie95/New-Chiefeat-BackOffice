import { TestBed } from '@angular/core/testing';

import { RestAPIService } from './rest-api.service';

describe('RestApiService', () => {
  let service: RestAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
