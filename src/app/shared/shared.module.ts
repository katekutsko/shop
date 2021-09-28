import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective, AddBorderDirective } from './directives';

@NgModule({
  declarations: [HighlightDirective, AddBorderDirective],
  imports: [CommonModule],
  exports: [HighlightDirective, AddBorderDirective],
})
export class SharedModule {}
