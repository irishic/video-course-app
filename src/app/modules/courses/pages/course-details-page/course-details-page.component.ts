import { Component, OnInit } from "@angular/core";
import { CoursesDataService } from "../../services/courses-data.service";
import { ActivatedRoute } from "@angular/router";
import { CourseInterface } from "../../../../domain/interfaces/course";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-details-page.component.html",
  styleUrls: ["./course-details-page.component.scss"]
})
export class CourseDetailsPageComponent implements OnInit {
  course: CourseInterface;
  constructor(
    private dataService: CoursesDataService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ courseId }) => {
      if (courseId === "new") {
        this.course = this.dataService.createDefaultCourseData();
        return;
      }
      this.course = this.dataService.getCourseById(courseId);
    });
  }
}
