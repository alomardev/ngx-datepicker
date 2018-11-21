(function($) {
	$.calendars.calendars.gregorian.prototype.regional['ar'] = {
		name: 'Gregorian',
		epochs: ['BCE', 'CE'],
		monthNames: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
						'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
		monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
		dayNames: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dayNamesShort: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dayNamesMin: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
		dateFormat: 'yyyy-mm-dd', // See format options on BaseCalendar.formatDate
		firstDay: 0, // The first day of the week, Sat = 0, Sun = 1, ...
		isRTL: true
	};
})(jQuery);
