import { TestBed, inject } from '@angular/core/testing';

import { DjangoClientService } from './django-client.service';

describe('DjangoClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DjangoClientService]
    });
  });

  it('should be created', inject([DjangoClientService], (service: DjangoClientService) => {
    expect(service).toBeTruthy();
  }));
});
