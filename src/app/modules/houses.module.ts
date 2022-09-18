import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseLayoutComponent } from '../layouts/house/house-layout.component';
import { HouseMainPageComponent } from 'src/app/pages/house-main-page/house-main-page.component';
import { HouseViewPageComponent } from 'src/app/pages/house-view-page/house-view-page.component';
import { HouseEditPageComponent } from 'src/app/pages/house-edit-page/house-edit-page.component';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  declarations: [
    HouseLayoutComponent,
    HouseMainPageComponent,
    HouseViewPageComponent,
    HouseEditPageComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HouseLayoutComponent,
        children: [
          { path: '', component: HouseMainPageComponent },
          { path: ':id', component: HouseViewPageComponent },
          { path: ':id/edit', component: HouseEditPageComponent },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class HousesModule {}
