import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FaIconStub } from "../../../../testing/fa-icon-stub";
import { CoursesListItemComponent } from "./courses-list-item.component";
import { MinutesConverterPipe } from "../../../../pipes/minutes-converter.pipe";
import { Course } from "../../../../domain/models/course";
import { PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";
import { HighlightElementDirective } from "../../directives/highlight-element.directive";

describe("CoursesListItemComponent", () => {
  let component: CoursesListItemComponent;
  let fixture: ComponentFixture<CoursesListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesListItemComponent,
        FaIconStub,
        MinutesConverterPipe,
        HighlightElementDirective
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const today = new Date();
    fixture = TestBed.createComponent(CoursesListItemComponent);
    component = fixture.componentInstance;
    component.course = new Course("1", "title", today, 1, "description");
    fixture.detectChanges();
  });

  it("shows course data", () => {
    const minutesConverterPipe: PipeTransform = new MinutesConverterPipe();
    const element: HTMLElement = fixture.nativeElement;
    const title = element.querySelector(".course-info__header h3");
    const duration = element.querySelector(
      ".course-info__header__main-chars--duration"
    );
    const date = element.querySelector(
      ".course-info__header__main-chars--date"
    );
    const descr = element.querySelector(".course-info__description");

    expect(
      RegExp(component.course.title, "i").test(title.textContent.trim())
    ).toBeTruthy();
    expect(duration.textContent.trim()).toBe(
      minutesConverterPipe.transform(component.course.duration)
    );
    expect(date.textContent.trim()).toBe(
      formatDate(component.course.creationDate, "mediumDate", "en-US")
    );
    expect(descr.textContent.trim()).toBe(component.course.description);
  });

});
