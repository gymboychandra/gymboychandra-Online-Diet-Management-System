import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivatorDashComponent } from './motivator-dash.component';

describe('MotivatorDashComponent', () => {
  let component: MotivatorDashComponent;
  let fixture: ComponentFixture<MotivatorDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivatorDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivatorDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
