define(['jquery'], function ($) {
/**
 * Created by Administrator on 2017/1/20.
 */
var index = 0;
var timer = 0;
var ulist = $('.img_list ul');
var blist = $('.btn_list ul');
var list = ulist.find('li');
var llength = list.length;//li的个数，用来做边缘判断
var lwidth = $(list[0]).width();//每个li的长度，ul每次移动的距离
var uwidth = llength * lwidth;//ul的总宽度

function init(){
    //生成按钮(可以隐藏)
    addBtn(list);
    //显示隐藏左右点击开关
    $('.link').css('display', 'block');
    $('.link').bind('click', function(event) {
        var elm = $(event.target);
        doMove(elm.attr('id'));
        return false;
    });

    //初始化描述
    var text = ulist.find('li').eq(0).find('img').attr('alt');
    var link = ulist.find('li').eq(0).find('a').attr('href');
    $('.img_intro .text a').text(text);
    $('.img_intro .text a').attr('href',link);
    auto();
}

function auto(){
    //定时器
    timer = setInterval(function(){
      doMove('toRight');
    }, 3000);

    $('.img_list li, .btn_list li').hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function(){
          doMove('toRight')
        }, 3000);
    });
}

function changeBtn(i){
    blist.find('li').eq(i).addClass('on').siblings().removeClass('on');
    var text = ulist.find('li').eq(i).find('img').attr('alt');
    var link = ulist.find('li').eq(i).find('a').attr('href');
    $('.img_intro .text a').text(text);
    $('.img_intro .text a').attr('href',link);
}

function addBtn (list){
    for (var i = 0; i < list.length; i++) {
        var imgsrc = $(list[i]).find('img').attr('src');
        var listCon = '<li><img src="'+imgsrc+'""></li>';
        $(listCon).appendTo(blist);
        //隐藏button中的数字
        //list.css('text-indent', '10000px');
    };
    blist.find('li').first().addClass('on');
    blist.find('li').click(function(event) {
        var _index = $(this).index();
        doMove(_index);
    });
}

function doMove(direction){
    //向右按钮
    if (direction =="toRight") {
        index++;
        if ( index< llength) {
            uwidth = lwidth *index;
            ulist.css('left',-uwidth);
            //ulist.animate({left: -uwidth}, 1000);

        }else{
            ulist.css('left','0px');
            index = 0;
        };
        //向左按钮
    }else if(direction =="toLeft"){
        index--;
        if ( index < 0) {
            index = llength - 1;
        }
        uwidth = lwidth *index;
        ulist.css('left',-uwidth);
        //ulist.animate({left: -uwidth}, "slow");
        //点击数字跳转
    }else{
        index = direction;
        uwidth = lwidth *index;
        ulist.css('left',-uwidth);
    };
    changeBtn(index);
}
init();
});
