import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./main-page/main-page').then(({ MainPage }) => MainPage),
    },
];
