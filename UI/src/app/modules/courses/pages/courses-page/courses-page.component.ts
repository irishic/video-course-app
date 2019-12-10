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

  searchByTitle(value: string) {
    this.dataService
      .searchByName(value)
      .then((filteredCourses: CourseInterface[]) => {
        this.coursesList = filteredCourses;
      });
  }

  updateList() {
    this.coursesList = this.dataService.getCourses();
  }

  loadMoreCourses() {
    this.dataService.loadMoreCourses().then(isLast => {
      this.lastCoursesIntervalLoaded = isLast;
      this.coursesList = this.dataService.courses;
    });
  }

  ngOnInit() {
    this.dataService.initialCoursesLoad().then(() => {
      this.coursesList = this.dataService.courses;
    });
  }
}
