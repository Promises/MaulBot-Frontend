import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryHCLComponent } from './library-hcl.component';

describe('LibraryHCLComponent', () => {
  let component: LibraryHCLComponent;
  let fixture: ComponentFixture<LibraryHCLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryHCLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryHCLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
