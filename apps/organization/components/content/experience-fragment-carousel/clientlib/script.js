(function($) {
    'use strict';

    $(function() {

        $('.carousel .content').each(function(index, element) {

            var e = $(element);
            var speed           = parseInt(e.attr('data-speed')          || 3000);
            var autoPlay        = e.attr('data-autoplay')  == 'true';
            var dots            = e.attr('data-dots')      == 'true';
            var arrows          = e.attr('data-arrows')    == 'true';
            var vertical        = e.attr('data-direction') == 'vertical';
            var fade			= e.attr('data-fade')	   == 'true';

            e.slick({
                infinite:        true,
                adaptiveHeight:  false,
                autoplaySpeed:   speed,
                autoplay:        autoPlay,
                dots:            dots,
                fade:			 fade,
                arrows:          arrows,
                vertical:        vertical,
                verticalSwiping: vertical,
                cssEase: 'ease-in-out'
            });
        });
    })

})(jQuery);
