(function ($) {
    var fontSizes = [100, 120, 140];
    var fontSizeClasses = fontSizes.reduce(function (prev, current) {
        return prev + ' font-size-' + current;
    }, '');

    $(function () {
        var body = $('body');
        $('.accessible-toggle').click(function () {
            body.toggleClass('body-accessible');
        });

        fontSizes.forEach(function (size) {
            $('.accessible-' + size).click(function () {
                body.removeClass(fontSizeClasses);
                body.addClass('font-size-' + size);
            });
        });
    });
})(jQuery.noConflict());