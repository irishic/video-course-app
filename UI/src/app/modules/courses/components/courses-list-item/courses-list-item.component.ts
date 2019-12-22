import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { CourseControllerService } from "../../services/course-controller.service";
import {
  faPen,
  faTrash,
  faClock,
  faCalendarAlt,
  faStar
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-courses-list-item",
  templateUrl: "./courses-list-item.component.html",
  styleUrls: ["./courses-list-item.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListItemComponent implements OnInit {
  @Output() afterCourseDelete = new EventEmitter();
  @Input() course: CourseInterface;
  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faCalendar = faCalendarAlt;
  faStar = faStar;

  constructor(private courseController: CourseControllerService) {}

  ngOnInit() {}

  onItemDelete(id) {
    this.courseController.deleteCourse(id).then(() => {
      this.afterCourseDelete.emit();
    });
  }
}
