import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTikerComponent } from './activity-tiker.component';

describe('ActivityTikerComponent', () => {
  let component: ActivityTikerComponent;
  let fixture: ComponentFixture<ActivityTikerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTikerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTikerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
