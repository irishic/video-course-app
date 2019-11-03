import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component } from "@angular/core";
import { CoursesPageComponent } from "./courses-page.component";

@Component({
  selector: "app-course-search",
  template: ""
})
class StubAppCourseSearchComonent {}

@Component({
  selector: "app-courses-list",
  template: ""
})
class StubAppCoursesListComonent {}

describe("CoursesPageComponent", () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesPageComponent,
        StubAppCourseSearchComonent,
        StubAppCoursesListComonent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
