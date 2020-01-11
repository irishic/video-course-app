import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { CoursesDataService } from "../../services/courses-data.service";
import { tap } from "rxjs/operators";
import { Course } from "src/app/domain/models/course";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent implements OnInit {
  @Output() afterUpdate = new EventEmitter();
  @Input() course: CourseInterface;
  courseCopy;

  constructor(public dataService: CoursesDataService) {}

  ngOnInit() {
    this.courseCopy = this.dataService.createCourse({ ...this.course });
  }

  updateCourse() {
    this.dataService
      .updateCourse(this.course, {
        ...this.courseCopy,
        creationDate: new Date(this.course.creationDate)
      })
      .subscribe(() => {
        this.afterUpdate.emit();
      });
  }
}
