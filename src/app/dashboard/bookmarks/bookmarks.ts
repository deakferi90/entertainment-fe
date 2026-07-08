import {
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MovieInterface } from '../movies/movie.interface';
import { SharedService } from '../../shared/shared-service';
import { Shared } from '../../shared/shared';
import { SharedBookmark } from '../../shared/shared-bookmark/shared-bookmark';
import { Router } from '@angular/router';

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
  selectedItem: MovieInterface | null = null;
  shared = inject(Shared);

  displayBookmarkedItems = computed(() => {
    const text = this.filterText().toLowerCase();

    if (!text) return this.allBookMarked();

    return this.allBookMarked()
      .filter((item) => item.title.toLowerCase().includes(text))
      .sort();
  });

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) {}

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
    item.isBookmarked = !item.isBookmarked;
    this.sharedService.toggleBookmark(item).subscribe({
      next: () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.navigate([this.router.url]);
      },
      error: (err) => {
        item.isBookmarked = !item.isBookmarked;
        console.error(err);
      },
    });
    if (!item.isBookmarked) {
      this.allBookMarked.set(
        this.allBookMarked().filter((i) => i.id !== item.id),
      );
    }
  }

  onSelect(item: MovieInterface) {
    this.selectedItem = item;
  }
}
