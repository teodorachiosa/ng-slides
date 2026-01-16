import { AfterViewInit, Component, DOCUMENT, inject, OnDestroy, Renderer2 } from '@angular/core';
import { Header } from './components/header/header';
import {
  RouterLink,
  RouterOutlet,
  RouterLinkActive,
  Router,
  NavigationEnd,
  ActivatedRoute,
  TitleStrategy,
} from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Subscription } from 'rxjs';

import TRANSLATIONS_EN from '../../public/i18n/en.json';
import TRANSLATIONS_RO from '../../public/i18n/ro.json';

// const CLEAN_UP_ANNOUNCEMENT_TIMEOUT = 3000;

@Component({
  selector: 'app-root',
  imports: [Header, RouterLink, RouterOutlet, RouterLinkActive, RouterLinkActive, TranslatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements AfterViewInit, OnDestroy {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  announcer = inject(LiveAnnouncer);
  document = inject(DOCUMENT);
  titleStrategy = inject(TitleStrategy);
  translateService = inject(TranslateService);
  routerEventsSubscription: Subscription = Subscription.EMPTY;
  mainHeading?: HTMLHeadingElement;
  previousUrlNoFragment?: string;

  constructor() {
    this.translateService.setTranslation('en', TRANSLATIONS_EN);
    this.translateService.setTranslation('ro', TRANSLATIONS_RO);
    this.translateService.setFallbackLang('en');
  }

  ngAfterViewInit(): void {
    this.routerEventsSubscription = this.router.events.subscribe((navigationEvent) => {
      this.findMainHeading();

      if (navigationEvent instanceof NavigationEnd) {
        const currentUrlNoFragment = navigationEvent.urlAfterRedirects.split('#')[0];

        if (navigationEvent.id !== 1 && this.previousUrlNoFragment && this.previousUrlNoFragment !== currentUrlNoFragment) {
          this.focusSlides();
        }

        this.previousUrlNoFragment = currentUrlNoFragment;
      }
    });
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription.unsubscribe();
  }

  findMainHeading(): void {
    this.mainHeading = undefined;
    setTimeout(() => {
      this.mainHeading = this.document.getElementsByTagName('h1')[0];
      this.mainHeading?.setAttribute('tabindex', '-1');
      this.mainHeading?.setAttribute('id', 'slides-start');
    });
  }

  focusSlides(): void {
    setTimeout(() => {
      console.log('============= FOCUS HEADING');

      this.mainHeading?.focus();
    });

    // const slidesElement = this.document.getElementById('slides');
    // if (!this.mainHeading) {
    //   slidesElement?.focus();
    // }
  }

  // getCurrentPageTitle(): string | undefined {
  //   // "firstChild" is needed because the current component (app component) is outside router-outlet
  //   return this.activatedRoute.firstChild?.snapshot.title?.split('|')[0];
  // }

  // announcePageChange(): void {
  //   const pageTitle = this.getCurrentPageTitle();
  //   if (!pageTitle) return;

  //   this.announcer.announce(`Navigated to page: ${pageTitle}`);
  //   this.cleanUpAnnouncementsWithDelay();
  // }

  // cleanUpAnnouncementsWithDelay(): void {
  //   setTimeout(() => {
  //     this.announcer.clear();
  //   }, CLEAN_UP_ANNOUNCEMENT_TIMEOUT);
  // }
}
