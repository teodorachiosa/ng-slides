import { Injectable, signal, WritableSignal } from '@angular/core';

import { Options } from '@models/options.model';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private options: WritableSignal<Options> = signal({} as Options);

  getOptions(): Options {
    return this.options();
  }

  setOptions(newOptions: Options): void {
    this.options.set({ ...this.options(), ...newOptions });
  }
}
