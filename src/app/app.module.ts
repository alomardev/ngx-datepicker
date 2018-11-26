import { CustomDatePickerService } from './custom-date-picker.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DatePickerModule } from '@alomardev/ngx-datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule.forRoot(CustomDatePickerService),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
