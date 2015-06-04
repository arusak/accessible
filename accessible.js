(function ($) {
	var classes = {
		active: 'accessible-button_active',
		sans: 'font-family-sans',
		imgoff: 'accessible-button-images-off'
	};

	var cookieTypes = {
		fontSize: 'accessibility.font.size',
		images: 'accessibility.images',
		theme: 'accessibility.theme',
		fontFamily: 'accessibility.font.family'
	};

	var fontSizes = ['s', 'm', 'l', 'xl', 'xxl'];
	var defaultFontSize = 1;
	var fontSize = defaultFontSize;
	var fontSizeClasses = fontSizes.reduce(function (prev, current) {
		return prev + ' font-size-' + current;
	}, '');

	var themes = ['normal', 'inverted', 'colored'];
	var themeClasses = themes.reduce(function (prev, current) {
		return prev + ' theme-' + current;
	}, '');

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));

		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	function setCookie(name, value) {
		document.cookie = name + '=' + encodeURIComponent(value) + '; path=/';
	}

	$(function () {
		var body = $('body');

		var themeButtons = $('.accessible-button-group-theme .accessible-button');

		var btnLarger = $('.accessible-button-larger');
		var btnSmaller = $('.accessible-button-smaller');

		var btnSans = $('.accessible-button-sans');
		var btnSerif = $('.accessible-button-serif');

		var btnImages = $('.accessible-button-toggle-images');

		var btnEnter = $('.accessible-enter');
		var btnLeave = $('.accessible-leave');

		function setFontSize(size) {
			if (size < 0 || size >= fontSizes.length) return;

			fontSize = size;

			body.removeClass(fontSizeClasses);
			body.addClass('font-size-' + fontSizes[size]);

			if (size >= fontSizes.length - 1) {
				size = fontSizes.length - 1;
				btnLarger.prop('disabled', true);
			} else {
				btnLarger.prop('disabled', false);
			}

			if (size <= 0) {
				size = 0;
				btnSmaller.prop('disabled', true);
			} else {
				btnSmaller.prop('disabled', false);
			}
		}

		function setSans(sans) {
			body.toggleClass(classes.sans, sans);
			btnSans.toggleClass(classes.active, sans);
			btnSerif.toggleClass(classes.active, !sans);
		}

		function setTheme(theme) {
			if (themes.indexOf(theme) === -1) return;

			body.removeClass(themeClasses).addClass('theme-' + theme);
			themeButtons.removeClass(classes.active);
			$('.accessible-button-' + theme).addClass(classes.active);
		}

		function setImages(images) {
			body.toggleClass('no-images', !images);

			if (images) {
				btnImages.removeClass(classes.imgoff).text('Убрать картинки');
			} else {
				btnImages.addClass(classes.imgoff).text('Показать картинки');
			}
		}

		function initializeByCookies() {
			var themeCookie = getCookie(cookieTypes.theme);
			var fontSizeCookie = getCookie(cookieTypes.fontSize);
			var imagesCookie = getCookie(cookieTypes.images);
			var fontFamilyCookie = getCookie(cookieTypes.fontFamily);

			setFontSize(+fontSizeCookie || defaultFontSize);
			setSans(fontFamilyCookie === 'sans');
			setTheme(themeCookie);
			setImages(imagesCookie !== 'false');
		}

		btnEnter.click(function () {
			body.addClass('body-accessible');
		});

		btnLeave.click(function () {
			body.removeClass('body-accessible');
		});

		btnLarger.click(function () {
			setFontSize(fontSize + 1);
			setCookie(cookieTypes.fontSize, fontSize);
		});

		btnSmaller.click(function () {
			setFontSize(fontSize - 1);
			setCookie(cookieTypes.fontSize, fontSize);
		});

		btnImages.mousedown(function () {
			setImages(body.hasClass('no-images'));
			setCookie(cookieTypes.images, !body.hasClass('no-images'));
		});

		themes.forEach(function (theme) {
			$('.accessible-button-' + theme).click(function () {
				setTheme(theme);
				setCookie(cookieTypes.theme, theme);
			});
		});

		btnSans.click(function () {
			setSans(true);
			setCookie('accessibility.font.family', 'sans');
		});

		btnSerif.click(function () {
			setSans(false);
			setCookie('accessibility.font.family', 'serif');
		});

		initializeByCookies();
	});
})(jQuery.noConflict());