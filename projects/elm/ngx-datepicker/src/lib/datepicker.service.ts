import { Injectable } from '@angular/core';

export namespace DatePickerConfigs {
    export enum Button {
        Start = 'start',
        End = 'end',
        None = 'none'
    }
}

export interface DatePickerConfigs {
    button?: DatePickerConfigs.Button;
}

@Injectable()
export class DatePickerService {

    private readonly defaultConfigs: DatePickerConfigs = {
        button: DatePickerConfigs.Button.End
    };

    private __configs: DatePickerConfigs;

    get configs() { return this.__configs; }

    constructor(configs?: DatePickerConfigs) {
        this.__configs = configs || this.defaultConfigs;
    }

    getLanguage(): string { return null; }
}
