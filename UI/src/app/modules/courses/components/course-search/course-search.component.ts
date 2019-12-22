import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { fromEvent } from "rxjs";
import { map, filter, debounceTime } from "rxjs/operators";
import { CoursesDataService } from "../../services/courses-data.service";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.scss"]
})
export class CourseSearchComponent implements OnInit, OnDestroy {
  @Output() listFiltered = new EventEmitter();
  searchValue: string;
  inputObserver = null;

  constructor(private dataService: CoursesDataService) {}

  ngOnInit() {
    const input = document.querySelector("#searchInput") as HTMLInputElement;
    this.inputObserver = fromEvent(input, "keyup")
      .pipe(
        map(event => input.value),
        filter(value => value.length > 3 || value.length === 0),
        debounceTime(200)
      )
      .subscribe(() => {
        this.searchByTitle(this.searchValue);
      });
  }

  ngOnDestroy() {
    this.inputObserver.unsubscribe();
  }

  searchByTitle(value: string) {
    this.dataService.searchByName(value).subscribe(({ courses, isLast }) => {
      this.listFiltered.emit({ courses, isLast });
    });
  }
}
