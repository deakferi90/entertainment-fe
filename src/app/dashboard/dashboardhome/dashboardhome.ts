import { Component, computed, inject, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';
import { EntertaimentState } from '../../shared/entertaiment-state';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardhome',
  imports: [CommonModule, SharedBookmark],
  templateUrl: './dashboardhome.html',
  styleUrls: ['./dashboardhome.scss'],
})
export class Dashboardhome {
  allContent = signal<MovieInterface[]>([]);
  allTrending = signal<MovieInterface[]>([]);
  filterText = signal('');
  allShows: MovieInterface[] | null = null;
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;
  store = inject(EntertaimentState);

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadAllContent();
    this.sharedService.getAllEntertainment().subscribe((data) => {
      this.store.setItems(data);
    });
  }

  loadAllContent() {
    this.sharedService.getAllEntertainment().subscribe((all) => {
      this.allContent.set(all);
    });
  }

  filteredShows = computed(() => {
    const text = this.filterText().toLowerCase();

    return this.allContent()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort((a, b) => a.title.localeCompare(b.title));
  });

  trending = computed(() => {
    return this.allContent()
      .filter((item) => item.isTrending)
      .sort((a, b) => a.title.localeCompare(b.title));
  });

  toggleBookmark(item: MovieInterface) {
    this.sharedService.toggleBookmark(item);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([this.router.url]);
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
