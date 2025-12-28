import {
  AfterViewInit,
  Component,
  DOCUMENT,
  HostListener,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { State, View } from '@models/state.model';
import { StateService } from '@services/state.service';

@Component({
  selector: 'app-header, [header]',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit, AfterViewInit {
  state: State = {};
  stateService = inject(StateService);

  view?: View;
  maxWidth?: number;
  isDarkMode?: boolean;

  rootElement?: HTMLElement | null;

  @HostListener('document:keydown', ['$event'])
  handlePresentKeys(event: KeyboardEvent) {
    if (this.stateService.getState().view === 'slide' && event.ctrlKey && event.key === 'F5') {
      event.preventDefault();
      this.present();
    }
  }

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngOnInit(): void {
    this.view = this.stateService.getState().view;
    this.maxWidth = this.stateService.getState().maxWidth;
    this.isDarkMode = this.stateService.getState().isDarkMode;

    if (typeof window !== 'undefined') {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      this.rootElement = document.documentElement;

      document.addEventListener('fullscreenchange', () => {
        this.exitFullscreen();
      });
    }
  }

  updateView(): void {
    this.state['view'] = this.view;
    this.stateService.setState(this.state);
  }

  updateMaxWidth(): void {
    this.state['maxWidth'] = this.maxWidth;
    this.stateService.setState(this.state);
  }

  updateDarkMode(event: Event): void {
    this.state['isDarkMode'] = this.isDarkMode;
    this.stateService.setState(this.state);
    this.setColorScheme(Boolean(event));
  }

  setColorScheme(isDarkMode: boolean): void {
    document.documentElement.style.setProperty('color-scheme', isDarkMode ? 'dark' : 'light');
  }

  async present(): Promise<void> {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      this.rootElement?.classList.add('fullscreen');
      this.updateFullscreenStateAndUI(true);
      setTimeout(() => {
        this.document.querySelector<HTMLElement>('app-slide')?.focus();
      });
    }
  }

  exitFullscreen(): void {
    if (document.fullscreenElement) return;

    this.rootElement?.classList.remove('fullscreen');
    this.updateFullscreenStateAndUI(false);

    this.state['currentSlide'] = 0;
    this.stateService.setState(this.state);
  }

  updateFullscreenStateAndUI(isFullscreen: boolean): void {
    this.state['isFullscreen'] = isFullscreen;
    this.stateService.setState(this.state);

    const bodyElement = document.querySelector('body');
    if (bodyElement) {
      bodyElement.style.overflow = isFullscreen ? 'hidden' : 'auto';
    }
  }

  get maxWidthOrZoom(): string {
    return this.stateService.getState().view === 'web' ? 'Max width' : 'Zoom';
  }
}
