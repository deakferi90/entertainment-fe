import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';
import { EntertaimentState } from '../../shared/entertaiment-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboardhome',
  imports: [CommonModule, SharedBookmark],
  templateUrl: './dashboardhome.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./dashboardhome.scss'],
})
export class Dashboardhome {
  allContent = signal<MovieInterface[]>([]);
  filterText = signal('');
  selectedItem: MovieInterface | null = null;
  store = inject(EntertaimentState);

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.loadAllContent();
  }

  loadAllContent() {
    this.sharedService.getAllEntertainment().subscribe((data) => {
      this.allContent.set(data);
      this.store.setItems(data);
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
    item.isBookmarked = !item.isBookmarked;

    this.sharedService.toggleBookmark(item).subscribe({
      next: () => {
        this.loadAllContent();
      },
      error: (err) => {
        item.isBookmarked = !item.isBookmarked;
        console.error(err);
      },
    });
  }

  refreshData() {
    this.sharedService.getAllEntertainment().subscribe((movies) => {
      this.allContent.set(movies);
    });
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
