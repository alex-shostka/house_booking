import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseComponent } from '../../layouts/house/house.component';

import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
  declarations: [HouseComponent, CardComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: HouseComponent }])],
  exports: [RouterModule],
})
export class HousesModule {}
