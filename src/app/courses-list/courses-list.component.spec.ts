import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input, ViewChild } from "@angular/core";
import { CourseInterface } from "../domain/interfases/course";
import fakeCourses from "./fake-courses-list";
import { CoursesListComponent } from "./courses-list.component";
import { OrderByPipe } from '../pipes/order-by.pipe';

@Component({
  selector: "app-courses-list-item",
  template: ""
})
class StubAppCoursesListItemComponent {
  @Input() course: CourseInterface;
  loadMore() {}
}

@Component({
  template: `
    <app-courses-list
      [courses]="courses"
      (loadMore)="handleLoadMore()"
      (deleteCourse)="handleCourseDelete($event)"
    >
    </app-courses-list>
  `
})
class TestHostComponent {
  courses: CourseInterface[] = fakeCourses;
  @ViewChild(CoursesListComponent, { static: false })
  child: CoursesListComponent;
  handleCourseDelete(id: string) {}
  handleLoadMore() {}
}

describe("CoursesListComponent", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        CoursesListComponent,
        StubAppCoursesListItemComponent,
        OrderByPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("shows right number of list items", () => {
    const element = fixture.nativeElement;
    const listItems = element.getElementsByTagName("li");
    expect(listItems.length).toBe(component.courses.length);
  });

  it("calls loadMore method on button click", () => {
    const element = fixture.nativeElement;
    const loadMoreBtn = element.querySelector(".courses-list__load-more");
    spyOn(component, "handleLoadMore");

    loadMoreBtn.click();

    expect(component.handleLoadMore).toHaveBeenCalled();
  });

  it("passes delete action to the parent component with a given argument", () => {
    spyOn(component, "handleCourseDelete");
    component.child.deleteCourse.emit(1);
    expect(component.handleCourseDelete).toHaveBeenCalledWith(1);
  });
});
