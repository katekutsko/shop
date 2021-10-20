import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  private isHighlighted = false;

  constructor() {}

  @HostBinding('class.highlighted') get highlighted(): boolean {
    return this.isHighlighted;
  }
  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHighlighted = true;
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHighlighted = false;
  }
}
