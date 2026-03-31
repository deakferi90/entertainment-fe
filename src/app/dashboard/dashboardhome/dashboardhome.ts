import { Component, computed, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboardhome',
  imports: [CommonModule],
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

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.loadAllContent();
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
    const current = this.bookmarkedItems();
    current[item.title] = !current[item.title];
    this.bookmarkedItems.set({ ...current });
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
