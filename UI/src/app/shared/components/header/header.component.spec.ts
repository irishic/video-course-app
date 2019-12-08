import { Component } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { FaIconStub } from "../../../testing/fa-icon-stub";

@Component({
  selector: "app-header-controls",
  template: ""
})
class StubHeaderControlsComonent {}

@Component({
  selector: "app-logo",
  template: ""
})
class StubAppLogoComonent {}

describe("HeaderComponent", () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        StubHeaderControlsComonent,
        StubAppLogoComonent,
        FaIconStub
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
