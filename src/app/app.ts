import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { SlideDeck } from '@slide-decks/slide-deck/slide-deck';

@Component({
  selector: 'app-root',
  imports: [Header, SlideDeck],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ng-slides');
}
