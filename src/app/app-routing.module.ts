import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAccessPageComponent } from './core/components/no-access-page/no-access-page.component';
import { NotFoundPageComponent } from './core/components/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products-list',
    pathMatch: 'full',
  },
  {
    path: 'no-access',
    component: NoAccessPageComponent,
  },
  {
    path: 'page-not-found',
    component: NotFoundPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
