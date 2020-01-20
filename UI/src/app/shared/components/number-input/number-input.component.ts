import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.css']
})
export class NumberInputComponent implements OnInit {
  @Input("form") public numForm: FormGroup;
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
