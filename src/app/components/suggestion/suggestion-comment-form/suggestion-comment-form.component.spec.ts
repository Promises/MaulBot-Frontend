import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionCommentFormComponent } from './suggestion-comment-form.component';

describe('SuggestionCommentFormComponent', () => {
  let component: SuggestionCommentFormComponent;
  let fixture: ComponentFixture<SuggestionCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
