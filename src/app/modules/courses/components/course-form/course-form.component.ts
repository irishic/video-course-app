import { Component, OnInit, Input } from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { CoursesDataService } from "../../services/courses-data.service";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent implements OnInit {
  @Input() course: CourseInterface;
  constructor(public dataService: CoursesDataService) {}

  updateCourse() {
    this.dataService.updateCourse(this.course.id, { ...this.course });
  }

  ngOnInit() {}
}
