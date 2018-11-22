import { Injectable } from '@angular/core';

import { DatePickerService, DatePickerConfigs } from '../../projects/elm/ngx-datepicker/src/lib/datepicker.service';

@Injectable()
export class CustomDatePickerService extends DatePickerService {
  constructor() {
    super({
      button: DatePickerConfigs.Button.End
    });
  }

  getLanguage(): string {
    return localStorage.getItem("lang") || "ar";
  }
}
