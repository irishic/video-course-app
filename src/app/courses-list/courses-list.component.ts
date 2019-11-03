import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Course } from "../domain/models/course";
import fakeCourses from "./fake-courses-list.js";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {
  @Output() onCourseDelete = new EventEmitter();

  courses: Course[] = [];

  loadMore() {
    this.courses = this.courses.concat(this.courses.slice(0, 4));
  }

  constructor() {}

  ngOnInit() {
    this.courses = fakeCourses;
  }
}
