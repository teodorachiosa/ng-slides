import { Component } from '@angular/core';

import { MarkdownComponent } from 'ngx-markdown';

import { Slide } from '@components/slide/slide';
import { Slides } from '@components/slides/slides';
import { ExtractSlidesDirective } from '@directives/extract-slides.directive';
import { SlideGroup } from '@components/slide-group/slide-group';
import { SlideGroup2 } from '@components/slide-group2/slide-group2';

@Component({
  selector: 'app-web-a11y-for-everyone',
  imports: [MarkdownComponent, SlideGroup, SlideGroup2, ExtractSlidesDirective, Slides, Slide],
  templateUrl: './web-a11y-for-everyone.html',
  styleUrl: './web-a11y-for-everyone.css',
})
export class WebA11yForEveryone {

}
