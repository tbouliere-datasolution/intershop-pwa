import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReviewModalComponent } from './create-review-modal.component';

describe('Create Review Modal Component', () => {
  let component: CreateReviewModalComponent;
  let fixture: ComponentFixture<CreateReviewModalComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateReviewModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReviewModalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(element).toBeTruthy();
    expect(() => fixture.detectChanges()).not.toThrow();
  });
});
