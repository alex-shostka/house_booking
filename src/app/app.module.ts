import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LivingQuarterViewPageComponent } from './pages/living-quarter/living-quarter-view-page/living-quarter-view-page.component';

@NgModule({
  declarations: [AppComponent, LivingQuarterViewPageComponent],
  imports: [BrowserModule, CoreModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
