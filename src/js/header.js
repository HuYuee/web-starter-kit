var Header = {
    init: function() {
        var that = this;
        that.tabClick();
        that.tabHover();
    },

    tabClick: function() {
        $('#headTab').on('click', function(e) {
            var $li = null;
            if (e.target.nodeName === "LI") {
                $li = e.target;
            } else if (e.target.nodeName === "A") {
                $li = $(e.target).parent();
            } else if (e.target.nodeName === "I") {
                $li = $(e.target).parents('li');
            } else {
                return;
            }
            if ($($li).hasClass('active')) {
                console.log(1111);
                return
            } else {
                console.log($($li))
                $($li).parent().find('.active').removeClass('active');
                $($li).addClass('active');
                window.open($($li).find('a').attr('href'));
                e.preventDefault();
            };

        })
        return this;
    },
    tabHover: function() {
        $("#product").hover(function() {
            $("#conproduct").removeClass("dn");
        }, function() {
            $("#conproduct").addClass("dn");
        });
    }
}
$(function() {
    Header.init();
});
