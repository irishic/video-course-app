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
  constructor(public dataService: CoursesDataService) {}

  searchByTitle(value: string) {
    this.coursesList = this.dataService.searchByName(value);
  }

  updateList() {
    this.coursesList = this.dataService.getCourses();
  }

  loadMoreCourses() {
    this.coursesList = this.dataService.loadMoreCourses();
  }

  ngOnInit() {
    if (!this.dataService.courses) {
      this.dataService.initialCoursesLoad();
    }
    this.coursesList = this.dataService.courses;
  }
}
