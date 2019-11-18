import { Component, OnInit } from "@angular/core";
import { CoursesDataService } from "../services/courses-data.service";
import { CourseInterface } from "../domain/interfaces/course";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../modal-dialog/modal-dialog.component";

@Component({
  selector: "app-courses-page",
  templateUrl: "./courses-page.component.html",
  styleUrls: ["./courses-page.component.scss"]
})
export class CoursesPageComponent implements OnInit {
  coursesList: CourseInterface[];
  constructor(
    private dataService: CoursesDataService,
    private dialog: MatDialog
  ) {}

  searchByTitle(value: string) {
    this.coursesList = this.dataService.searchByName(value);
  }

  loadMoreCourses() {
    this.coursesList = this.dataService.loadMoreCourses();
  }

  handleCourseDelete(id) {
    this.dialog.open(ModalDialogComponent, {
      data: {
        type: 'confirm',
        text: "Do you really want to delete this course?",
        okAction: () => {
          this.dataService.removeCourseById(id);
          this.updateCourses();
        }
      }
    });
  }

  updateCourses() {
    this.coursesList = this.dataService.getCourses();
  }

  ngOnInit() {
    this.dataService.initialCoursesLoad();
    this.updateCourses();
  }
}
