import { DatePickerService, DatePickerConfigs } from './datepicker.service';
import { DatePickerDirective } from './datepicker.directive';
import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./assets/jquery.calendars.picker.css', './datepicker.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerComponent),
    multi: true
  }],
})
export class DatePickerComponent implements ControlValueAccessor {

  @Input() calendar: string;

  @Input() lang: string;
  @Input() name: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() dateFormat: string;
  @Input() disabled = false;

  @Output('blur') blurHandler: EventEmitter<any> = new EventEmitter();
  @Output('changed') changedHandler: EventEmitter<string> = new EventEmitter();

  @ViewChild(DatePickerDirective) input: DatePickerDirective;

  innerValue: string;
  configs: DatePickerConfigs;

  onModelChanged = v => v;
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

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChanged(newDate: string) {
    // this.onModelChanged(newDate); // Not needed since a change in <input> cause NgModel to be changed
    this.changedHandler.emit(newDate);
  }

  onBlur(event) {
    this.onModelTouched(); // FIXME: better to trigger touched when closing the datepicker
    this.blurHandler.emit(event);
  }

  show() {
    this.input.show();
  }

}
