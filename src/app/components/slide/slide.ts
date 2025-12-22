import { Component, HostBinding, inject, Input } from '@angular/core';

import { OptionsService } from '@services/options.service';

@Component({
  selector: 'app-slide',
  imports: [],
  templateUrl: './slide.html',
  styleUrl: './slide.css',
})
export class Slide {
  optionsService = inject(OptionsService);

  @HostBinding('attr.tabindex') get tabindex() {
    return this.optionsService.getOptions().view === 'web' ||
      !this.optionsService.getOptions().isFullscreen
      ? null
      : '-1';
  }

  @HostBinding('style.background')
  @Input()
  background: string = '';

  @HostBinding('style.padding')
  @Input()
  padding: string = '0.5em 1.5em';

  @HostBinding('style.margin') get margin() {
    return this.optionsService.getOptions().isFullscreen ? '0' : 'calc(var(--spacing) / 2) 0';
  }

  @HostBinding('style.boxShadow') get boxShadow() {
    return this.optionsService.getOptions().isFullscreen
      ? 'none'
      : '0 0 var(--shadow-spread) 0 var(--shadow-color)';
  }

  @HostBinding('class') get view() {
    return this.optionsService.getOptions().view === 'web' ? 'web-view' : 'slide-view';
  }
}
