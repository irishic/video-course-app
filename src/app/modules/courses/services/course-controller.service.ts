import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ModalDialogComponent } from "../../../shared/components/modal-dialog/modal-dialog.component";
import { CoursesDataService } from "./courses-data.service";

@Injectable({
  providedIn: "root"
})
export class CourseControllerService {
  constructor(
    private dialog: MatDialog,
    private dataService: CoursesDataService
  ) {}

  deleteCourse(id) {
    return new Promise((resolve, reject) => {
      this.dialog.open(ModalDialogComponent, {
        data: {
          type: "confirm",
          text: "Do you really want to delete this course?",
          okAction: () => {
            this.dataService.removeCourseById(id);
            resolve(true);
          }
        }
      });
    });
  }
}
