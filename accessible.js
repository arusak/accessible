(function ($) {
	var classes = {
		active: 'accessible-button_active'
	};

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
		var btnLarger = $('.accessible-button-larger');
		var btnSmaller = $('.accessible-button-smaller');

		var btnSans = $('.accessible-button-sans');
		var btnSerif = $('.accessible-button-serif');

		var btnEnter = $('.accessible-enter');
		var btnLeave = $('.accessible-leave');

		btnEnter.click(function () {
			body.addClass('body-accessible');
		});

		btnLeave.click(function () {
			body.removeClass('body-accessible');
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
				$('.accessible-button-group-theme .accessible-button').removeClass('accessible-button_active');
				$(this).addClass('accessible-button_active');
			});
		});

		btnSans.click(function () {
				body.addClass('font-family-sans');
				btnSans.addClass(classes.active);
				btnSerif.removeClass(classes.active);
			}
		);

		btnSerif.click(function () {
				body.removeClass('font-family-sans');
				btnSerif.addClass(classes.active);
				btnSans.removeClass(classes.active);
			}
		);
	});
})(jQuery.noConflict());