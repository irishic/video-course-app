import { Directive, Input, ElementRef, Renderer2, OnInit } from "@angular/core";

const HIGHLIGHT_COLORS_VOCABULARY = {
  blue: "rgb(135, 206, 235)",
  green: "rgb(144, 238, 144)"
};

export function getBorderStyle(color) {
  return `1px solid ${HIGHLIGHT_COLORS_VOCABULARY[color] || color}`;
}

export function getBoxShadowStyle(color) {
  return `${HIGHLIGHT_COLORS_VOCABULARY[color] || color} 2px 2px 6px`;
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
      getBorderStyle(this.color)
    );

    this.renderer.setStyle(
      this.element.nativeElement,
      "box-shadow",
      getBoxShadowStyle(this.color)
	);
  }
}
