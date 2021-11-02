import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective, AddBorderDirective } from './directives';
import { OrderByPipe } from './pipes/order-by.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './validators';

@NgModule({
  declarations: [
    HighlightDirective,
    AddBorderDirective,
    OrderByPipe,
    EmailValidatorDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HighlightDirective,
    AddBorderDirective,
    OrderByPipe,
    EmailValidatorDirective,
  ],
})
export class SharedModule {}
