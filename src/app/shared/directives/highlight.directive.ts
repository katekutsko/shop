import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @HostBinding('class.highlighted') get highlighted(): boolean {
    return this.isHighlighted;
  }
  @HostListener('mouseenter') onMouseEnter(): void {
    this.isHighlighted = true;
  }
  @HostListener('mouseleave') onMouseLeave(): void {
    this.isHighlighted = false;
  }

  private isHighlighted = false;

  constructor() {}
}
