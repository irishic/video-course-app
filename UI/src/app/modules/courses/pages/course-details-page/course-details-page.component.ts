import { Component, OnInit } from "@angular/core";
import { CoursesDataService } from "../../services/courses-data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { JustCreatedCourse } from "src/app/domain/interfaces/just-created-course";

@Component({
  selector: "app-course-detail",
  templateUrl: "./course-details-page.component.html",
  styleUrls: ["./course-details-page.component.scss"]
})
export class CourseDetailsPageComponent implements OnInit {
  course: CourseInterface | JustCreatedCourse;

  constructor(
    private dataService: CoursesDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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

  goToCourses() {
    this.router.navigate(["courses"]);
  }
}
