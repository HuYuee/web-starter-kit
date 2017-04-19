window.onload = function() {
        var mk = {};
        mk.init = function() {
            // 初始化
            $(window).scroll(function() {
                var topHeight = $(window).scrollTop();
                var wHeight = $(window).height();
                topHeight != 0 ? $('.backtop').addClass('active') : $('.backtop').removeClass('active');
            })

            // 返回顶部
            $('.backtop').on('click', function() {
                $('body').animate({
                    scrollTop: 0
                }, 500);
            })
        }
        mk.init();
        var local = window.location.href;
        //点击首页登录
        $(".btn-logo").click(function() {
                var logo_url_logo = "/cas/login?sysid=market&verify_code=usercenter&service=";
                var change_local_logo = URLencode(local);
                window.location.href = logo_url_logo + change_local_logo;
            })
            //点击首页注册
        $(".btn-register").click(function() {
                var logo_url_register = "/tenant/register/registerTwo.html?service=";
                var change_local_register = URLencode(local);
                window.location.href = logo_url_register + change_local_register;
            })
            //点击首页退出
        $('.btn-leave').click(function() {
            var logo_url_leave = "/";
            window.location.href = logo_url_leave;
            $(".btn-logo").html('登陆');
            $('.btn-register').parent('.rightfont').removeClass('dn');
            $('.btn-leave').parent('.rightfont').addClass('dn');
        })

        //设置cookie
        var username = document.cookie.split(";")[0].split("=")[1];

        function setCookie(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }

        //获取cookie

        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);
            else return
            null;
        }
        //从cookie里获取at字符，看是否存在
        var getLogo_cooke_at = window.document.cookie.indexOf("at");
        if (getLogo_cooke_at != -1) {
            getUserData();
        }

        //获取cookie
        function getCookie(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);
            else return null;
        }
        //从cookie里获取at字符，看是否存在
        var getLogo_cooke_at = window.document.cookie.indexOf("at");
        if (getLogo_cooke_at != -1) {
            getUserData();
        }

    }
    //获取用户数据
function getUserData() {
    $.ajax({
        type: "get",
        url: "/market/user",
        //请求的参数
        /*data:{Name:"sanmao",Password:"sanmaoword"},*/
        //请求的数据类型
        datatype: "json", //"xml", "html", "script", "json", "jsonp", "text".
        //成功的回调
        success: function(data) {
            if (data.user.userName) {
                $(".btn-logo").html(data.user.userName);
                /*登陆成功，注册有礼隐藏*/
                $('.btn-register').parent('.rightfont').addClass('dn');
                $('.btn-leave').parent('.rightfont').removeClass('dn');
            }
        },
        //失败的回调
        error: function(data) {
            console.log(data);
        }
    });

}
//http请求链接特殊字符转译
function URLencode(sStr) {
    return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
}
