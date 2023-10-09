import { TestBed } from '@angular/core/testing';

import { FoundationFilesCodeService } from './foundation-files-code.service';

describe('FoundationFilesCodeService', () => {
  let service: FoundationFilesCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoundationFilesCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
