define(['jquery', 'util', 'template'], function($, u, template) {
    $('body').css('visibility', 'visible');

    var orderComplete = function(){
        var agreementNum = $("#agreementNum").val();
        var orderGetOneUrl = "/market/yonyoucloud/getorderstatus?agreementNum=" + agreementNum; //获取单个订单
        $.ajax({
            type: 'GET',
            contentType: "application/json",
            url: orderGetOneUrl,
            cache: false,
            dataType: 'json',
            success: function(res) {
                if(res.status == 1) {
                    var orderData = res.data;
                    // console.log(orderData);
                    $("#order-complete-price").html(orderData.busiAmount);
                    $("#order-complete-num").html(orderData.agreementNum);
                    var detailUrl = "/market/index#/shopping/order/order/"+orderData.agreementNum;
                    $(".order-detail-in").attr("href","/market/index#/shopping/order/order/"+orderData.agreementNum);
                    /*开通显示*/
                    if(orderData.openMode==1){
                        $(".order-complete-tips").html('<span>您购买的应用已经申请自动开通，稍后请在<br /><a href="/market/index#/shopping/orderlist/orderlist">我已经购买的应用</a>查看开通详情</span>');
                    }
                    if(orderData.openMode==3){
                        $(".order-complete-tips").html('<span>您购买的应用需要人工服务，请联系服务商提供服务，<br/>并在接受服务后，进入订单详情中确认服务。</span>');
                    }
                    /*开通显示结束*/
                    if(orderData.orderStatus == 1){
                        $(".order-complete-text").find("span").html("支付成功");
                        $(".order-complete-text").find('.loading').hide();
                    }
                    if(orderData.orderStatus == 2){
                        $(".order-complete-text").find("span").html("支付中,正在查询支付状态");
                        $(".order-complete-text").find('.loading').show();
                        refreshOrderStatus();
                    }
                } else {
                    alert(res.msg);
                }
            }
        });
    }
    var x = 0;
    var refreshOrderStatus = function(){
        if(x<12){
            x = x + 1;
            setTimeout(orderComplete,5000);
        }else{
            $(".order-complete-text").find("span").html("未查询到支付结果，请到订单详情页面查看详细信息!");
            $(".order-complete-text").find('.loading').hide();
        }

    }

    $(function(){
        orderComplete();
    })

})