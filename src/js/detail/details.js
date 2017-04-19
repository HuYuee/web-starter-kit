define(['jquery', 'util', 'template', 'artDialog','solazy'], function($, Market, template,soLazy) {
    $('body').css('visibility', 'visible');
    var Module = {
        init: function() {
            var that = this;
            // that.artDialog();
            //that.artDialog();
            that.domRender();
            that.tabNav();
            that.handleEvent();
            Module.timer = false;

            /*  Module.timerval = setInterval(function(){
                if(Market.loginStat || Market.getUserCount == 2){
                  clearTimeout(Module.timerval);
                  that.handleEvent();
                }
              }, 800);*/
        },
        artDialog: function() {
            var okFuncValidate = function() {

                var name = $('.customerName').val();
                var tel = $('.telephone').val();
                
                $('.dialog-ul .item-right').on('focus', function() {
                    $(this).removeClass('error-input');
                    $('.errorinfo').html('');
                })
                if (name == '') {
                    $('.customerName').addClass('error-input');
                    $('.errorinfo').html('<span><img src="/market/market/src/images/detail-image/errorinfo-error.png" />用户名不能为空!</span>')
                    return false;
                } else if (tel == '') {
                    $('.telephone').addClass('error-input');
                    $('.errorinfo').html('<span> <img src="/market/market/src/images/detail-image/errorinfo-error.png" />手机号不能为空！</span>')

                    return false;

                } else if (!(/^1[34578]\d{9}$/.test(tel))) {
                    $('.telephone').addClass('error-input');
                    $('.errorinfo').html('<span> <img src="/market/market/src/images/detail-image/errorinfo-error.png" />手机号格式不正确！</span>')
                    return false;
                }
            }

            //.consultation .view-info h1
            $('.consultation').on('click', function() {
                //400电话可有可无，但是服务电话一直是倒数第二个
                var telService =$('.pubMod .contact li').eq(-2).find('span').text();

                var d = dialog({
                    title: ' ',
                    fixed: true,
                    //设置遮罩
                    modal: true,
                    // 设置遮罩背景颜色
                    backdropBackground: '#000',
                    // 设置遮罩透明度
                    backdropOpacity: 0.4,
                    okValue: '提交',
                    ok: function() {
                        if (okFuncValidate() == false) {
                            return false;
                        } else {
                            Module.submitCustomer();
                        }
                    },
                    /*cancelValue: "取消",
                    cancel: function() {},*/
                    content: ' <ul class="dialog-ul">' +
                        '<li class="desc">您好，欢迎咨询客服获取产品报价！<br>您可以拨打'+ telService +
                        '<br>或留下您的联系方式，我们会尽快与您取得联系：<br></li>' +
                        '<li class="errorinfo"></li>' +
                        '<li class="dialog-ul-item">' +
                        '<input id="customerName"  type="text" class="item-right customerName" placeholder="您怎么称呼？"></li>' +
                        '<li class="dialog-ul-item">' +
                        '<input id="telephone"  type="text" class="item-right telephone"  placeholder="您的联系方式？"></li>' +
                        '<li class="dialog-ul-item">' +
                        '<input class="item-right mail"  placeholder="您的邮箱？"></li>' +
                        '<li class="dialog-ul-item">' +
                        '<input class="item-right companyName" placeholder="您所在的公司？"></li>' +
                        '<li class="dialog-ul-item">' +
                        '<input class="item-right job"  placeholder="还需要什么帮助，您可以写在这里。"></li>' +
                        '</ul>'

                });
                d.show();
                Module.d = d;
            })
        },

        //提交信息
        submitCustomer: function() {
            var productIdVar = Market.getRestful();
            var productId = productIdVar[0];

            var data = {
                customerName: encodeURI($('.customerName').val()),
                telephone: $('.telephone').val(),
                email: $('.mail').val(),
                companyName: encodeURI($('.companyName').val()),
                job: encodeURI($('.job').val()),
                productId: productId
            }
            $.ajax({
                url: Market.marketServer + '/market/public/customer',
                data: data,
                type: "post",
                // contentType: "application/json",
                dataType: 'JSON',
                success: function(data) {
                    if (data.status) {
                        Module.d.close();
                    }
                    Module.showCustomerMsg(data.msg);
                },
                error: function() {
                    Module.showCustomerMsg("保存出现异常!");
                }
            })
        },
        showCustomerMsg: function(msg) {
            var d = dialog({
                content: msg
            });
            d.show();
            setTimeout(function() {
                d.close().remove();
            }, 2000);
        },
        tabNav: function() {
            $('.tabs-link').fixedNav();
        },
        timerRequest: function(time) {
            if (!time) {
                time = 300;
            }
            clearTimeout(Module.timer); // 清除未执行的代码，重置回初始化状态
            Module.timer = setTimeout(function() {
                Module.timer = false;
                Module.totalPrice();
            }, 300);
        },
        spinner: function() {
            var reg = new RegExp("^[0-9]*$");
            //账号数量的增加和减少按钮
            $('.input-group-addon').on('click', function(e) {
                var that = $(e.target);
                if ($(that).hasClass('spin-up')) { //向上
                    var input = $(that).parents('.spinner').find('input');
                    var value = parseInt($(input).val());
                    if ((value < $(input).data('max'))) {
                        $(input).val(value + 1);
                        if (($(input).data('autonegotiable')) && (value >= ($(input).data('min') - 1))) {
                            Module.showBuyButton(true);
                        }
                    } else {
                        if ($(input).data('autonegotiable')) {
                            Module.showBuyButton(false);
                            $(input).val(value + 1);
                            return false;
                        }
                    }
                } else if ($(that).hasClass('spin-down')) {
                    var input = $(that).parents('.spinner').find('input');
                    var value = parseInt($(input).val());
                    if (value > $(input).data('min') && (value -1 ) <= $(input).data('max')) {
                        Module.showBuyButton(true);
                        $(input).val(value - 1);
                    } else {
                        if ($(input).data('autonegotiable') && value > 0) {
                            Module.showBuyButton(false);
                            $(input).val(value - 1);
                            return false;
                        }
                    }
                }
                Module.timerRequest();
            })

            $('.form-control').on('keypress keyup', function(e) {
                var code = e.keyCode || e.charCode;
                if (e.type === 'keyup' && (code == 8 || code == 46)) {
                    var value = parseInt($(this).val());
                    //小于下限时置0操作
                    if (isNaN(value) || (value < $(this).data('min'))) {
                        if ($(this).data('autonegotiable')) {
                            Module.showBuyButton(false);
                        }
                        $('.buybutton').attr('disabled', 'disabled').css('background-color', '#e8e8e8');
                    } else {
                        if ($(this).data('autonegotiable')) {
                            Module.showBuyButton(true);
                        }
                        $('.buybutton').removeAttr('disabled').css('background-color', '#DD3730');
                    }
                    Module.timerRequest(800);
                    return true;
                }

                if (e.type === 'keypress' && code != 8 && code != 46) {
                    Module.showBuyButton(true);

                    var valueString = [];

                    //不能为非数字
                    if (code < 48 || code > 57) {
                        return false;
                    }
                    var $val = $(this).val();

                    //input框里面未选中数据时
                    if (this.selectionEnd == this.selectionStart) {
                        valueString.push($val);
                        valueString.push(String.fromCharCode(code));
                        if (isNaN(valueString.join(''))) {
                            $(this).val($(this).data('min'));
                            return false;
                        }
                    } else {
                        valueString.push($val.substring(0, this.selectionStart));
                        valueString.push(String.fromCharCode(code));
                        valueString.push($val.substring(this.selectionEnd, $val.length));
                    }

                    var value = parseInt(valueString.join(''));

                    //不能大于最大值
                    if (value > $(this).data('max')) {
                        if ($(this).data('autonegotiable')) {
                            Module.showBuyButton(false);
                            return true;
                        }
                        return false;
                    }

                    //小于下限时置0操作
                    if (value < $(this).data('min')) {
                        if ($(this).data('autonegotiable')) {
                            Module.showBuyButton(false);
                        }
                        $('.buybutton').attr('disabled', 'disabled').css('background-color', '#e8e8e8');
                        return true;
                    }

                    Module.timerRequest(800);
                    $('.buybutton').removeAttr('disabled').css('background-color', '#DD3730');;
                    return true;
                }
                if (code == 32 || code == 13 || code == 16) {
                    $(this).val($(this).data('min'));
                    return false;
                }
            })
        },
        totalPrice: function(Price) {
            var url = this.getPriceURL();
            $.ajax({
                type: 'get',
                url: url,
                dataType: "JSONP",
                success: function(data) {
                    $('.detail-price').text(data.price);
                }
            });
        },
        getPriceURL: function() {
            var specification = $('.specification').find('.on').parent();
            var productId = specification.data('id');
            var pkSpecification = specification.data('spec');

            var url = Market.marketServer + '/market/productSpeci/priceCalculate?' +
                'productId=' + productId +
                '&pkSpecification=' + pkSpecification;

            if (Module.saleMode) {
                var lease = $('.pul-cycle li').find('.on').data('cycle');
                url += '&lease=' + lease;
            }
            if (Module.multiAccount) {
                var count = $('.account').find('.active').find('input').val();
                url += '&count=' + count;
            }
            return url;
        },
        //渲染类
        domRender: function() {
            if (Market.isDev) {
                var requestId = Market.getRequset();
                var rightURl = Market.marketServer + '/market/product/saleInfo/' + requestId.id;
                Market.productId = requestId.id;
            } else {
                //Restful模式
                var request = Market.getRestful();
                var rightURl = Market.marketServer + '/market/product/saleInfo/' + request[0];
                Market.productId = request[0];
            }

            //右侧产品规格请求
            $.ajax({
                type: 'get',
                // http://172.20.18.24/market/product/saleInfo/5
                url: rightURl,
                dataType: "JSONP",
                error : function(){
                  $(".lazybox").soLazy();
                },
                success: function(data) {
                  $(".lazybox").soLazy();
                    var dataStatus = data.status;
                    if (dataStatus) {

                        //规格启动模板引擎
                        //周期格式转换
                        template.helper('specLeaseHelper', function(Lease) {
                            var formatValue = '';
                            if (Lease == '1') {
                                formatValue = '1月';
                            } else if (Lease == '3') {
                                formatValue = '3月';
                            } else if (Lease == '6') {
                                formatValue = '6月';
                            } else if (Lease == '12') {
                                formatValue = '1年';
                            } else if (Lease == '24') {
                                formatValue = '2年';
                            } else if (Lease == '36') {
                                formatValue = '3年';
                            } else {
                                console.error('未找到对应的周期!');
                            }
                            return formatValue;
                        })

                        //非价格面议
                        if (data.data.specification[0].saleMode != 3) {
                            //右侧模板
                            var ProductListHTML = template('spec', data.data);
                            $('.order-wrap').html(ProductListHTML);
                        } 
                        $('.order-wrap').css('display', 'block');

                        //单价模板
                        if (!Module.hasAutoNegotiable(data.data.specification)) {
                            var priceListHTML = null;
                            if (data.data.specification[0].saleMode == 2) {
                                priceListHTML = template('priceTableOne', data.data);
                            } else {
                                priceListHTML = template('priceTable', data.data);
                            }
                            $('.price-table').html(priceListHTML);
                        }

                        Module.spinner();

                        //按照周期计算还是按照数量计算
                        var saleMode = data.data.specification[0].saleMode;
                        var multiAccount = data.data.specification[0].multiAccount;
                        if (saleMode == 1 || saleMode == '1') {
                            Module.saleMode = true;
                        } else {
                            Module.saleMode = false;
                            $('.cycle').css('display', 'none');
                        }
                        if (multiAccount == 1 || multiAccount == '1') {
                            Module.multiAccount = true;
                        } else {
                            $('.account').css('display', 'none');
                        }

                        // active类
                        $('.specification').find('li').eq(0).find('a').addClass('on');
                        $($('.pul-cycle')[0]).addClass('active').find('li').eq(0).find('a').addClass('on');;
                        $($('.account-number')[0]).addClass('active');

                        Module.totalPrice();
                        Module.recommendProduct(); //请求推荐产品

                        $('.specification li').on('click', function() {
                            var index = $(this).index();

                            //规格
                            $(this).parents('ul').find('.on').removeClass('on');
                            $(this).find('a').addClass('on');
                            //周期
                            $('.pul-cycle').removeClass('active').find('.on').removeClass('on');
                            $($('.pul-cycle')[index]).addClass('active').find('li').eq(0).find('a').addClass('on');
                            //账号数量
                            $('.account-number').removeClass('active');
                            var $input = $($('.account-number')[index]).addClass('active').find('input');
                            var value = $input.val();
                            value = parseInt(value);

                            //如果输入框为null，设置默认值
                            if (isNaN(value)) {
                                $input.val($input.data('min'));
                            }

                            //小于下限时置0操作
                            if (Module.saleMode && (isNaN(value) || (value < $input.data('min')))) {
                                $('.buybutton').attr('disabled', 'disabled').css('background-color', '#e8e8e8');
                            } else {
                                $('.buybutton').removeAttr('disabled').css('background-color', '#DD3730');
                            }

                            //特殊处理
                            Module.showBuyButton(true);
                            if ($input.data('autonegotiable')) {
                                if (isNaN(value) || value > $input.data('max') || value < $input.data('min')) {
                                    Module.showBuyButton(false);
                                }
                            }
                            Module.totalPrice();
                        })
                        $('.pul-cycle li').on('click', function() {
                            $(this).parent().find('.on').removeClass('on');
                            $(this).find('a').addClass('on');

                            Module.totalPrice();
                        })

                        //提交规格
                        $('.buybutton').on('click', function() {
                            Module.orderconfirm();
                        })

                        //获取邮箱
                        $("#obtain").on("click", function() {
                            Module.postMail();
                        })
                    }
                }
            })
        },

        //是否有价格面议
        hasAutoNegotiable: function(specification) {
            var hasAutoNego = false;
            if (!specification && specification.length == 0) return false;

            if (specification[0].saleMode == 3) {
                hasAutoNego = true;
            } else {
                for (var i = 0, len = specification.length; i < len; i++) {
                    if (specification[i].autoNegotiable == 1) {
                        hasAutoNego = true;
                        break;
                    }
                }
            }

            if (hasAutoNego) {

                //立即咨询按钮绑定事件
                Module.artDialog();
                $('#pric .grid-show').text('此商品支持定制化，请联系服务商洽谈后确定相应方案和报价');
            }
            return hasAutoNego;
        },
        postMail: function() {
            var regemail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
            var email = $.trim($("#email").val());
            if (regemail.test(email)) {
                var urlProductId = encodeURI(Market.productId);
                url = Market.marketServer + '/market/product/productDataEmail?emailAddress=' + email + '&productId=' + urlProductId;

                $.ajax({
                    url: url,
                    dataType: "JSONP",
                    type: "get",
                    success: function(data) {
                        Module.showDialog("您申请的资料已经通过邮件发送，请点击邮件中的链接进行下载。");
                    },
                    error: function() {
                        Module.showDialog("邮件发送失败!");
                    }
                })

            } else {
                Module.showDialog("您输入的邮箱格式不正确，请重新输入！")
            }
        },
        orderconfirm: function() {
            if (isNaN(parseInt($('.detail-price').text().trim()))) {
                return false;
            }
            var url = "";

            if (Module.verificaUser()) { //已经登录，跳转到购买页面
                var urlPath = Market.marketServer + "/market/orderconfirm?";
                var urlProductName = encodeURI($('.view-info h1').text().trim()); //产品名称
                var urlProductSpecification = encodeURI($('.specification .on').text().trim()); //产品规格
                var urlProductLease = encodeURI($('.cycle .on').data('cycle')); //产品周期
                var urlProductPrice = encodeURI($('.detail-price').text().trim()); //产品价格
                var urlProductId = encodeURI($('.specification .on').parent().data('id'));
                var urlspec = encodeURI($('.specification .on').parent().data('spec'));
                var urlCount = encodeURI($('.account').find('.active').find('input').val());
                url = urlPath + "productId=" + urlProductId + "&pkSpecifications=" + urlspec + "&urlProductName=" + urlProductName + "&urlProductSpecification=" + urlProductSpecification + "&urlProductLease=" + urlProductLease + "&urlProductPrice=" + urlProductPrice + "&urlCount=" + urlCount;
                window.location.href = url;
            }
        },
        recommendProduct: function() {
            $.ajax({
                type: 'get',
                url: Market.marketServer + '/market/productrecommend/products/' + Market.productId + '/similarproduct',
                dataType: "JSONP",
                success: function(data) {
                    var dataStatus = data.status;
                    if (dataStatus) {
                        var ProductListHTML = template('telproduct', data);
                        $('.telproducts').html(ProductListHTML);
                        if (ProductListHTML == '') {
                            $('.telproducts').parents('.pubMod').css('display', 'none');
                        }
                    }
                }
            });
        },
        //校验用户是否登录，未登录跳转到登录页面
        verificaUser: function() {
            if (!Market.loginStat) { //未登录，跳转到登录页面
                var logo_url_logo = Market.marketServer + "/market/jump.jsp?target=";
                var change_local_logo = Market.URLencode(window.location.href);
                url = logo_url_logo + change_local_logo;
                window.location.href = url;
                return false;
            }
            return true;
        },
        showDialog: function(msg) {
            var d = dialog({
                content: msg,
                quickClose: true // 点击空白处快速关闭
            });
            d.show($('.search-form')[0]);
        },
        //事件处理类
        handleEvent: function() {

            //下载记录统计
            $('.pdf-download').click(function(event) {
                if (Module.verificaUser()) {
                    $.ajax({
                        type: 'get',
                        url: Market.marketServer + '/market/product/' + Market.productId + '/productguid',
                        dataType: "JSONP",
                        success: function(data) {
                            if (data.status) {
                                //Module.downloadFile(data.data);
                            }
                        },
                        error: function(err) {

                        }
                    });
                } else {
                    event.preventDefault();
                }
            })
        },
        //点击下载
        downloadFile: function(url) {
            try {
                var el = document.createElement("a");
                document.body.appendChild(el);
                el.href = url; //url 是你得到的连接
                el.target = '_new'; //指定在新窗口打开
                el.click();
                document.body.removeChild(el);
            } catch (e) {
                console.error(e);
            }
        },
        //面议描述字段
        getNegotiableDesc: function() {
            $.ajax({
                type: 'get',
                url: Market.marketServer + '/market/productSpeci/negotiableDesc?productId=' + Market.productId,
                dataType: "JSONP",
                success: function(data) {
                    if (data.status) {
                        $('.tiper').find('span').text(data.negotiableDesc);
                        //$('.negotiableDesc').text(data.negotiableDesc);
                    }
                },
                error: function(err) {

                }
            });
        },
        showBuyButton: function(show) {
            if (show) {
                $('.buybutton').css('display', 'block');
                $('.consultation').css('display', 'none');
                $($('.price').find('em')[0]).text('￥');
            } else {
                $('.buybutton').css('display', 'none');
                $('.consultation').css('display', 'block');
                $('.detail-price').parent().find('em').text("");
                $('.detail-price').text('价格面议');
            }
        }
    };


    $(function() {
        Module.init();

        //
        $(".pul_one li").on("click", function() {
            $(this).find("a").addClass("on").parent().siblings().find("a").removeClass("on");
        })
    });
});
