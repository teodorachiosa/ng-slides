import { Routes } from '@angular/router';

const titleResolver = (title: string) => {
  return `${title} | Ng-slides`;
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'slide-set1',
    pathMatch: 'full'
  },
  {
    path: 'slide-set1',
    loadComponent: () => import('./slide-sets/slide-set/slide-set').then((m) => m.SlideSet),
    title: titleResolver('Slide set #1'),
  },
  {
    path: 'slide-set2',
    loadComponent: () => import('./slide-sets/slide-set2/slide-set2').then((m) => m.SlideSet2),
    title: titleResolver('Slide set #2'),
  },
  {
    path: '**',
    redirectTo: 'slide-set1'
  },
];
