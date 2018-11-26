import { DatePickerService, DatePicker } from './datepicker.service';
import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, OnInit, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';
import $ from 'jquery';
import './assets/jquery.plugin';
import './assets/jquery.calendars';
import './assets/jquery.calendars.plus';
import './assets/jquery.calendars.picker';
import './assets/jquery.calendars.ummalqura';
import './assets/jquery.calendars.translations';

@Directive({
    selector: '[datepicker]',
})
export class DatePickerDirective implements OnInit {

    private readonly defaultLang = "en";
    private readonly defaultFormat = "yyyy-mm-dd";
    private readonly defaultCalendar = DatePicker.Calendar.Gregorian;

    @Input() lang: string;
    @Input() calendar: string;

    @Input() minDate: string;
    @Input() maxDate: string;
    @Input() dateFormat: DatePicker.Format;

    // Compatibility
    @Input() maxYesterday: boolean;
    @Input() minTomorrow: boolean;

    @Input() disabled: boolean;
    @Output('changed') onDateChanged: EventEmitter<string> = new EventEmitter();

    private yearRange: string;
    private element: HTMLElement;

    private clickable: boolean = false;

    constructor(private datepickerService: DatePickerService, private el: ElementRef, @Optional() private control: NgControl) {
        this.element = this.el.nativeElement;
    }
    
    ngOnInit(): void {
        let $e = $(this.element);
        let elementName = $e.attr("name");
        let triggerer = $(`[datepicker-trigger=${elementName}]`);
        
        if (triggerer.length > 0) {
            triggerer.on('click', () => { this.show(); });
        }
        
        if ($e.attr("readonly")) {
            // TODO: Pointer cursor in CSS
            this.clickable = true;
        }

        $e.attr("autocomplete", "off");

        
        // Configurations
        let { configs } = this.datepickerService;

        this.calendar = this.calendar || configs.calendar || this.defaultCalendar;
        
        if (!this.dateFormat && configs.dateFormat) {
            switch (this.calendar) {
                case DatePicker.Calendar.Gregorian:
                    this.dateFormat = configs.dateFormat[DatePicker.Calendar.Gregorian] || this.defaultFormat;
                    break;
                case DatePicker.Calendar.Hijri:
                    this.dateFormat = configs.dateFormat[DatePicker.Calendar.Hijri] || this.defaultFormat;
                    break;
            }
        } else {
            this.dateFormat = this.dateFormat || this.defaultFormat;
        }

        if (this.calendar == DatePicker.Calendar.Hijri) {
            this.yearRange = '1276:1500';
        } else {
            this.yearRange = '1860:2077';
        }

        // Mapping hijri to ummalqura
        if (this.calendar == DatePicker.Calendar.Hijri) {
            this.calendar = 'ummalqura';
        }
    }

    show = () => {
        if (this.disabled) return;

        let lang = this.lang || this.datepickerService.getLanguage() || this.defaultLang;
        let options: any = {};
        options.onSelect = (date: any) => this.setValue(date);
        options.dateFormat = this.dateFormat;
        options.yearRange = this.yearRange;
        options.showOnFocus = false;

        let instance;
        if (lang == 'ar') {
            instance = (<any>$).calendars.instance(this.calendar, 'ar');
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
            instance = (<any>$).calendars.instance(this.calendar);
        }
        
        options.minDate = this.getMinDate(instance);
        options.maxDate = this.getMaxDate(instance);
        
        options.calendar = instance;

        (<any>$(this.element)).calendarsPicker('destroy')
                              .calendarsPicker(options)
                              .calendarsPicker('show');
    }

    @HostListener('click') onClick() {
        if (this.clickable) this.show();
    }

    setValue(date: any) {
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
