import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, Input, ViewChild } from "@angular/core";
import { CourseInterface } from "../domain/interfases/course";
import fakeCourses from "./fake-courses-list";
import { CoursesListComponent } from "./courses-list.component";

@Component({
  selector: "app-courses-list-item",
  template: ""
})
class StubAppCoursesListItemComponent {
  @Input() course;
  loadMore() {}
}

@Component({
  template: `
    <app-courses-list (onCourseDelete)="handleCourseDelete($event)">
    </app-courses-list>
  `
})
class TestHostComponent {
  handleCourseDelete(id: string) {}
  courses: CourseInterface[] = fakeCourses;

  @ViewChild(CoursesListComponent, { static: true })
  public child: CoursesListComponent;
}

describe("CoursesListComponent", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHostComponent,
        CoursesListComponent,
        StubAppCoursesListItemComponent
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
    spyOn(component.child, "loadMore");

    loadMoreBtn.click();

    expect(component.child.loadMore).toHaveBeenCalled();
  });

  it("passes delete action to the parent component with a given argument", () => {
    spyOn(component, "handleCourseDelete");
    component.child.onCourseDelete.emit(1);
    expect(component.handleCourseDelete).toHaveBeenCalledWith(1);
  });
});
