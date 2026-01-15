import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Markdown } from '@components/markdown/markdown';
import { Slide } from '@components/slide/slide';
import { Slides } from '@components/slides/slides';

@Component({
  selector: 'app-slide-set2',
  imports: [Slides, Slide, TranslatePipe, Markdown],
  templateUrl: './slide-set2.html',
  styleUrl: './slide-set2.css',
})
export class SlideSet2 {

}
