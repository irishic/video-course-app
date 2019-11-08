import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";

const HIGHLIGHT_COLORS_VOCABULARY = {
  blue: "rgb(135,206,235)",
  green: "rgb(144,238,144)"
};

function getBorderStyle(color) {
  return `1px solid ${color}`;
}

function getBoxShadowStyle(color) {
  return `2px 2px 6px ${color}`;
}

@Directive({
  selector: "[appHighlightElement]"
})
export class HighlightElementDirective implements OnInit {
  @Input("appHighlightElement") public color: string;
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.element.nativeElement,
      "border",
      getBorderStyle(HIGHLIGHT_COLORS_VOCABULARY[this.color] || this.color)
    );

    this.renderer.setStyle(
      this.element.nativeElement,
      "box-shadow",
      getBoxShadowStyle(HIGHLIGHT_COLORS_VOCABULARY[this.color] || this.color)
    );
  }
}
