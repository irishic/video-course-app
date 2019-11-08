import { Component, OnInit, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-course-search",
  templateUrl: "./course-search.component.html",
  styleUrls: ["./course-search.component.scss"]
})
export class CourseSearchComponent implements OnInit {
  @Output() onSearch = new EventEmitter();
  searchValue: string;
  constructor() {}

  searchFor(value) {
    this.onSearch.emit(value);
  }
  ngOnInit() {}
}
