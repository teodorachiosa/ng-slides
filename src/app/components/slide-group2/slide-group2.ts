import { Component } from '@angular/core';
import { Slide } from '../slide/slide';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-slide-group2',
  imports: [Slide, MarkdownComponent],
  templateUrl: './slide-group2.html',
  styleUrl: './slide-group2.css',
})
export class SlideGroup2 {}
