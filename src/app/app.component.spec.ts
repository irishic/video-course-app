import { TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { Component } from "@angular/core";

@Component({
  selector: "app-header",
  template: ""
})
class StubHeader {}

@Component({
  selector: "app-breadcrumbs",
  template: ""
})
class StubBreadcrumbs {}

@Component({
  selector: "app-footer",
  template: ""
})
class StubFooter {}

@Component({
  selector: "router-outlet",
  template: ""
})
class StubRouterOutlet {}

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        StubHeader,
        StubBreadcrumbs,
        StubFooter,
        StubRouterOutlet
      ]
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'video-course-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("video-course-app");
  });
});
