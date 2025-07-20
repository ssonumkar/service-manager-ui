import { TestBed } from '@angular/core/testing';

import { ConfigLoader } from './config-loader';

describe('ConfigLoader', () => {
  let service: ConfigLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigLoader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
