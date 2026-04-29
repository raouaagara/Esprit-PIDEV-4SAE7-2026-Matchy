import { ErrorHandler, Injectable } from '@angular/core';

/**
 * Suppresses ZegoCloud-internal React errors that surface after destroy():
 *  - "Cannot read properties of null (reading 'createSpan')"
 * These originate from pending timers inside zego-uikit-prebuilt.js and are
 * not recoverable from application code.
 */
@Injectable()
export class ZegoSafeErrorHandler extends ErrorHandler {
  override handleError(error: any): void {
    const msg: string = error?.message ?? String(error ?? '');
    if (msg.includes('createSpan') || (error?.stack ?? '').includes('zego-uikit-prebuilt')) {
      return;
    }
    super.handleError(error);
  }
}
