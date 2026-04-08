import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { Shared } from '../../shared/shared';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';

@Component({
  selector: 'app-bookmarks',
  imports: [SharedBookmark],
  templateUrl: './bookmarks.html',
  styleUrl: './bookmarks.scss',
})
export class Bookmarks implements OnInit {
  allBookMarked = signal<MovieInterface[]>([]);
  allBookmarks: MovieInterface[] | null = null;
  filterText = signal('');
  bookmarkedItems = signal<Record<string, boolean>>({});
  selectedItem: MovieInterface | null = null;
  shared = inject(Shared);

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
    this.shared.processEntertainment(
      (item) => item.isBookmarked,
      this.allBookMarked,
    );
  }

  toggleBookmark(item: MovieInterface) {
    this.sharedService.toggleBookmark(item);
    this.displayAllBookMarked();
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
