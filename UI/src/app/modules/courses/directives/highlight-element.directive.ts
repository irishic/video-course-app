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
  @Input("appHighlightElement") public creationDate: Date;
  color: string;
  currentDateStamp: number = new Date().getTime();

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.specifyHighlightColor();

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

  specifyHighlightColor() {
    const daysDifference = Math.round(
      (this.currentDateStamp - new Date(this.creationDate).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    if (daysDifference > 0 && daysDifference < 14) {
      this.color = "green";
    }
    if (daysDifference < 0) {
      this.color = "blue";
    }
  }
}
