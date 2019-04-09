import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInToCommentComponent } from './log-in-to-comment.component';

describe('LogInToCommentComponent', () => {
  let component: LogInToCommentComponent;
  let fixture: ComponentFixture<LogInToCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInToCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInToCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
