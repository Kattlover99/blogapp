import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDescriptionComponent } from './post-description.component';

describe('PostDescriptionComponent', () => {
  let component: PostDescriptionComponent;
  let fixture: ComponentFixture<PostDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
