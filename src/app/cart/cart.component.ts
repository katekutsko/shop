import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, RouterActions } from '../core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  constructor(private store: Store<AppState>) {}

  onProcessOrder(): void {
    this.store.dispatch(RouterActions.go({ path: ['/order'] }));
  }
}
