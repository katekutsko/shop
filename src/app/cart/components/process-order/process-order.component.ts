import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CartObservableService } from '../../services';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss'],
})
export class ProcessOrderComponent implements OnInit {
  constructor(private cartService: CartObservableService) {}

  ngOnInit(): void {
    this.processOrder();
  }

  processOrder(): void {
    this.cartService.clear().pipe(first()).subscribe();
  }
}
