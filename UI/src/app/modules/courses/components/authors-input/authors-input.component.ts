import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CoursesDataService } from "../../services/courses-data.service";

@Component({
  selector: "app-authors-input",
  templateUrl: "./authors-input.component.html",
  styleUrls: ["./authors-input.component.scss"]
})
export class AuthorsInputComponent implements OnInit {
  showLabel: boolean = true;
  @Input("form") public authorsForm: FormGroup;
  @Output() removeAuthor = new EventEmitter();
  @Output() addAuthor = new EventEmitter();
  @Output() setAuthor = new EventEmitter();
  suggestedAuthors: string[] = [];
  optionsOpen = false;
  selectedAuthor = null;

  constructor(private coursesDataService: CoursesDataService) {}

  ngOnInit() {}

  writeValue(outsideValue) {
    this.suggestedAuthors = [];
    this.optionsOpen = false;
    this.onChange(outsideValue);
  }
  onChange(value) {}
  onTouched() {}
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  setValue([name, index]) {
    this.writeValue(name);
    this.onChange(name);
    this.setAuthor.emit([name, index]);
  }

  updateOptions(typed) {
    this.coursesDataService.loadAuthorsNames(typed).then(authors => {
      this.suggestedAuthors = authors;
      this.optionsOpen = true;
    });
  }
}
