import { Component, OnInit } from '@angular/core';
import { CartFacadeService } from '../../../core';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  constructor(private cartFacade: CartFacadeService) {}

  ngOnInit(): void {
    this.processOrder();
  }

  processOrder(): void {
    this.cartFacade.clear();
  }
}
