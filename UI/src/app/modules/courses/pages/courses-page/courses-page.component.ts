import { Component, OnInit } from "@angular/core";
import { CoursesDataService } from "../../services/courses-data.service";
import { CourseInterface } from "../../../../domain/interfaces/course";

@Component({
  selector: "app-courses-page",
  templateUrl: "./courses-page.component.html",
  styleUrls: ["./courses-page.component.scss"]
})
export class CoursesPageComponent implements OnInit {
  coursesList: CourseInterface[];
  searchValue: string;
  lastCoursesIntervalLoaded: boolean;

  constructor(public dataService: CoursesDataService) {}

  ngOnInit() {
    this.dataService
      .initialCoursesLoad()
      .subscribe(({ courses }) => (this.coursesList = courses));
  }

  updateList(options) {
    this.lastCoursesIntervalLoaded =
      options && options.isLast !== undefined
        ? options.isLast
        : this.lastCoursesIntervalLoaded;
    this.coursesList = this.dataService.getCourses();
  }

  loadMoreCourses() {
    this.dataService.loadMoreCourses().subscribe(({ isLast }) => {
      this.lastCoursesIntervalLoaded = isLast;
      this.coursesList = this.dataService.courses;
    });
  }
}
