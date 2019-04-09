import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStatusBarComponent } from './admin-status-bar.component';

describe('AdminStatusBarComponent', () => {
  let component: AdminStatusBarComponent;
  let fixture: ComponentFixture<AdminStatusBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStatusBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStatusBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
