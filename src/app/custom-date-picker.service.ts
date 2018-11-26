import { Injectable } from '@angular/core';

import { DatePickerService, DatePicker } from '@alomardev/ngx-datepicker';

@Injectable()
export class CustomDatePickerService extends DatePickerService {
  constructor() {
    super({
      button: DatePicker.Button.End,
      calendar: DatePicker.Calendar.Hijri,
      dateFormat: {
        [DatePicker.Calendar.Gregorian]: "yyyy__mm__dd"
      }
    });
  }

  getLanguage(): string {
    return localStorage.getItem("lang") || "ar";
  }
}
