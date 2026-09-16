import { Routes } from '@angular/router';
import { Heroslist } from './heroslist/heroslist';
import { MainPage } from './main-page/main-page';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: MainPage,
    },
];
