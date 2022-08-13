import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseComponent } from '../../layouts/house/house.component';

import { CardComponent } from 'src/app/components/card/card.component';
import { HousePageComponent } from 'src/app/pages/house.page/house.page.component';
import { HouseViewPageComponent } from 'src/app/pages/house-view.page/house-view.page.component';
import { HouseEditPageComponent } from 'src/app/pages/house-edit.page/house-edit.page.component';

@NgModule({
  declarations: [HouseComponent, CardComponent, HousePageComponent, HouseViewPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HouseComponent,
        children: [
          { path: '', component: HousePageComponent },
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
