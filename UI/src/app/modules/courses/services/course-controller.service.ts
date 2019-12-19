import { Injectable } from "@angular/core";
import { CoursesDataService } from "./courses-data.service";
import { ModalDialogService } from "../../modal-dialog/services/modal-dialog.service";

@Injectable({
  providedIn: "root"
})
export class CourseControllerService {
  constructor(
    private dialogService: ModalDialogService,
    private dataService: CoursesDataService
  ) {}

  deleteCourse(id) {
    return new Promise((resolve, reject) => {
      this.dialogService.openConfirmDialog({
        text: "Do you really want to delete this course?",
        action: () => {
          return this.dataService.removeCourseById(id).then(() => {
            resolve(true);
          });
        }
      });
    });
  }
}
