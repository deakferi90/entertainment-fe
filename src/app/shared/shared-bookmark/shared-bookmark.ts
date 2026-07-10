import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { MovieInterface } from '../../dashboard/movies/movie.interface';

@Component({
  selector: 'app-shared-bookmark',
  standalone: true,
  templateUrl: './shared-bookmark.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './shared-bookmark.scss',
})
export class SharedBookmark {
  @Input() item!: MovieInterface;
  @Input() isBookmarked = false;

  @Output() toggle = new EventEmitter<MovieInterface>();

  onToggle(event: MouseEvent) {
    event.stopPropagation();
    this.toggle.emit(this.item);
  }
}
