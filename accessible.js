(function ($) {
	var classes = {
		active: 'accessible-button_active',
		imgoff: 'accessible-button-images-off'
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

		var btnImages = $('.accessible-button-toggle-images');

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

		btnImages.click(function () {
			body.toggleClass('no-images');

			if (body.hasClass('no-images')) {
				btnImages.addClass(classes.imgoff).text('Показать картинки');
			} else {
				btnImages.removeClass(classes.imgoff).text('Убрать картинки');
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