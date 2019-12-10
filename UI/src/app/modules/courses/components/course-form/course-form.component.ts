import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { CoursesDataService } from "../../services/courses-data.service";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent implements OnInit {
  @Output() afterUpdate = new EventEmitter();
  @Input() course: CourseInterface;
  constructor(public dataService: CoursesDataService) {}

  updateCourse() {
    this.dataService
      .updateCourse(this.course.id, {
        ...this.course,
        creationDate: new Date(this.course.creationDate)
      })
      .then(() => this.afterUpdate.emit());
  }

  ngOnInit() {}
}
