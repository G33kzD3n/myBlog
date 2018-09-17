import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTikersComponent } from './post-tikers.component';

describe('PostTikersComponent', () => {
  let component: PostTikersComponent;
  let fixture: ComponentFixture<PostTikersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostTikersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTikersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
