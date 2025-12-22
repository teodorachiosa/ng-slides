import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { ViewEncapsulation } from '@angular/core';
import { WebA11yForEveryone } from '@pages/web-a11y-for-everyone/web-a11y-for-everyone';

@Component({
  selector: 'app-root',
  imports: [Header, WebA11yForEveryone],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-slides');
}
