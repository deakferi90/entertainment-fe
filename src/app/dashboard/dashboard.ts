import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard.scss',
})
export class DashboardMenu {
  movieImg: string = 'assets/icon-movie.png';
  dashboardImg: string = 'assets/dashboard-grey.png';
  movie: string = 'assets/movie.png';
  tv: string = 'assets/icon-tv.png';
  bookmark: string = 'assets/bookmark-grey.png';
  profile: string = 'assets/person.png';
  selectedMenu: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const segments = event.urlAfterRedirects.split('/');
        this.selectedMenu = segments[segments.length - 1] || 'dashboard';
      });
  }

  menuItems = [
    {
      label: 'dashboard',
      route: '/home/dashboard',
      imgSrc: this.dashboardImg,
      alt: 'dashboard',
    },
    {
      label: 'movies',
      route: '/home/movies',
      imgSrc: this.movie,
      alt: 'movies',
    },
    {
      label: 'tv',
      route: '/home/tv',
      imgSrc: this.tv,
      alt: 'tv',
    },
    {
      label: 'bookmarks',
      route: '/home/bookmarks',
      imgSrc: this.bookmark,
      alt: 'bookmarks',
    },
  ];

  selectMenu(menu: string) {
    this.selectedMenu = menu;
  }
}
