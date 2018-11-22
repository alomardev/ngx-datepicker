import { CustomDatePickerService } from './custom-date-picker.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatePickerModule } from 'projects/elm/ngx-datepicker/src/public_api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatePickerModule.forRoot(CustomDatePickerService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
