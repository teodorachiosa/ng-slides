import {
  Component,
  HostBinding,
  HostListener,
  inject,
  AfterViewInit,
  ElementRef,
  Inject,
  DOCUMENT,
  Renderer2,
} from '@angular/core';
import { State } from '@models/state.model';

import { StateService } from '@services/state.service';

@Component({
  selector: 'app-slides',
  imports: [],
  templateUrl: './slides.html',
  styleUrl: './slides.css',
})
export class Slides implements AfterViewInit {
  state: State = {};
  currentSlide: number = 0;
  stateService = inject(StateService);
  allSlides?: NodeListOf<HTMLElement>;
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);

  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  ngAfterViewInit(): void {
    if (typeof this.document !== 'undefined') {
      this.allSlides = this.elementRef.nativeElement.querySelectorAll('app-slide');
    }

    this.assignSlideNumber();
  }

  @HostBinding('style.maxWidth') get maxWidth() {
    return this.stateService.getState().maxWidth && !this.stateService.getState().isFullscreen
      ? `${this.stateService.getState().maxWidth}%`
      : '100%';
  }

  @HostBinding('class') get view() {
    return this.stateService.getState().view === 'web' ? 'web-view' : 'slide-view';
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    const allowedKeys = ['ArrowRight', 'ArrowLeft', 'Home', 'End', 'PageUp', 'PageDown'];

    if (
      !this.allSlides ||
      this.stateService.getState().view === 'web' ||
      !this.stateService.getState().isFullscreen ||
      !allowedKeys.includes(event.key)
    )
      return;

    event.preventDefault();
    this.currentSlide = this.stateService.getState().currentSlide ?? 0;

    if (event.key === 'ArrowRight' || event.key === 'PageDown') {
      if (this.currentSlide < this.allSlides.length - 1) {
        this.currentSlide = this.currentSlide + 1;
      }
    }

    if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      if (this.currentSlide > 0) {
        this.currentSlide = this.currentSlide - 1;
      }
    }

    if (event.key === 'Home') {
      this.currentSlide = 0;
    }

    if (event.key === 'End') {
      this.currentSlide = this.allSlides.length - 1;
    }

    this.goToSlide(this.currentSlide);
  }

  goToSlide(slideNumber: number): void {
    if (!this.allSlides) return;

    const nextSlide = this.allSlides[slideNumber];
    if (nextSlide) {
      nextSlide.focus();
    }

    this.state['currentSlide'] = slideNumber;
    this.stateService.setState(this.state);
  }

  assignSlideNumber(): void {
    this.allSlides?.forEach((slide, index) => {
      if (typeof window === 'undefined') return;

      const paragraph: HTMLElement = this.renderer.createElement('span');
      this.renderer.addClass(paragraph, 'slide-number');
      const text = this.renderer.createText(`${index + 1}`);
      this.renderer.appendChild(paragraph, text);
      this.renderer.appendChild(slide, paragraph);
    });
  }
}
