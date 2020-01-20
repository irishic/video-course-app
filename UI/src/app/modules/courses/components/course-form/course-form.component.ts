import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CourseInterface } from "../../../../domain/interfaces/course";
import { CoursesDataService } from "../../services/courses-data.service";
import {
  ValidatorFn,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent implements OnInit {
  @Output() afterUpdate = new EventEmitter();
  @Input() course: CourseInterface;
  form: FormGroup;

  constructor(
    public dataService: CoursesDataService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    const courseCopy = this.dataService.createCourse({ ...this.course });
    const { title, description, creationDate, duration, authors } = courseCopy;
    this.form = this.fb.group({
      title: [title, [Validators.maxLength(50), Validators.required]],
      description: [
        description,
        [Validators.maxLength(500), Validators.required]
      ],
      creationDate: [
        creationDate,
        [Validators.required, forbiddenFutureDates()]
      ],
      duration: [duration, [Validators.required, onlyNumbersAllowed()]],
      authors: this.fb.array(authors.map(a => this.initAuthorObj(a)))
    });
  }

  initAuthorObj(name = "") {
    return this.fb.group({
      name: [name, Validators.required]
    });
  }

  addAuthor() {
    const control = <FormArray>this.form.controls["authors"];
    control.push(this.initAuthorObj());
  }
  removeAuthor(index) {
    const control = <FormArray>this.form.controls["authors"];
    control.removeAt(index);
    if (control.length === 0) {
      this.addAuthor();
    }
  }
  setAuthor([name, index]) {
    const control = <FormArray>this.form.controls["authors"];
    control.setControl(index, this.initAuthorObj(name));
  }
  updateCourse() {
    this.dataService
      .updateCourse(this.course, {
        creationDate: new Date(this.course.creationDate),
        ...this.form.value,
        authors: this.form.value.authors.map(a => a.name)
      })
      .subscribe(() => {
        this.afterUpdate.emit();
      });
  }
}

function forbiddenFutureDates(): ValidatorFn {
  return (control: AbstractControl) => {
    const forbidden =
      new Date().getTime() - new Date(control.value).getTime() < 0;
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}

function onlyNumbersAllowed(): ValidatorFn {
  return (control: AbstractControl) => {
    const forbidden = typeof control.value !== "number";
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
