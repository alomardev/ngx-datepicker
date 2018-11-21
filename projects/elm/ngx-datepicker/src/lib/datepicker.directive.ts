import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import $ from 'jquery';
import './jquery.plugin';
import './jquery.calendars';
import './jquery.calendars.plus';
import './jquery.calendars.picker';
import './jquery.calendars.ummalqura';
import './jquery.calendars.translations';

@Directive({
    selector: '[datepicker],[hijriPicker],[gregorianPicker]'
})
export class DatePickerDirective implements OnInit {

    private readonly supportedCalendars: string[] = ['gregorian', 'ummalqura', 'hijri'];

    @Input() lang: string = "ar";
    @Input() calendarType: string;

    @Input() defaultDate: string;
    @Input() minDate: string;
    @Input() maxDate: string;
    @Input() dateFormat = 'yyyy/mm/dd';

    // Compatibility
    @Input() maxYesterday: boolean;
    @Input() minTomorrow: boolean;

    @Output('changed') onDateChanged: EventEmitter<string> = new EventEmitter();

    private yearRange: string;
    private element: HTMLElement;

    private clickable: boolean = false;

    constructor(private el: ElementRef, @Optional() private control: NgControl) {
        this.element = this.el.nativeElement;
    }
    
    ngOnInit(): void {
        let $e = $(this.element);
        let elementName = $e.attr("name");
        let triggerer = $(`[datepicker-trigger=${elementName}]`);
        
        if (triggerer.length > 0) {
            triggerer.on('click', () => { this.onClick(true); });
        }
        
        if ($e.attr("readonly")) {
            this.clickable = true;
        }

        $e.attr("autocomplete", "off");
        
        let datepickerAttr;

        for (let i = 0; i < this.element.attributes.length; i++) {
            let attr = this.element.attributes.item(i);
            if (attr.name.toLowerCase().indexOf('hijripicker') == 0) {
                datepickerAttr = 'ummalqura';
            } else if (attr.name.toLowerCase().indexOf('gregorianpicker') == 0) {
                datepickerAttr = 'gregorian';
            } else if (attr.name.toLowerCase().indexOf('datepicker') == 0 && attr.value != undefined && this.supportedCalendars.indexOf(attr.value) > -1) {
                datepickerAttr = attr.value;
            }
        }

        this.calendarType = this.calendarType ? this.calendarType : (datepickerAttr ? datepickerAttr : this.supportedCalendars[0]);
        if (this.calendarType == 'hijri') {
            this.calendarType = 'ummalqura';
        }

        if (this.calendarType == 'ummalqura') {
            this.yearRange = '1276:1500';
        } else {
            this.yearRange = '1860:2077';
        }
    }

    @HostListener('click') onClick(ignoreFlag?: boolean) {
        if (this.clickable || ignoreFlag) {
            //$(this._element).unbind().removeData();
            let lang = this.lang;

            let options: any = {};
            options.onSelect = (date: any) => this.setValue(date);
            options.dateFormat = this.dateFormat;
            options.yearRange = this.yearRange;

            let instance;
            if (lang == 'ar') {
                instance = (<any>$).calendars.instance(this.calendarType, 'ar');
                options.prevText = '&lt;السابق';
                options.prevStatus = 'الشهر السابق';
                options.prevJumpText = '&lt;&lt;';
                options.prevJumpStatus = 'العام السابق';
                options.nextText = 'التالي&gt;';
                options.nextStatus = 'الشهر القادم';
                options.nextJumpText = '&gt;&gt;';
                options.nextJumpStatus = 'العام القادم';
                options.currentText = 'الحالي';
                options.currentStatus = 'الشهر الحالي';
                options.todayText = 'اليوم';
                options.todayStatus = 'اليوم الحالي / عرض الشهر';
                options.clearText = 'مسح';
                options.clearStatus = 'إعادة تعيين التواريخ';
                options.closeText = 'إغلاق';
                options.closeStatus = 'اختيار التاريخ غلق';
                options.yearStatus = 'تغيير العام';
                options.monthStatus = 'تغيير الشهر';
                options.isRTL = true;
            } else {
                instance = (<any>$).calendars.instance(this.calendarType);
            }
            
            options.minDate = this.getMinDate(instance);
            options.maxDate = this.getMaxDate(instance);
            
            options.calendar = instance;

            (<any>$(this.element)).calendarsPicker('destroy');
            (<any>$(this.element)).calendarsPicker(options).calendarsPicker('show');
        }
    }

    setValue(date: any) {
        console.log(date);
        let formattedDate = date && date[0] ? date[0].formatDate(this.dateFormat) : '';
        if (this.control)
            this.control.control.setValue(formattedDate);
        this.onDateChanged.emit(formattedDate);
    }

    getMinDate(instance: any) {
        if (this.minDate == 'today')
            return instance.today().formatDate(this.dateFormat);
        if (this.minDate == 'tomorrow' || this.minTomorrow)
            return instance.today().add(1, 'd').formatDate(this.dateFormat);
        if (this.minDate == 'yesterday')
            return instance.today().add(-1, 'd').formatDate(this.dateFormat);
        let minYear = this.yearRange.split(':')[0];
        return (<any>$).calendars.newDate(minYear, 1, 1).formatDate(this.dateFormat);
    }
    
    getMaxDate(instance: any) {
        if (this.maxDate == 'today')
            return instance.today().formatDate(this.dateFormat);
        if (this.maxDate == 'tomorrow')
            return instance.today().add(1, 'd').formatDate(this.dateFormat);
        if (this.maxDate == 'yesterday' || this.maxYesterday)
            return instance.today().add(-1, 'd').formatDate(this.dateFormat);
        let maxYear = this.yearRange.split(':')[1];
        return (<any>$).calendars.newDate(maxYear, 12, 29).formatDate(this.dateFormat);
    }

}
