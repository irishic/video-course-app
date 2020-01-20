import { Component, OnInit, forwardRef, Input } from "@angular/core";
import { NG_VALUE_ACCESSOR, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "app-date-input",
  templateUrl: "./date-input.component.html",
  styleUrls: ["./date-input.component.css"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent implements OnInit {
  showLabel: boolean = true;
  @Input("form") public dateForm: FormGroup;
  constructor() {}

  ngOnInit() {}

  writeValue(outsideValue) {
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
}
