import { Component } from '@angular/core';
import { Slide } from '../slide/slide';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-slide-group',
  imports: [Slide, MarkdownComponent],
  templateUrl: './slide-group.html',
  styleUrl: './slide-group.css',
})
export class SlideGroup {}
