define(['jquery', 'util', 'template'], function($, u, template) {
    $('body').css('visibility', 'visible');
    var Module = {
        init: function() {
            var that = this;

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
                autoplaySpeed: 5000
            });
            that.initNavTab();
            if(!u.isDev){
              var len = $('.nav-tabs').length;
              for(var i = 0; i < len; ++i){
                $('#navTab' + i).navTab();
              }
            }
            else{
                that.getIndexData();
            }
        },
        initNavTab: function() { //初始化页签控件
            $.fn.navTab = function() {

                //添加活动特效
                $(this).parent().append('<div class="line"></div>');
                Module.navMoveLine(this);

                $(this).on('click', function(e) {
                    var $li = null,
                        tragetId = null;
                    if (e.target.nodeName === "LI") {
                        $li = e.target;
                    } else if (e.target.nodeName === "A") {
                        $li = $(e.target).parent();
                    } else {
                        return;
                    }

                    if ($($li).hasClass('active')) return;
                    tragetId = $($li).find('a').attr('href');
                    if ($(tragetId).length == 1) {
                        $($li).parent().find('.active').removeClass('active');
                        $($li).addClass('active');
                        $(tragetId).parent().find('.active').removeClass('active');
                        $(tragetId).addClass('active');
                        e.preventDefault();
                    }
                })
                return this;
            };
        },
        handleEvent: function(event) {
            var target = null;
            if (event.target.nodeName === 'A') {
                target = $(event.target).parent();
            } else if (event.target.nodeName === 'LI') {
                target = $(event.target);
            }
            return target;
        },
        navMoveLine: function(that) {
            var timerin = false;
          //  var dnLength = $(that).parent().length;
            $(that).find('li').hover(function(e) {
                clearTimeout(timerin); // 清除未执行的代码，重置回初始化状态
                timerin = setTimeout(function() {
                    //console.log('show');
                    var ele = Module.handleEvent(e);
                    if (!ele) return;
                    var $cloudApp = $(ele).parents('.cloud-app__head--right');
                    var parentLeft = $cloudApp.offset().left;
                    var width = ele.width() + 30,
                        left = ele.offset().left,
                        rLeft = left - parentLeft;
                    $cloudApp.find('.line').animate({ 'left': rLeft, 'width': width }, 200);
                    timerin = false;
                }, 100);
            }, function(e) {
                var ele = e.toElement || e.relatedTarget || e.fromElement;
                if (ele.nodeName === 'A' || ele.nodeName === 'LI') {
                    return;
                }
                $('.line').animate({ 'width': 0 }, 200);
              /*  if (dnLength == $('.toptab-content.dn').length) {
                    Header.resetFocus();
                }*/
            });
        },
        getIndexData: function() {
            $.ajax({
                type: "get",
                url: "/market/product/getByStatus/3",
                //请求的参数
                /*data:{Name:"sanmao",Password:"sanmaoword"},*/
                //请求的数据类型
                dataType: "json", //"xml", "html", "script", "json", "jsonp", "text".
                //成功回调
                success: function(data) {
                    if (data.status == 1) {
                        /*模板拼接字符串*/
                        var ProductListHTML = template('dataListAll', data);
                        document.getElementById('datalist').innerHTML = ProductListHTML;
                        /*初始化navTab*/
                        for (var i = 0; i < data.data.length; i++) {
                            $('#navTab' + i).navTab();
                        }
                        /*判断从后台读取的img路径是否正确*/
                        u.getUndefindImage(".cloud-app__item--img img")

                    } else if (data.status == 0) {
                        $("#datalist").html('<h1 class="tc nodadaShow">没有查询到分类的产品信息</h1>');
                    }
                },
                //失败回调
                error: function(data) {
                    //console.log(data);
                }
            });
        }
    }

    $(function() {
        Module.init();
    });
})
