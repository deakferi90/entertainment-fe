import { Component, computed, OnInit, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';

@Component({
  selector: 'app-bookmarks',
  imports: [],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss',
})
export class Bookmarks implements OnInit {
  allBookMarked = signal<MovieInterface[]>([]);
  filterText = signal('');
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;

  displayBookmarkedItems = computed(() => {
    const text = this.filterText().toLowerCase();

    if (!text) return this.allBookMarked();

    return this.allBookMarked()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort();
  });

  constructor(private sharedService: SharedService) {}

  ngOnInit() {
    this.displayAllBookMarked();
  }

  displayAllBookMarked() {
    this.sharedService.getAllBookMarked().subscribe((bookmarked) => {
      const bookMarkedOnly = bookmarked.filter(
        (m: MovieInterface) => m.isBookmarked,
      );
      this.allBookMarked.set(bookMarkedOnly);
    });
  }

  toggleBookmark(item: MovieInterface) {
    const current = this.bookmarkedItems();
    current[item.title] = !current[item.title];
    this.bookmarkedItems.set({ ...current });
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
