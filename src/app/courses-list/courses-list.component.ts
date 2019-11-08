import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CourseInterface } from "../domain/interfases/course";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {
  @Output() onCourseDelete = new EventEmitter();
  @Output() onLoadMore = new EventEmitter();
  @Input() courses: CourseInterface[];

  constructor() {}

  loadMore() {
    this.onLoadMore.emit();
  }

  ngOnInit() {}
}
