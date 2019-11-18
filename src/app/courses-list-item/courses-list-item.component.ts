import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CourseInterface } from "../domain/interfaces/course";
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
  styleUrls: ["./courses-list-item.component.scss"]
})
export class CoursesListItemComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faClock = faClock;
  faCalendar = faCalendarAlt;
  faStar = faStar;
  statusColor: string = null;
  currentDateStamp: number = new Date().getTime();

  @Output() onItemDelete = new EventEmitter();
  @Input() course: CourseInterface;

  ngOnInit() {
    const daysDifference = Math.round(
      (this.currentDateStamp - this.course.creationDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysDifference > 0 && daysDifference < 14) {
      this.statusColor = "green";
    }
    if (daysDifference < 0) {
      this.statusColor = "blue";
    }
  }
}
