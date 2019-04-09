import { TestBed, inject } from '@angular/core/testing';

import { BlogpostsService } from './blogposts.service';

describe('BlogpostsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BlogpostsService]
    });
  });

  it('should be created', inject([BlogpostsService], (service: BlogpostsService) => {
    expect(service).toBeTruthy();
  }));
});
