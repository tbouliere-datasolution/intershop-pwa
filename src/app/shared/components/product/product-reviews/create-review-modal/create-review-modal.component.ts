import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ish-create-review-modal',
  templateUrl: './create-review-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReviewModalComponent {
  /** open modal */
  show() {
    console.log('modal');
  }
}
