import { AfterContentInit, Directive, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[extract]',
})
export class ExtractSlidesDirective implements AfterContentInit {
  constructor(
    private host: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterContentInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.extract();
  }

  private extract(): void {
    const slideGroup = this.host.nativeElement;
    const slides = this.document.body.querySelector('app-slides');
    if (!slides) return;

    while (slideGroup.firstChild) {
      slides.insertBefore(slideGroup.firstChild, slideGroup);
    }

    setTimeout(() => {
      slideGroup.remove();
    });
  }
}
