import jQuery from 'jquery';

(function($) {
	$.calendars.calendars.gregorian.prototype.regionalOptions['ar'] = {
		name: 'Gregorian',
		epochs: ['BCE', 'CE'],
		monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
						'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dayNamesShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dayNamesMin: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dateFormat: 'yyyy-mm-dd',
		firstDay: 0,
		isRTL: true
	};
})(jQuery);

(function ($) {
	$.calendars.calendars.ummalqura.prototype.regionalOptions['ar'] = {
		name: 'UmmAlQura', // The calendar name
		epochs: ['BAM', 'AM'],
		monthNames: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'],
		monthNamesShort: ['المحرّم', 'صفر', 'ربيع الأول', 'ربيع الثاني', 'جمادى الاول', 'جمادى الآخر', 'رجب', 'شعبان', 'رمضان', 'شوّال', 'ذو القعدة', 'ذو الحجة'],
		dayNames: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dayNamesMin: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dayNamesShort: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dateFormat: 'yyyy/mm/dd', // See format options on BaseCalendar.formatDate
		firstDay: 0, // The first day of the week, Sat = 0, Sun = 1, ...
		isRTL: true // True if right-to-left language, false if left-to-right
	};
})(jQuery);

(function ($) {
	$.calendars.calendars.ummalqura.prototype.regionalOptions['en'] = {
		name: 'UmmAlQura', // The calendar name
		epochs : [ 'BH', 'AH' ],
		monthNames : [ 'Al-Muharram', 'Safar','Rabi\' al-awwal', 'Rabi\' Al-Thani','Jumada Al-Awwal', 'Jumada Al-Thani', 'Rajab','Sha\'aban', 'Ramadan', 'Shawwal','Dhu al-Qi\'dah', 'Dhu al-Hijjah' ],
		monthNamesShort : [ 'Muh', 'Saf', 'Rab1', 'Rab2','Jum1', 'Jum2', 'Raj', 'Sha\'', 'Ram', 'Shaw','DhuQ', 'DhuH' ],
		dayNames : [ 'Sunday', 'Monday','Tuesday’', 'Wednesday','Thursday', 'Friday', 'Saturday'],
		dayNamesMin : [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
		dayNamesShort: [ 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa' ],
		dateFormat: 'yyyy/mm/dd', // See format options on BaseCalendar.formatDate
		firstDay: 0, // The first day of the week, Sat = 0, Sun = 1, ...
		isRTL: true // True if right-to-left language, false if left-to-right
	};
})(jQuery);
