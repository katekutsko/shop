import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import {
  generatedString,
  GeneratorFactory,
  GeneratorService,
  genID,
  idGenerator,
  ConstantService,
  globalConstants,
  LocalStorage,
  LocalStorageService,
} from './core';
import { FirstComponent } from './first/first.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, FirstComponent],
  imports: [BrowserModule, CartModule, ProductsModule, SharedModule],
  providers: [
    {
      provide: ConstantService,
      useValue: globalConstants,
    },
    {
      provide: generatedString,
      useFactory: GeneratorFactory(7),
      deps: [GeneratorService],
    },
    {
      provide: idGenerator,
      useValue: genID,
    },
    {
      provide: LocalStorage,
      useValue: new LocalStorageService(),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
