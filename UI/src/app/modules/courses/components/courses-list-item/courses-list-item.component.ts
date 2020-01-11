import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { ModalDialogService } from "src/app/modules/modal-dialog/services/modal-dialog.service";
import {
  faPen,
  faTrash,
  faClock,
  faCalendarAlt,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { CoursesDataService } from "../../services/courses-data.service";

@Component({
  selector: "app-courses-list-item",
  templateUrl: "./courses-list-item.component.html",
  styleUrls: ["./courses-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListItemComponent implements OnInit {
  @Input() course: CourseInterface;
  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faCalendar = faCalendarAlt;
  faStar = faStar;

  constructor(
    private dialogService: ModalDialogService,
    private dataService: CoursesDataService
  ) {}

  ngOnInit() {}

  onItemDelete(id) {
    this.dialogService.openConfirmDialog({
      text: "Do you really want to delete this course?",
      action: () => {
        return this.dataService.removeCourseById(id);
      }
    });
  }
}
