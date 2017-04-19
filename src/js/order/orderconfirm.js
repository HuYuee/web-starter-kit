define(['jquery','util', 'template'], function ($, u, template) {
    $('body').css('visibility', 'visible');

    $(function() {
        var url = location.search;
        // console.log(url);
        // var Request = new Object();
        // if(url.indexOf("?") != -1) {
        //     var str = url.substr(1);
        //     strs = str.split("&");
        //     for(var i = 0; i < strs.length; i++) {
        //         Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
        //     }
        // }

        var productName = $("#productName").val();
        var productSpecification = $("#specificationsName").val();
        var productLease = $("#specificationsLease").val();
        var productLeaseSub = $("#specificationsLease").val();
        var productPrice = $("#originalPrice").val();
        var productId = $("#productId").val();
        var pkSpecifications = $("#pkSpecifications").val();
        var count = $("#count").val();

        // console.log(count);
        var tableTr = $(".order-confirm-table tr");
        if(productPrice == 0){
            $("#orderConfirmSub").html("确认订单");
        }
        if(count != ''){
            // console.log(count,1);
            tableTr.eq(0).find("th").last().before('<th>数量</th>');
            tableTr.eq(1).find("td").last().before('<td>'+count+'</td>');
        }
//      if(productLease.indexOf("Year")>-1){
//          productLease = productLease.substring(5).substring(0,1);
//          $("#productLeaseHtml").html(productLease+"年");
//      }else{//if(productLease.indexOf("Month")>-1)
//          productLease = productLease.substring(5).substring(0,1);
//          $("#productLeaseHtml").html(productLease+"个月");
//      }
//      if(productLease == ''){
//          tableTr.eq(0).find("th").eq(2).hide();
//          tableTr.eq(1).find("td").eq(2).hide();
//      }
        if(productLease < 12){
            $("#productLeaseHtml").html(productLease+"个月");
        }else if(productLease>=12){
            $("#productLeaseHtml").html((productLease/12)+"年");
        }else{
            tableTr.eq(0).find("th").eq(2).hide();
            tableTr.eq(1).find("td").eq(2).hide();
            productLeaseSub = '';
        }

        if($("#recommendCodeVal").val() == 1){//推荐码显示
            $("#recommendCodeBox").show();
        }
        if($("#permissionToUseVal").val() == 1){//同意将手机号和邮箱提交给服务商显示
            $("#permissionToUseBox").show();
        }

        // $("#productNameHtml").html(productName);
        // $("#productSpecificationHtml").html(productSpecification);
        //
        // $("#productPriceHtml,.productPriceHtml,#order-complete-price").html(productPrice);
        // // $("#orderNumHtml,#order-complete-num").html(orderNum);
        //
        // $("#productName").val(productName);
        // $("#specificationsName").val(productLease);
        // $("#specificationsLease").val(productLease);
        // $("#productPrice").val(productPrice);


        // $("#orderNumStaus").val(orderNum);
        // $("#alertBoxShow").val(pageAlertBoxShow);
        // $(".order-detail-in").attr("href","/tenant/manage#/shopping/order/order/"+orderNum);

        // if(pageAlertBoxShow == 1) {
        //     $(".order_confirm_box").addClass("order_confirm_box_detail");
        //     $(".order-back-number").addClass("block");
        // }
        $(".order_confirm_box_detail .order-confirm-step li").addClass("cur");


        //弹出层
        function centerH(box) {
            box.css({
                top: ($(window).height() - box.outerHeight()) / 2 + $(document).scrollTop()
            });
        }

        function alertBoxShow(ele) {
            var height = $(window).height() > $("html").outerHeight() ? $(window).height() : $("html").outerHeight();
            $(".order-status-alert-bg").height(height);
            centerH($(".order-status-detail"));
            $("#cloud-app").parent(".section").css("position", "static");
            $(ele).show();
        }

        function alertBoxHide(ele) {
            $(ele).hide();
            $("#cloud-app").parent(".section").css("position", "relative");
        }

        var checkedStatus = 0;
        $("#agreementBtn").click(function(){
            if(checkedStatus==0){
                // console.log(1);
                $(".gopay-mask-btn").show();
                $(".order-confirm-go-pay-btn").addClass("hui");
                $("#agreementBtn").attr("checked","");
                checkedStatus = 1;
            }else{
                $(".gopay-mask-btn").hide();
                $(".order-confirm-go-pay-btn").removeClass("hui");
                $("#agreementBtn").attr("checked","checked");
                checkedStatus = 0;
            }
        });

        var permissionStatus = 0;
        $("#permissionToUse").click(function(){
            if(checkedStatus==0){
                // console.log(1);
                $(".gopay-mask-btn").show();
                $(".order-confirm-go-pay-btn").addClass("hui");
                $("#permissionToUse").attr("checked","");
                checkedStatus = 1;
            }else{
                $(".gopay-mask-btn").hide();
                $(".order-confirm-go-pay-btn").removeClass("hui");
                $("#permissionToUse").attr("checked","checked");
                checkedStatus = 0;
            }
        });


        //订单确认提交
        // var orderbackurl = '';
        // var orderUrlvalFailed = '';
        var userMobile = '';
        var orderBackData = {};
        var orderConfirm = function() {
            var productNameSub = productName;
            var specificationsNameSub = productSpecification;
            var specificationsLeaseSub = productLeaseSub;
            var originalPriceSub = productPrice;
            var payBtnSubLoadingHtml = '<div class="subBtnMaskLoading"><div class="loading-w"><span></span></div></div>';
            $(".go-pay-box").append(payBtnSubLoadingHtml);

            $.ajax({
                type: 'get',
                dataType: 'json',
                url: "/market/user",
                async: false,
                success: function(res) {
                    userMobile = res.user.userMobile;
                    // console.log(userMobile);
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {

                }
            });

            var orderData = {
                "operatorMobile": userMobile,
                "busiAmount": originalPriceSub,
                "specificationsName": specificationsNameSub,
                "originalPrice": originalPriceSub,
                "productId": productId,
                "productName": productName,
                "pkSpecifications": pkSpecifications,
                //周期
                "specificationsLease": specificationsLeaseSub,
                //数量
                "count": count,
                "orderNotes": $("#orderNotes").val(),
                "recommendCode": $("#recommendCode").val()
            };
            // if(originalPriceSub != 0){
            //     var newWin = window.open('about:blank', '_blank');
            //     newWin.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>跳转中...</title><style>*{margin:0;padding:0;}html,body{height:100%; background:fff;}.fenceng{width:100%;height:100px;border-bottom:2px solid #fafafa;}.loadingBg{position:fixed;top:0;left:0;width:100%;height:100%;background:#000000;opacity:0.5;}.loadEffect{width:100px;height:100px;position:absolute;left:45%;top:45%;}.loadEffect span{display:inline-block;width:30px;height:10px;border-top-left-radius:5px;border-bottom-left-radius:5px;background:#C3C3C3;position:absolute;-webkit-animation:load 1.04s ease infinite}@-webkit-keyframes load{0%{opacity:1}100%{opacity:.2}}.loadEffect span:nth-child(1){left:0;top:50%;margin-top:-5px;-webkit-animation-delay:.13s}.loadEffect span:nth-child(2){left:10px;top:20px;-webkit-transform:rotate(45deg);-webkit-animation-delay:.26s}.loadEffect span:nth-child(3){left:50%;top:10px;margin-left:-15px;-webkit-transform:rotate(90deg);-webkit-animation-delay:.39s}.loadEffect span:nth-child(4){top:20px;right:10px;-webkit-transform:rotate(135deg);-webkit-animation-delay:.52s}.loadEffect span:nth-child(5){right:0;top:50%;margin-top:-5px;-webkit-transform:rotate(180deg);-webkit-animation-delay:.65s}.loadEffect span:nth-child(6){right:10px;bottom:20px;-webkit-transform:rotate(225deg);-webkit-animation-delay:.78s}.loadEffect span:nth-child(7){bottom:10px;left:50%;margin-left:-15px;-webkit-transform:rotate(270deg);-webkit-animation-delay:.91s}.loadEffect span:nth-child(8){bottom:20px;left:10px;-webkit-transform:rotate(315deg);-webkit-animation-delay:1.04s}.texttips{position:absolute;bottom:-20px;font-size:14px;width:100px;text-align:center;color:#ccc;}</style></head><body><div class="fenceng"></div><div class="loadingBg"></div><div class="loadEffect"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></body></html>');
            // }
            //提交订单
            $.ajax({
                type: 'POST',
                contentType: "application/json",
                url: '/market/yonyoucloud/booking',
                data: JSON.stringify(orderData),
                dataType: 'json',
                async: false,
                success: function(data) {
                    var data = data;
                    if(data.status == 1) {
                        orderBackData.orderNum = data.data.agreementNum; // 订单号
                        orderBackData.orderbackurl = data.payUrl;
                        alertBoxShow(".order-status-alert-box");
                        $(".order-confirm-step li").eq(1).addClass("cur");
                        $("#payLinkBtn").attr("href",data.payUrl)
                        // 重定向到目标页面
//                      newWin.location.href = data.payUrl;
                        if(data.data.busiAmount !=0){
                            var order = {};
                            order.agreementNum = orderBackData.orderNum;
                            var newWinUrl = getPayUrl(order,data.payUrl);
                            if(newWinUrl !=''){
                                // window.open(newWinUrl);
                                window.location.href = newWinUrl;
                            }else{
                                $(".subBtnMaskLoading").hide();
                            }
                        }else{
                            window.location.href = "/market/ordercomplete?agreementNum=" + orderBackData.orderNum;
                        }
                    } else {
                        alert(data.msg);
                    }
                }
            });
        }

        $("#orderConfirmSub").on('click', function() {
            orderConfirm();
        });

        //弹出框
        /*var alertBosDisplay = function() {
         var orderNumStaus = orderBackData.orderNum;
         var orderStausUrl = '/market/yonyoucloud/getorderstatus/?agreementNum=' + orderNumStaus;
         $.ajax({
         type: 'get',
         dataType: 'json',
         url: orderStausUrl,
         success: function(res) {
         if(res.status == 1) {
         if(res.orderStatus == 1) {
         alertBoxHide(".order-status-alert-box")
         $(".order_confirm_box").addClass("order_confirm_box_detail");
         $(".order-confirm-step li").eq(1).addClass("cur");
         $(".go-pay-box").hide();
         $(".order-status-title").html("订单已支付");
         } else {
         $(".order-status-title").html("订单未支付，请及时支付");
         }
         window.location.href = "/market/market/src/html/ordercomplete.html?agreementNum=" + orderNumStaus;
         }
         },
         error: function(XMLHttpRequest, textStatus, errorThrown) {

         }
         });
         }

         var refreshOrderState = function(){
         var refreshTime = 1000*30;
         setTimeout(function() {
         alertBosDisplay();
         }, refreshTime);
         }


         var alertBoxHide = function() {
         $(".order-status-alert-box").hide();
         }*/

//      $("#order-paied-btn").on('click', function() {
//          alertBosDisplay();
//          refreshOrderState();
//      });

//      $(".alert-order-close-btn").on('click', function() {
//          alertBoxHide();
//      });
    })

})

