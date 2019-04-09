import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryMMDComponent } from './library-mmd.component';

describe('LibraryMMDComponent', () => {
  let component: LibraryMMDComponent;
  let fixture: ComponentFixture<LibraryMMDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryMMDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryMMDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
