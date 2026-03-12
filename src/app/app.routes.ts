import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { AuthGuard } from './auth/auth-guard';
import { DashboardMenu } from './dashboard/dashboard';
import { Movies } from './dashboard/movies/movies';
import { TvSeries } from './dashboard/tv-series/tv-series';
import { Bookmarks } from './dashboard/bookmarks/bookmarks';
import { Dashboardhome } from './dashboard/dashboardhome/dashboardhome';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'home',
    component: DashboardMenu,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: Dashboardhome,
      },
      {
        path: 'movies',
        component: Movies,
      },
      {
        path: 'tv',
        component: TvSeries,
      },
      {
        path: 'bookmarks',
        component: Bookmarks,
      },
    ],
  },
];
