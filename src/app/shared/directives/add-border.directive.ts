import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appAddBorder]',
})
export class AddBorderDirective {
  @Input('appAddBorder') color = 'blue';

  @HostListener('click') onClick(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border',
      `1px solid ${this.color}`
    );
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
