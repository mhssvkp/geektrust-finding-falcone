import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomDropdownComponent } from './components/custom-dropdown/custom-dropdown.component';
import { CustomRadioSelectComponent } from './components/custom-radio-select/custom-radio-select.component';
import { SuccessViewComponent } from './views/success-view/success-view.component';
import { FailureViewComponent } from './views/failure-view/failure-view.component';
import { HomeViewComponent } from './views/home-view/home-view.component';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomDropdownComponent,
    CustomRadioSelectComponent,
    SuccessViewComponent,
    FailureViewComponent,
    HomeViewComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
