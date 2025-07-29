/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthApisService } from './AuthApis.service';

describe('Service: AuthApis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthApisService]
    });
  });

  it('should ...', inject([AuthApisService], (service: AuthApisService) => {
    expect(service).toBeTruthy();
  }));
});
