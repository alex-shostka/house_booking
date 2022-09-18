import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main/main-layout.component';
import { NotFoundComponent } from './layouts/not-found/not-found-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    title: 'House booking 3D',
    pathMatch: 'full',
  },
  {
    path: 'houses',
    title: 'See all houses',
    loadChildren: () => import('./modules/houses/houses.module').then((x) => x.HousesModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    title: '404',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
