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
import { Store } from "@ngrx/store";
import { CourseInterface } from "src/app/domain/interfaces/course";
import { filterByTitle } from "src/app/actions/courses.actions";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.scss"]
})
export class CourseSearchComponent implements OnInit, OnDestroy {
  @Output() listFiltered = new EventEmitter();
  searchValue: string;
  inputObserver = null;
  form: FormGroup;

  constructor(private store: Store<{ courses: CourseInterface[] }>) {
    this.form = new FormGroup({
      searchValue: new FormControl("")
    });
  }

  ngOnInit() {
    const input = document.querySelector("#searchInput") as HTMLInputElement;
    this.inputObserver = fromEvent(input, "keyup")
      .pipe(
        map(event => input.value),
        filter(value => value.length > 3 || value.length === 0),
        debounceTime(200)
      )
      .subscribe(() => {
        this.searchByTitle(this.form.get("searchValue").value);
      });
  }

  ngOnDestroy() {
    this.inputObserver.unsubscribe();
  }

  searchByTitle(value: string) {
    this.store.dispatch(filterByTitle({ title: value }));
  }
}
