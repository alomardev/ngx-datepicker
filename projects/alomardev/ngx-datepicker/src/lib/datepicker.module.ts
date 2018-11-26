import { ModuleWithProviders, NgModule } from '@angular/core';

import { DatePickerComponent } from './datepicker.component';
import { DatePickerDirective } from './datepicker.directive';
import { DatePickerService } from './datepicker.service';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [DatePickerDirective, DatePickerComponent],
    imports:      [CommonModule],
    exports:      [DatePickerDirective, DatePickerComponent]
})
export class DatePickerModule {
    static forRoot(service: Function): ModuleWithProviders {
        return {
            ngModule: DatePickerModule,
            providers: [
                { provide: DatePickerService, useClass: service || DatePickerService}
            ]
        }
    }
}
