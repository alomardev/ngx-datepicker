import { DatePickerDirective } from './datepicker.directive';
import { NgModule } from "@angular/core";
import { DatePickerComponent } from './datepicker.component';

@NgModule({
    declarations: [
        DatePickerDirective,
        DatePickerComponent
    ],
    exports: [DatePickerDirective, DatePickerComponent]
})
export class DatePickerModule {}
