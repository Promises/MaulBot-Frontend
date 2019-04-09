import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageLinkAccountComponent } from './profile-page-link-account.component';

describe('ProfilePageLinkAccountComponent', () => {
  let component: ProfilePageLinkAccountComponent;
  let fixture: ComponentFixture<ProfilePageLinkAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageLinkAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageLinkAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
