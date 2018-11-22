import { DatePickerConfigs } from './../../../../../dist/elm/ngx-datepicker/lib/datepicker.service.d';
import { DatePickerService } from './datepicker.service';
import { DatePickerDirective } from './datepicker.directive';
import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./assets/jquery.calendars.picker.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR],
})
export class DatePickerComponent implements ControlValueAccessor {
  
  @Input() calendar: string;

  @Input() lang: string;
  @Input() name: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() dateFormat = 'yyyy/mm/dd';

  @Output('blur') blurHandler: EventEmitter<any> = new EventEmitter();
  @Output('changed') changedHandler: EventEmitter<string> = new EventEmitter();

  @ViewChild(DatePickerDirective) input: DatePickerDirective;

  innerValue: string;
  configs: DatePickerConfigs;

  onModelChanged = (v: any) => {};
  onModelTouched = () => {};

  constructor(private datepickerService: DatePickerService) {
    this.configs = this.datepickerService.configs;
  }

  writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  onChanged(newDate: string) {
    this.onModelChanged(newDate);
    this.onModelTouched(); // FIXME: better to trigger touched when closing the datepicker
    this.changedHandler.emit(newDate);
  }

  onBlur(event) {
    this.blurHandler.emit(event);
  }

  show() {
    this.input.show();
  }

}
