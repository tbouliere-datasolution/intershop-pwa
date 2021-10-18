import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

import { DEFAULT_REQUEST_TIMEOUT, REQUEST_TIMEOUT_ENABLED } from 'ish-core/configurations/state-keys';

@Injectable()
export class RequestTimeoutInterceptor implements HttpInterceptor {
  constructor(private transferState: TransferState) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.transferState.get<boolean>(REQUEST_TIMEOUT_ENABLED, false)) {
      return next.handle(req);
    }

    const timeoutValue = req.headers.get('timeout') || this.transferState.get<number>(DEFAULT_REQUEST_TIMEOUT, 120000);
    const timeoutValueNumeric = Number(timeoutValue);

    return next.handle(req).pipe(
      timeout(timeoutValueNumeric),
      catchError(() => {
        throw new HttpErrorResponse({
          status: 504,
          statusText: 'Gateway Timeout',
          url: req.url,
        });
      })
    );
  }
}
