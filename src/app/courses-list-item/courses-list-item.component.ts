import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CourseInterface } from "../domain/interfases/course";
import {
  faPen,
  faTrash,
  faClock,
  faCalendarAlt
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
  
  @Output() onItemDelete = new EventEmitter();
  @Input() course: CourseInterface;
  constructor() {}

  ngOnInit() {}
}
