import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LivingQuarterLayoutComponent } from '../layouts/living-quarter/living-quarter-layout.component';
import { LivingQuarterViewPageComponent } from '../pages/living-quarter/living-quarter-view-page/living-quarter-view-page.component';

@NgModule({
  declarations: [LivingQuarterLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LivingQuarterLayoutComponent,
        children: [{ path: '', component: LivingQuarterViewPageComponent }],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [],
})
export class LivingQuarterModule {}
