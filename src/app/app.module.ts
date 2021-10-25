import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { NoAccessPageComponent } from './core/components/no-access-page/no-access-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';
import { httpInterceptorProviders } from './core/interceptors';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    NoAccessPageComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CartModule,
    ProductsModule,
    AdminModule,
    SharedModule,
    AppRoutingModule,
  ],
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
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
