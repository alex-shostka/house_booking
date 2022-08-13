import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseComponent } from '../../layouts/house/house.component';

import { CardComponent } from 'src/app/components/card/card.component';
import { HousePageComponent } from 'src/app/pages/house.page/house.page.component';

@NgModule({
  declarations: [HouseComponent, CardComponent, HousePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HouseComponent,
        children: [{ path: '', component: HousePageComponent }],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class HousesModule {}
