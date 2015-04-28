(function ($) {
	var fontSizes = ['s', 'm', 'l', 'xl', 'xxl'];
	var fontSizeIndex = 1;
	var fontSizeClasses = fontSizes.reduce(function (prev, current) {
		return prev + ' font-size-' + current;
	}, '');

	var themes = ['normal', 'inverted', 'colored'];
	var themeClasses = themes.reduce(function (prev, current) {
		return prev + ' theme-' + current;
	}, '');


	$(function () {
		var body = $('body');
		var btnToggle = $('.accessible-button-toggle');
		var btnLarger = $('.accessible-button-larger');
		var btnSmaller = $('.accessible-button-smaller');

		btnToggle.click(function () {
			body.toggleClass('body-accessible');
			if (body.hasClass('body-accessible')) {
				$(this).text('ВЫКЛ.');
			} else {
				$(this).text('ВКЛ.')
			}
		});

		btnLarger.click(function () {
			fontSizeIndex += 1;
			body.removeClass(fontSizeClasses);
			body.addClass('font-size-' + fontSizes[fontSizeIndex]);

			btnSmaller.prop('disabled', false);

			if (fontSizeIndex === fontSizes.length - 1) {
				btnLarger.prop('disabled', true);
			}

		});

		btnSmaller.click(function () {
			fontSizeIndex -= 1;
			body.removeClass(fontSizeClasses);
			body.addClass('font-size-' + fontSizes[fontSizeIndex]);

			btnLarger.prop('disabled', false);

			if (fontSizeIndex === 0) {
				btnSmaller.prop('disabled', true);
			}
		});

		themes.forEach(function (theme) {
			$('.accessible-button-' + theme).click(function () {
				body.removeClass(themeClasses).addClass('theme-' + theme);
			});
		});

		$('.accessible-button-sans').click(function () {
				body.addClass('font-family-sans');
			}
		);

		$('.accessible-button-serif').click(function () {
				body.removeClass('font-family-sans');
			}
		);
	});
})(jQuery.noConflict());