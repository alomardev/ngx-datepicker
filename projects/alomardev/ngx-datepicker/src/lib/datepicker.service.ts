export namespace DatePicker {
    export enum Button {
        Start = <any>'start',
        End = <any>'end',
        None = <any>'none'
    }
    export enum Calendar {
        Hijri = <any>'hijri',
        Gregorian = <any>'gregorian'
    }
    export type Format = string | {[key in Calendar]?: string};
}

export interface DatePickerConfigs {
    button?: DatePicker.Button;
    dateFormat?: DatePicker.Format;
    calendar?: DatePicker.Calendar;
}

export class DatePickerService {

    private readonly defaultConfigs: DatePickerConfigs = {
        button: DatePicker.Button.End,
        dateFormat: {
            [DatePicker.Calendar.Hijri]: "yyyy/mm/dd",
            [DatePicker.Calendar.Gregorian]: "yyyy-mm-dd"
        },
        calendar: DatePicker.Calendar.Gregorian,
    };

    private __configs: DatePickerConfigs;

    get configs() { return this.__configs; }

    constructor(configs?: DatePickerConfigs) {
        this.__configs = {...this.defaultConfigs};
        if (configs) {
            for (let key in configs) {
                if (configs[key]) this.__configs[key] = configs[key];
            }
        }
    }

    getLanguage(): string { return null; }
}
