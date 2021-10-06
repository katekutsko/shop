import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective, AddBorderDirective } from './directives';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HighlightDirective, AddBorderDirective, OrderByPipe],
  imports: [CommonModule, FormsModule],
  exports: [CommonModule, FormsModule, HighlightDirective, AddBorderDirective, OrderByPipe],
})
export class SharedModule {}
