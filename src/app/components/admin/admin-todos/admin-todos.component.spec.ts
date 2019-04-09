import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTodosComponent } from './admin-todos.component';

describe('AdminTodosComponent', () => {
  let component: AdminTodosComponent;
  let fixture: ComponentFixture<AdminTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
