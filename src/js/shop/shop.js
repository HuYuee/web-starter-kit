define(['jquery','util', 'template'], function ($, Market, template) {
  $('body').css('visibility', 'visible');
  var Shop = {
    init: function(){
      var that = this;
      that.initNavTab();

      //店铺热销产品
      that.getHotProduct();

      // 获取产品id
    //  var requestId = Market.getRequset();

      //加载商户信息
      //that.getCompanyInfo(requestId.id);

      $('#cloudApp').navTab();
      this.tabNav();
    },
    /*
    * demo:shop.html?isvId=59e99ae5-945d-42e1-8fdf-ccc857e9eb95#allproducts
    */
    tabNav: function(){
      var nextNav = location.hash;
      var navs = $('#cloudApp').find('a');
      for(var i = 0, len = navs.length; i < len; ++i){
        if($(navs[i]).attr('href') == nextNav){
          $(navs[i]).trigger('click');
          return;
        }
      }
    }
    ,
    initNavTab: function(){//初始化页签控件
      $.fn.navTab = function(){
        $(this).on('click', function(e){
          var $li = null, tragetId = null;
          if(e.target.nodeName === "LI"){
            $li = e.target;
          }
          else if(e.target.nodeName === "A"){
            $li = $(e.target).parent();
          }
          else{
            return;
          }

          if($($li).hasClass('active')) return;
          tragetId = $($li).find('a').attr('href');
          if($(tragetId).length == 1){
            $($li).parent().find('.active').removeClass('active');
            $($li).addClass('active');
            $(tragetId).parent().find('.active').removeClass('active');
            $(tragetId).addClass('active');
            e.preventDefault();
          }
        })
        return this;
      }
    },
    getHotProduct: function(){
      if(Market.isDev){
        var requestId = Market.getRequset();
        var rightURl = '/market/product/saleInfo/' + requestId.id;
        Market.isvId = requestId.id;
      }
      else{
        //Restful模式
        var request = Market.getRestful();
        var rightURl = '/market/product/saleInfo/' + request[0];
        Market.isvId = request[0];
      }

      $.ajax({
          type:'get',
          url: '/market/product/shops/' + Market.isvId + '/hotsaleproducts',
          dataType: "JSON",
          success: function(data){
            var dataStatus = data.status;
            if(dataStatus && data.data.length > 0){
              var ProductListHTML = template('telHotProduct', data);
            }
            else{
              $('.telHotProduct').css('padding', 0);
            }
          }
      });
    },
    //获取公司信息，显示公司logo
    getCompanyInfo: function(isvId){
      var isvIdHref = '/market/product/isvInfoAndProducts?isvId=' + isvId;
      $.ajax({
          type:'get',
          // http://172.20.18.24/market/product/saleInfo/5
          url: isvIdHref,
          dataType: "JSON",
          success: function(data){
              var dataStatus = data.status;
              if(dataStatus){
                var companyInfo = data.data.isvInfo;
                $('.product-content-name').text(companyInfo.isvName);
                $('.product-content-detail').text(companyInfo.isvBrief);
                $('.product-img').find('img').attr('src', companyInfo.isvLogo);
                $('.product-img img').on('error', function(){
                    $(this).attr('src', '../images/index/noimage.jpg');
                })

               var ProductListHTML = template('shopAllApp', data.data);
               document.getElementById('allproducts').innerHTML = ProductListHTML;
                //如果app logo不存在，则加载默认的
                $('.product-ul img').on('error', function(e){
                　　$(this).attr('src','../images/index/noimage.jpg');
                });

              }
          }
        })
    }
  }

  $(function() {
      Shop.init();
  });
})
