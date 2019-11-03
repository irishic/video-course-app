import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CourseSearchComponent } from "./course-search.component";
import { FormsModule } from "@angular/forms";

describe("CourseSearchComponent", () => {
  let component: CourseSearchComponent;
  let fixture: ComponentFixture<CourseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CourseSearchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("updates searchValue on input", () => {
    const element = fixture.nativeElement;
    const input = element.querySelector("input");
    input.value = "test value";
    input.dispatchEvent(new Event("input"));
    expect(component.searchValue).toBe("test value");
  });

  it("calls searchFor on button click with searchValue", () => {
    const element = fixture.nativeElement;
    const btn = element.querySelector("button");
    const input = element.querySelector("input");
    input.value = "test value";
    input.dispatchEvent(new Event("input"));

    spyOn(component, "searchFor");
    btn.click();

    expect(component.searchFor).toHaveBeenCalledWith("test value");
  });
});
