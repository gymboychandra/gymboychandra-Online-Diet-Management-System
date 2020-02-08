import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengerComponent } from './add-challenger.component';

describe('AddChallengerComponent', () => {
  let component: AddChallengerComponent;
  let fixture: ComponentFixture<AddChallengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChallengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChallengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
