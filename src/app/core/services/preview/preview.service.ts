/* eslint-disable ish-custom-rules/no-intelligence-in-artifacts */
import { ApplicationRef, Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  Subject,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs';

import { getICMBaseURL } from 'ish-core/store/core/configuration';
import { whenTruthy } from 'ish-core/utils/operators';

import { SetPreviewContextMessage, StorefrontEditingMessage } from './messages';

@Injectable({ providedIn: 'root' })
export class PreviewService {
  /** Internal tracking of whether the SFE capabilities are active or not */
  initialized = false;

  private allowedHostMessageTypes = ['sfe-setcontext'];
  private initOnTopLevel = false; // for debug purposes. enables this feature even in top-level windows

  hostMessagesSubject$ = new Subject<StorefrontEditingMessage>();

  constructor(private router: Router, private store: Store, private appRef: ApplicationRef) {}

  /**
   * Start method that sets up SFE communication.
   * Needs to be called *once* for the whole application, e.g. in the `AppModule` constructor.
   */
  init() {
    if (!this.shouldInit()) {
      this.initialized = false;
      return;
    }

    // Prevent multi initialization
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.listenToHostMessages();
    this.listenToApplication();

    this.getHostMessages().subscribe(message => this.handleHostMessage(message));

    // Initial startup message to the host
    this.store.pipe(select(getICMBaseURL), take(1)).subscribe(icmBaseUrl => {
      this.messageToHost({ type: 'sfe-pwaready' }, icmBaseUrl);
    });
  }

  /**
   * Decides whether to init the SFE capabilities or not.
   * Is used by the init method, so it will only initialize when
   * (1) there is a window (i.e. the application does not run in SSR/Universal)
   * (2) application does not run on top level window (i.e. it runs in the design view iframe)
   * (3) OR the debug mode is on (`initOnTopLevel`).
   */
  private shouldInit() {
    return typeof window !== 'undefined' && ((window.parent && window.parent !== window) || this.initOnTopLevel);
  }

  /**
   * Getter for the initialized status.
   * Prevents overwriting the (internal) status from outside.
   * Used by components to determine whether to attach metadata or not.
   */
  isInitialized() {
    return this.initialized;
  }

  getHostMessages() {
    return this.hostMessagesSubject$.asObservable();
  }

  /**
   * Subscribe to messages from the host window (i.e. from the Design View).
   * Incoming messages are filtered by allow list (`allowedMessages`).
   * Should only be called *once* during initialization.
   */
  private listenToHostMessages() {
    fromEvent<MessageEvent>(window, 'message')
      .pipe(
        withLatestFrom(this.store.pipe(select(getICMBaseURL))),
        filter(
          ([e, icmBaseUrl]) =>
            e.origin === icmBaseUrl &&
            e.data.hasOwnProperty('type') &&
            this.allowedHostMessageTypes.includes(e.data.type)
        ),
        map(([message]) => message.data)
      )
      .subscribe(this.hostMessagesSubject$);
  }

  /**
   * Listen to events throughout the applicaton and send message to host when
   * (1) route has changed (`sfe-pwanavigation`),
   * (2) application is stable, i.e. all async tasks have been completed (`sfe-pwastable`) or
   * (3) content include has been reloaded (`sfe-pwastable`).
   *
   * The stable event is the notifier for the design view to rerender the component tree view.
   * The event contains the tree, created by `analyzeTree()`.
   *
   * Should only be called *once* during initialization.
   */
  private listenToApplication() {
    const navigation$ = this.router.events.pipe(filter<NavigationEnd>(e => e instanceof NavigationEnd));

    const stable$ = this.appRef.isStable.pipe(debounceTime(10), distinctUntilChanged(), whenTruthy(), take(1));

    const navigationStable$ = navigation$.pipe(switchMap(() => stable$));

    // send `sfe-pwanavigation` event for each route change
    navigation$.pipe(withLatestFrom(this.store.pipe(select(getICMBaseURL)))).subscribe(([e, icmBaseUrl]) => {
      this.messageToHost({ type: 'sfe-pwanavigation', payload: { url: e.url } }, icmBaseUrl);
    });

    // send `sfe-pwastable` event when application is stable or loading of the content included finished
    navigationStable$
      .pipe(
        whenTruthy(),
        withLatestFrom(this.store.pipe(select(getICMBaseURL))),
        delay(1000) // # animation-delay (css-transition)
      )
      .subscribe(([, icmBaseUrl]) => {
        this.messageToHost({ type: 'sfe-pwastable' }, icmBaseUrl);
      });
  }

  /**
   * Send a message to the host window
   *
   * @param message The message to send (including type and payload)
   * @param hostOrigin The window to send the message to. This is necessary due to cross-origin policies.
   */
  private messageToHost(message: StorefrontEditingMessage, hostOrigin: string) {
    if (this.initialized) {
      window.parent.postMessage(message, hostOrigin);
    }
  }

  /**
   * Handle incoming message from the host window.
   * Invoked by the event listener in `listenToHostMessages()` when a new message arrives.
   */
  private handleHostMessage(message: StorefrontEditingMessage) {
    switch (message.type) {
      case 'sfe-setcontext': {
        const previewContextMsg: SetPreviewContextMessage = message;
        if (previewContextMsg?.payload?.previewContextID) {
          sessionStorage.setItem('PreviewContextID', previewContextMsg.payload.previewContextID);
        } else {
          sessionStorage.removeItem('PreviewContextID');
        }
        location.reload();
        return;
      }
    }
  }
}
