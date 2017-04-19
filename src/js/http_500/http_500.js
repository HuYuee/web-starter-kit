define(['jquery', 'util', 'template'], function($, util, template) {
    $("body").css("visibility", "visible");
    var http_500 = {
        count:10,
        setValue:function(){
            if(this.count<=0){
                window.location.href = $('#500-link').attr('href');
            }else {
                $('#500-count').html(this.count+'秒');
                this.count--;
            }
            setTimeout(function(){
                http_500.setValue();
            },1000);

        }
    }

    $(function() {
        http_500.setValue();
    });

});
