define(["jquery","util","template"],function(e,t,a){e("body").css("visibility","visible");var n={init:function(){var a=this;if(e(".banner").slick({dots:!0,infinite:!0,speed:500,fade:!0,cssEase:"linear",centerMode:!0,arrows:!1,pauseOnHover:!0,autoplay:!0,autoplaySpeed:5e3}),a.initNavTab(),t.isDev)a.getIndexData();else for(var n=e(".nav-tabs").length,i=0;i<n;++i)e("#navTab"+i).navTab()},initNavTab:function(){e.fn.navTab=function(){return e(this).parent().append('<div class="line"></div>'),n.navMoveLine(this),e(this).on("click",function(t){var a=null,n=null;if("LI"===t.target.nodeName)a=t.target;else{if("A"!==t.target.nodeName)return;a=e(t.target).parent()}e(a).hasClass("active")||(n=e(a).find("a").attr("href"),1==e(n).length&&(e(a).parent().find(".active").removeClass("active"),e(a).addClass("active"),e(n).parent().find(".active").removeClass("active"),e(n).addClass("active"),t.preventDefault()))}),this}},handleEvent:function(t){var a=null;return"A"===t.target.nodeName?a=e(t.target).parent():"LI"===t.target.nodeName&&(a=e(t.target)),a},navMoveLine:function(t){var a=!1;e(t).find("li").hover(function(t){clearTimeout(a),a=setTimeout(function(){var i=n.handleEvent(t);if(i){var r=e(i).parents(".cloud-app__head--right"),s=r.offset().left,l=i.width()+30,o=i.offset().left,d=o-s;r.find(".line").animate({left:d,width:l},200),a=!1}},100)},function(t){var a=t.toElement||t.relatedTarget||t.fromElement;"A"!==a.nodeName&&"LI"!==a.nodeName&&e(".line").animate({width:0},200)})},getIndexData:function(){e.ajax({type:"get",url:"/market/product/getByStatus/3",dataType:"json",success:function(n){if(1==n.status){var i=a("dataListAll",n);document.getElementById("datalist").innerHTML=i;for(var r=0;r<n.data.length;r++)e("#navTab"+r).navTab();t.getUndefindImage(".cloud-app__item--img img")}else 0==n.status&&e("#datalist").html('<h1 class="tc nodadaShow">没有查询到分类的产品信息</h1>')},error:function(e){}})}};e(function(){n.init()})});