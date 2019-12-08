import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"]
})
export class CoursesListComponent implements OnInit {
  @Input() courses: CourseInterface[];
  @Output() loadMore = new EventEmitter();
  @Output() afterCourseDelete = new EventEmitter();

  ngOnInit() {}
}
