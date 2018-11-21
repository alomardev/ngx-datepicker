import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export const DATEPICKER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatePickerComponent),
  multi: true
};

@Component({
  selector: 'date-picker',
  templateUrl: './datepicker.component.html',
  providers: [DATEPICKER_CONTROL_VALUE_ACCESSOR]
})
export class DatePickerComponent implements ControlValueAccessor {
  
  @Input('type') calendarType: string;

  @Input() lang: string = "en";
  @Input() name: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() dateFormat = 'yyyy/mm/dd';

  @Output('blur') blurHandler: EventEmitter<any> = new EventEmitter();
  @Output('changed') changedHandler: EventEmitter<string> = new EventEmitter();

  innerValue: string;

  onModelChanged = (v: any) => {};
  onModelTouched = () => {};

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

}
