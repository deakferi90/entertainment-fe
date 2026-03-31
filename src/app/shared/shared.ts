import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { MovieInterface } from '../dashboard/movies/movie.interface';
import { SharedService } from './shared-service';

@Injectable({
  providedIn: 'root',
})
export class Shared {
  showPassword = signal(false);
  showConfirmPassword = signal(false);
  sharedService = inject(SharedService);

  toggle(signalRef: any) {
    signalRef.update((v: boolean) => !v);
  }

  public processEntertainment(
    predicate: (item: MovieInterface) => boolean,
    targetSignal: WritableSignal<MovieInterface[]>,
  ) {
    this.sharedService.getAllEntertainment().subscribe((data) => {
      const result = data
        .filter(predicate)
        .sort((a, b) => a.title.localeCompare(b.title));

      targetSignal.set(result);
    });
  }
}
