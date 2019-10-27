import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-courses-page",
  templateUrl: "./courses-page.component.html",
  styleUrls: ["./courses-page.component.scss"]
})
export class CoursesPageComponent implements OnInit {
  constructor() {}

  handleCourseDelete(id) {
    console.log(id);
  }

//   HOOKS ORDERING CHECK

  ngOnInit() {
	  console.log("ngOnInit hook")
  }

  ngOnChanges() {
    console.log("ngOnChanges hook");
  }
  ngDoCheck() {
    console.log("ngDoCheck hook");
  }
  ngAfterContentInit() {
    console.log("ngAfterContentInit hook");
  }
  ngAfterContentChecked() {
    console.log("ngAfterContentChecked hook");
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit hook");
  }
  ngAfterViewChecked() {
    console.log("ngAfterViewChecked hook");
  }
  ngOnDestroy() {
    console.log("ngOnDestroy hook");
  }
}
