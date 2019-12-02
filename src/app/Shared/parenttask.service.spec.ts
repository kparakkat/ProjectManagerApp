import { TestBed } from '@angular/core/testing';

import { ParenttaskService } from './parenttask.service';

describe('ParenttaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParenttaskService = TestBed.get(ParenttaskService);
    expect(service).toBeTruthy();
  });
});
