import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorecommentComponent } from './storecomment.component';

describe('StorecommentComponent', () => {
  let component: StorecommentComponent;
  let fixture: ComponentFixture<StorecommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorecommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorecommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
