import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HouseComponent } from '../../layouts/house/house.component';

@NgModule({
  declarations: [HouseComponent],
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: HouseComponent }])],
  exports: [RouterModule],
})
export class HousesModule {}
