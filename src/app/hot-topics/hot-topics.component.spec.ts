import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotTopicsComponent } from './hot-topics.component';

describe('HotTopicsComponent', () => {
  let component: HotTopicsComponent;
  let fixture: ComponentFixture<HotTopicsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotTopicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotTopicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
