import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Shared {
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  toggle(signalRef: any) {
    signalRef.update((v: boolean) => !v);
  }
}
