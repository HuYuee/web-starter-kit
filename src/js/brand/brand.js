define(['jquery', 'util'], function($, util) {
    $('body').css('visibility', 'visible');
    var Brand = {};
    // util.init();
    $(document).ready(function() {
        $(".banner").slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            centerMode: true,
            arrows: false,
            pauseOnHover: true,
            autoplay: true,
            autoplaySpeed: 1200
        });
        $('.hot-brand-logo').on("mouseover mouseout", function() {
            var index = $(this).parents('.hot-brand-item').index();
            if(Brand.index == index) return;
            Brand.index = index;
            $('.hot-brand-detail').stop(true,true);

            $(this)
            .parents('.hot-brand-item-wrap')
            .find(".hot-brand-detail")
            .animate({
                    bottom: 0,
                    opacity:1
                },
                  300);
        })

        $('.hot-brand-detail').on('mouseleave', function() {
              Brand.index = null;
            $('.hot-brand-detail')
            .animate({
                bottom: -214,
                opacity:0
            },
            200);
        });
    });


});
