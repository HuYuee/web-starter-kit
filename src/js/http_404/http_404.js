define(['jquery', 'util', 'template'], function($, util, template) {
    $("body").css("visibility", "visible");
    var http_404 = {
        count:10,
        setValue:function(){
            if(this.count<=0){
                window.location.href = $('#404-link').attr('href');
            }else {
                $('#404-count').html(this.count+'秒');
                this.count--;
            }
            setTimeout(function(){
                http_404.setValue();
            },1000);

        }
    }

    $(function() {
        http_404.setValue();
    });

});
