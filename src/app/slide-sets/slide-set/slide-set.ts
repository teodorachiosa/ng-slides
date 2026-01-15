import { Component } from '@angular/core';


import { TranslatePipe } from '@ngx-translate/core';

import { Slide } from '@components/slide/slide';
import { Slides } from '@components/slides/slides';
import { SlideGroup } from '@slide-groups/slide-group/slide-group';
import { SlideGroup2 } from '@slide-groups/slide-group2/slide-group2';
import { Markdown } from '@components/markdown/markdown';

@Component({
  selector: 'app-slide-set',
  imports: [SlideGroup, SlideGroup2, Slides, Slide, TranslatePipe, Markdown],
  templateUrl: './slide-set.html',
  styleUrl: './slide-set.css',
})
export class SlideSet  {

}
