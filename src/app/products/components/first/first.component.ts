import { Component } from '@angular/core';
import { Category } from '../../enums/category';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
})
export class FirstComponent {
  title = 'Catalog';

  constructor() {}
}
