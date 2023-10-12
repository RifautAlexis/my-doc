import { TestBed } from '@angular/core/testing';

import { FileLoaderService } from './foundation-files-code.service';

describe('FileLoaderService', () => {
  let service: FileLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
