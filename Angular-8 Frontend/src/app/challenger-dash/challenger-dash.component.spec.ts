import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengerDashComponent } from './challenger-dash.component';

describe('ChallengerDashComponent', () => {
  let component: ChallengerDashComponent;
  let fixture: ComponentFixture<ChallengerDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChallengerDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengerDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
