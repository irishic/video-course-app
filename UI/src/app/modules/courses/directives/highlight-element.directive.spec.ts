import { HighlightElementDirective } from "./highlight-element.directive";
import { Component } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import {
  getBorderStyle,
  getBoxShadowStyle
} from "./highlight-element.directive";

@Component({
  template: `
    <div [appHighlightElement]="'green'"></div>
  `
})
class TestComponent {}

describe("HighlightElementDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let testElement;

  beforeEach(async () => {
    fixture = TestBed.configureTestingModule({
      declarations: [HighlightElementDirective, TestComponent]
    }).createComponent(TestComponent);
    fixture.detectChanges();

    testElement = fixture.debugElement.query(
      By.directive(HighlightElementDirective)
    );
  });

  it("should change border and box-shadow color of an element", () => {
    const element = testElement.nativeElement;
    expect(element.style.border).toBe(getBorderStyle("green"));
    expect(element.style.boxShadow).toBe(getBoxShadowStyle("green"));
  });
});
