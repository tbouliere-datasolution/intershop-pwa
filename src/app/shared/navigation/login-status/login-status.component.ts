import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';

import { AccountFacade } from 'ish-core/facades/account.facade';
import { User } from 'ish-core/models/user/user.model';
import { GenerateLazyComponent } from 'ish-core/utils/module-loader/generate-lazy-component.decorator';

@Component({
  selector: 'ish-login-status',
  templateUrl: './login-status.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
@GenerateLazyComponent()
export class LoginStatusComponent implements OnInit, OnChanges {
  @Input() logoutOnly = false;
  @Input() view: 'auto' | 'small' | 'full' = 'auto';

  user$: Observable<User>;

  constructor(private accountFacade: AccountFacade, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.user$ = this.accountFacade.user$;
  }

  ngOnChanges(_changes: SimpleChanges): void {
    // Lazy component bug
    this.cdRef.detectChanges();
  }

  getViewClasses(): string {
    switch (this.view) {
      case 'auto':
        return 'd-none d-md-inline';
      case 'full':
        return 'd-inline';
      case 'small':
        return 'd-none';
    }
  }
}
