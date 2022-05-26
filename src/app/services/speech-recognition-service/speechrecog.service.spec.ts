import { TestBed } from '@angular/core/testing';

import { SpeechrecogService } from './speechrecog.service';

describe('SpeechrecogService', () => {
  let service: SpeechrecogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeechrecogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
