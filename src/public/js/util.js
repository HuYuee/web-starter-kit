define(['jquery', 'template'], function($, template) {
    /**
     * Module : Yonyou cloud util
     * Author : Kvkens(yueming@yonyou.com)
     * Update : 2017-02-09 14:22:49
     */

    var Market = {
        debug: true,
        loginStat: false,
        getUserCount: 0, // 每次执行请求后，自身++
        marketServer: (typeof(marketConfig) != "undefined" && marketConfig.marketServer) || '',
        //判断是否开发环境
        isDev: location.hostname === "localhost" || location.hostname === "127.0.0.1",
        //初始化入口
        init: function() {
            var that = this;
            var iframFlag = true;
            that.log("进入util.js");
            if ($(".J_SearchText").size() !== 0) {
                that.getSearchKeyWord(); //加载搜索数据
            }
            that.getBaiduStatic();
            that.bindEvent();
            that.getUserData();
            that.initNavTab();
        },
        //日志打印
        log: function(msg) {
            var that = this;
            if (this.debug) {
                //console.log("系统日志时间：" + that.getClientDateTime('yyyy-MM-dd HH:mm:ss') + " 操作:" + msg);
            }
        },
        bindEvent: function() {
            var that = this;
            //搜索点击事件
            $(".inputcontrol").click(function() {
                var href_link, ieVersion, keywords;
                //截取掉首尾空格
                /* var keywords= $.trim($(".J_SearchText").val());*/
                keywords = $.trim($(this).parent().find(".J_SearchText").val());
                $(".J_SearchText").val(keywords);
                if (window.location.hostname == "localhost") {
                    href_link = "./list.html?keyword=";
                } else {
                    href_link =  that.marketServer +  "/market/search?keyword=";
                }
                ieVersion = that.IETester();
                if (ieVersion) {
                    window.location.href = href_link + encodeURIComponent(keywords);
                } else {
                    window.location.href = href_link + keywords;
                }

            });
            //回车绑定的搜索事件
            $(".J_SearchText").keydown(function(e) {
                var href_link, ieVersion;
                var curKey = e.which;
                if (curKey == 13) {
                    //截取掉首尾空格
                    var keywords = $.trim($(".J_SearchText").val());
                    $(".J_SearchText").val(keywords);
                    if (window.location.hostname == "localhost") {
                        href_link = "./list.html?keyword=";
                    } else {
                        href_link =  that.marketServer +  "/market/search?keyword=";
                    }
                    ieVersion = that.IETester();
                    if (ieVersion) {
                        window.location.href = href_link + encodeURIComponent(keywords);
                    } else {
                        window.location.href = href_link + keywords;
                    }
                }
            });
            //绑定滚动条显示隐藏backtop按钮
            $(window).scroll(function() {
                var topHeight = $(window).scrollTop();
                var wHeight = $(window).height();
                topHeight != 0 ? $('.backtop , .hide-backtop').addClass('active') : $('.backtop , .hide-backtop').removeClass('active');
            });
            $('.backtop , .hide-backtop').on('click', function() {
                var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                $("html,body").animate({ "scrollTop": "0px" });

            });
            //获得当前URL
            var local = window.location.href;
            //绑定登录按钮
            $(".btn-logo").click(function() {
                    var logo_url_logo =  that.marketServer +  "/market/jump.jsp?target=";
                    var change_local_logo = that.URLencode(local);
                    window.location.href = logo_url_logo + change_local_logo;
                })
                //点击首页注册
            $(".btn-register").click(function() {
                    // var logo_url_register = "/tenant/register/registerTwo.html?service=";
                    var logo_url_register =  that.marketServer +  "/market/register?service="
                    var change_local_register = that.URLencode(local);
                    window.location.href = logo_url_register + change_local_register;
                })
                //点击首页退出
            $('.btn-leave').click(function() {
                    // 登出请求
                    $.ajax({
                        type: "get",
                        url:  that.marketServer +  "/market/logout",
                        dataType: "jsonp",
                        cache: false,
                        success: function(data) {
                            window.location.href = data.logouturl;
                            //测试新版的修改，下拉的信息展示 20170311
                            $('.pre_login').removeClass('dn');
                            $('.header_navbar-nav').addClass('dn');
                        }
                    })
                })
                //未登录状态的服务商认证链接
                /* $('.supplier_link.notlogin').click(function() {
                 $(".btn-logo").trigger('click');
                 })*/

        },
        //加载用户数据
        getUserData: function() {
            that = this;
            $.ajax({
                type: "get",
                url: Market.marketServer + "/market/user",
                //请求的参数
                /*data:{Name:"sanmao",Password:"sanmaoword"},*/
                //请求的数据类型
                dataType: "jsonp", //"xml", "html", "script", "json", "jsonp", "text".
                cache: false,
                success: function(data) {
                    that.getUserCount++;
                    if (data.status == 1) {
                        // 判断是否登陆 data.user.tenantId != ""
                        if (data.user.userId != "") {
                            that.loginStat = true;
                            // $(".btn-logo").text(data.user.userName);
                            // 手机号登录时候的后四位
                            if (/^1(3|4|5|7|8)\d{9}$/.test(data.user.userName)) {
                                $(".btn-logo").text(data.user.userName.substring(0, 7) + "****");
                            } else {
                                $(".btn-logo").text(data.user.userName);
                            }

                            /*登陆成功，服务商认证的超链接两种，注册有礼隐藏*/
                            $('.supplier_link').removeClass('notlogin');
                            $('.btn-register').parent('.rightfont').addClass('dn');
                            $('.btn-leave').parent('.rightfont').removeClass('dn');

                            //测试新版的修改，下拉的信息展示 20170311
                            $('.pre_login').addClass('dn');
                            $('.header_navbar-nav').removeClass('dn');
                            //针对ie，edge浏览器下css属性list-style读取有差错
                            $('.header_navbar-nav .header_dropdown').css('list-style', 'none').css('list-style-position','inside');
                    
                            // 已登录情况
                            $.ajax({
                                type: "get",
                                url: that.marketServer +  "/market/isv/status",
                                dataType: "jsonp",
                                cache: false,
                                success: function(supply) {
                                    if (supply.status == 1) {
                                        var certID = supply.data.certificationStatus;
                                        var enable = supply.data.enableStatus; // 1 => 启用， 0 => 停用，停用需要再认证
                                        if (enable == 1) {
                                            if (certID == 1) {
                                                // 未认证，跳转填表
                                                $('.supplier_link').find('span').html('服务商认证');
                                                $('.supplier_link').attr('href',  that.marketServer +  '/market/settled');
                                            } else if (certID == 2) {
                                                // 审核中，不跳转，弹框
                                                $('.supplier_link').find('span').html('服务商中心');
                                                $(".rightservice").html("审核中").addClass("not-allowed");
                                                $(".not-allowed").parent()[0].addEventListener("click",
                                                    function(e) {
                                                        e.preventDefault()
                                                    },
                                                    false
                                                );
                                            } else if (certID == 3) {
                                                // 审核通过，跳转商户后台
                                                $('.supplier_link').find('span').html('服务商中心');
                                                $('.supplier_link').attr('href', that.marketServer +  '/market/operations');
                                            } else if (certID == 4) {
                                                // 审核不通过，不跳转，弹框
                                                $('.supplier_link').find('span').html('服务商认证');
                                                $('.supplier_link').attr('href', that.marketServer +  '/market/settled');
                                            }
                                        } else {
                                            // 停用再认证
                                            $('.supplier_link').find('span').html('服务商认证');
                                            $('.supplier_link').attr('href', that.marketServer +  '/market/settled');
                                        }

                                    }
                                }
                            })
                        } else {
                            that.loginStat = false;
                        }
                    } else if (!data.status) {
                        $('.supplier_link').find('span').html('服务商认证');
                        $('.supplier_link').attr('href', that.marketServer +  '/market/settled');
                        if ($("#iframer").length == 0) {
                            $("body").append("<iframe src='" + that.marketServer + "/market/login.jsp' id='iframer' hidden='hidden' style='height:0;border:none'> </iframe>");
                        }
                        // else{
                        //     that.log('未登陆');
                        //     // 未登陆情况
                        //     var logo_url_logo = "/cas/login?sysid=market&verify_code=usercenter&service=";
                        //     var change_local_logo = that.URLencode(window.location.href);
                        //     var login_href = logo_url_logo + change_local_logo;
                        //     $('.supplier_link').attr('href', login_href);
                        // }
                    }
                },
                //失败的回调
                error: function(data) {
                    //console.log(data);
                }
            });
        },
        //信息提示类
        showMsg: function(msg, dom, mode) {
            switch (mode) {
                case 1:
                    var d = dialog({
                        content: msg,
                        align: 'right',
                        quickClose: true
                    });
                    d.show(document.getElementById(dom));
                    break;
                case 2:
                    var d = dialog({
                        content: msg
                    });
                    d.show();
                    setTimeout(function() {
                        d.close().remove();
                    }, 3000);
                    break;
                default:
                    break;
            }

        },
        //获得搜索栏相关数据
        getSearchKeyWord: function() {
            var data = {
                "status": 1,
                "hot": "在此输入您需要的服务",
                "data": [{
                    "name": "全能环境"
                }, {
                    "name": "数据迁移"
                }, {
                    "name": "PHP运行环境"
                }, {
                    "name": "linux环境配置"
                }, {
                    "name": "JAVA运行环境"
                }, {
                    "name": "一键部署"
                }, {
                    "name": "智能防御"
                }]
            }
            template.helper('searchFormat', function(key) {
                return encodeURI(key);
            });
            $(".J_SearchText").attr("placeholder", data.hot);

            if ($("#J_SearchKeyTemplate").size() != 0) {
                var searchHTMLTemplate = template("J_SearchKeyTemplate", data);
                $(".J_SearchKey").html(searchHTMLTemplate);
            }

        },
        //http请求链接特殊字符转译
        URLencode: function(sStr) {
            return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F');
        },
        //写入指定的key,value来设置Cookies
        setCookie: function(name, value) {
            var Days = 30;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        },
        //读取指定name来获得Cookies
        getCookie: function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);
            else return
            null;
        },
        //是否登录 true or false
        isLogin: function() {
            return window.document.cookie.indexOf("at") != -1 ? true : false;
        },
        // 说明：JS时间Date格式化参数
        // 参数：格式化字符串如：getClientDateTime('yyyy-MM-dd HH:mm:ss')
        // 结果：如2016-06-01 10:09:00
        getClientDateTime: function(fmt) {
            var o = {
                "M+": new Date().getMonth() + 1,
                "d+": new Date().getDate(),
                "H+": new Date().getHours(),
                "m+": new Date().getMinutes(),
                "s+": new Date().getSeconds(),
                "q+": Math.floor((new Date().getMonth() + 3) / 3),
                "S": new Date().getMilliseconds()
            };
            var year = new Date().getFullYear();
            var yearstr = year + '';
            yearstr = yearstr.length >= 4 ? yearstr : '0000'.substr(0, 4 - yearstr.length) + yearstr;

            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (yearstr + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        // 获取url ？后字段
        getRequset: function() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        getRestful: function() {
            var pathname = location.pathname; //获取url中"?"符后的字串
            var theRequest = [];
            if (pathname.indexOf("html") != -1) {
                theRequest.push(location.pathname.substring(1, location.pathname.length - 5));
            }
            else{
              theRequest = pathname.split('/').reverse();
            }
            return theRequest;
        },
        //解码decodeURIComponent
        parseURIComponent: function(str) {
            return decodeURIComponent(str);
        },
        //转码codeURIComponent
        encodeURIComponent: function(str) {
            return encodeURIComponent(str);
        },
        //图片加载不到的时候。采用默认图片的方式
        getUndefindImage: function(dom) {
            $(dom).error(function() {
                //生产上获取的图片地址
                /*  $(this).attr('src', '/market/market/src/images/index/default.jpg');*/
                //本地测试的图片路径
                $(this).attr('src', 'http://static.imyy.org/wp-content/uploads/2017/02/default.jpg');
            });
        },
        //排序按钮样式
        showSortBtn: function(parent, target, direction) {
            $(parent).children("i").removeClass("chose-sort-color");
            $(target).parent().find(direction).addClass("chose-sort-color");
        },
        //获取列表页，如果搜索条件中含有全部，替换成空字符串
        emptyString: function(str) {
            if (str.indexOf("全部") != -1) {
                return str = "";
            } else {
                return str;
            }
        },
        //获取排序规则
        getSort: function() {
            var sort;
            if ($(".chose-sort-color").length > 0) {
                var o1 = $(".chose-sort-color").parent().find("a").text().trim();
                if (o1 == "价格") {
                    if ($(".chose-sort-color").hasClass("uf-triangle-down") == true) {
                        sort = "lowestPrice,desc";
                    } else if ($(".chose-sort-color").hasClass("uf-triangle-up") == true) {
                        sort = "lowestPrice,asc";
                    }

                } else if (o1 == "上架时间") {
                    if ($(".chose-sort-color").hasClass("uf-triangle-down") == true) {
                        sort = "approveTime,desc";
                    } else if ($(".chose-sort-color").hasClass("uf-triangle-up") == true) {
                        sort = "approveTime,asc";
                    }
                } else if (o1 == "默认排序") {
                    sort = "default";
                }
            }
            return sort;
        },
        //获取列表页，标签
        getLabel: function() {
            if ($(".ul-class .tag-list").length > 0) {
                return $(".ul-class .innerLab-text").attr("data-label");
            }
        },
        //获取列表页,一级分类
        getFirstCategory: function() {
            var market;
            if ($(".ul-class .item").length > 0) {
                $.each($(".ul-class .item"), function(index, item) {
                    if (index == 1) {
                        market = $(item).find(".btn").attr("data-level");
                    }
                })
                return market;
            }
        },
        //获取列表页,二级分类
        getCategory: function() {
            var category;
            if ($(".ul-class .item").length > 0) {
                $.each($(".ul-class .item"), function(index, item) {
                    if (index == 2) {
                        category = $(item).find(".btn").attr("data-level");
                    }
                })
                return category;
            }
        },
        //获取列表页，清除价格，支付方式，操作系统,客户群体的数据
        getPriceDos: function() {
            var arrChose, price, deliver, os, objItem, deliverStr, customerGroup;
            objItem = {};
            arrChose = $(".m-pro-item").find(".chose-active");
            $.each(arrChose, function(index, item) {
                if (index == 0) {
                    price = $(item).text();
                    //如果价格选中的是免费。吧价格值换为0
                    if (price == "免费") {
                        price = "0";
                    }
                    price = that.emptyString(price);
                    if (price.indexOf("以上") != -1) {
                        price = price.substr(0, price.length - 2)
                    } else {
                        price = price.replace("-", ",");
                    }
                } else if (index == 1) {
                    deliver = that.emptyString($(item).attr("value"));
                } else if (index == 2) {
                    os = that.emptyString($(item).text());
                } else if (index == 3) {
                    customerGroup = that.emptyString($(item).attr("value"));
                }

            })
            objItem.price = price;
            objItem.deliver = deliver;
            objItem.os = os;
            objItem.customerGroup = customerGroup;
            return objItem;
        },
        //获取一级分类的名称
        getMarketName: function() {
            var marketName;
            if ($(".ul-class .item").length > 0) {
                $.each($(".ul-class .item"), function(index, item) {
                    if (index == 1) {
                        marketName = $(item).find(".btn").text();
                    }
                })
                return marketName;
            }
        },
        //获取二级分类的名称
        getCategoryName: function() {
            var categoryName;
            if ($(".ul-class .item").length > 0) {
                $.each($(".ul-class .item"), function(index, item) {
                    if (index == 2) {
                        categoryName = $(item).find(".btn").text();;
                    }
                })
                return categoryName;
            }
        },
        //获取列表页,清除价格，支付方式，操作系统的选中样式
        removeActive: function() {
            var $arrList = $(".m-pro-item");
            $.each($arrList, function(index, item) {
                $(item).find(".btn").removeClass("chose-active");
                $(item).find(".btn").eq(0).addClass("chose-active");
            })
        },
        //移除二级分类
        removeCategory: function() {
            var arrItem = $(".ul-class .item");
            if (arrItem.length > 0) {
                $.each(arrItem, function(index, item) {
                    if (index > 1) {
                        $(item).remove();
                    }
                })
            }
        },
        //移除标签
        removeLabel: function() {
            var labelTag = $(".tag-list");
            if (labelTag.length > 0) {
                labelTag.remove();
            }
        },
        //获取url后面的锚点参数
        getHashValue: function() {
            var hashObj = {};
            var ohash = window.location.hash;
            var ohashStr = ohash.substr(1);
            var ohashArry = ohashStr.split("&");
            $.each(ohashArry, function(index, item) {
                var newArr = item.split("=");
                if (index == 0) {
                    hashObj.market = newArr[1];
                }
                if (index == 1) {
                    hashObj.category = newArr[1];
                }

            })
            return hashObj;
        },
        initNavTab: function() {
            //详情页活动是固定到底部
            $.fn.fixedNav = function() {
                var nav = $(this),
                    selector = this.selector;
                fixedNav = nav.clone().addClass('details-nav-fixed').css('width', nav.width());
                $('.item-intro').append(fixedNav);
                var topHight = nav.offset().top;
                var arrTitles = Market.calculationNavHeight($(this).find('a'));
                $(window).scroll(function(e) {
                    if (Market.isfixedNavClick) { //防止点击时触发
                        Market.isfixedNavClick = false;
                        return;
                    }
                    var winHeihgt = $(this).scrollTop();

                    if (topHight <= winHeihgt) {
                        Market.fixedNavShow = true;
                        $('.details-nav-fixed').css({ 'z-index': '11111', 'display': 'block' });
                        Market.setNavActive(winHeihgt, arrTitles); //自动跟踪位置
                    }
                    if ((topHight > winHeihgt) && Market.fixedNavShow) {
                        Market.fixedNavShow = false;
                        $('.details-nav-fixed').css({ 'z-index': '-11', 'display': 'none' });
                        Market.setActive(0);
                    }
                });

                $(selector).on('click', function(e) {
                    var index = null;
                    if (e.target.nodeName === 'A' || e.target.nodeName === 'SPAN') {
                        index = $(e.target).parents('li').index();
                    } else if (e.target.nodeName === 'LI') {
                        index = $(e.target).index();
                    }

                    if (index != null) {
                        if (!Market.fixedNavShow) {
                            Market.fixedNavShow = true;
                            $('.details-nav-fixed').css({ 'z-index': '11111', 'display': 'block' });
                        }

                        Market.isfixedNavClick = true;
                        Market.setActive(index);
                    }
                })
            }
        },
        setActive: function(index) {
            $('.details-nav-fixed').find('.active').removeClass('active');
            $($('.details-nav-fixed').find('a')[index]).parent().addClass('active');
        },
        setNavActive: function(winHeihgt, arrTitles) {
            var index = 0;
            for (var i = 0, len = arrTitles.length - 1; i < len; ++i) {
                if ((arrTitles[i] < winHeihgt) && (arrTitles[i + 1] >= winHeihgt)) {
                    //console('winHeihgt:' + winHeihgt + "--i:" + i);
                    index = i - 1;
                    if (index === -1) {
                        index = 0;
                    }
                    break;
                } else if (winHeihgt > arrTitles[len]) {
                    index = len - 1;
                    break;
                }
            }

            Market.setActive(index);
        },
        //判断是否是ie浏览器
        IETester: function(userAgent) {
            var UA = userAgent || navigator.userAgent;
            if (/msie/i.test(UA)) {
                return UA.match(/msie (\d+\.\d+)/i)[1];
            } else if (~UA.toLowerCase().indexOf('trident') && ~UA.indexOf('rv')) {
                return UA.match(/rv:(\d+\.\d+)/)[1];
            }
            return false;
        },
        calculationNavHeight: function(array) {
            var arrTitles = [0];
            if (!array) return;
            for (var i = 0, len = array.length; i < len; ++i) {
                var id = $(array[i]).attr('href');
                arrTitles.push($(id).offset().top - 200);
            }
            return arrTitles;
        },
        //tirm掉字符串所有空格
        strTrim: function(str, is_global) {
            var result;
            result = str.replace(/(^\s+)|(\s+$)/g, "");
            if (is_global.toLowerCase() == "g")
                result = result.replace(/\s/g, "");
            return result;
        },
        setDataCategory: function(categoryArry) {
            //循环遍历之前先将以前的dom节点清空，然后把循环遍历出来的二级分类显示
            $(".firstLevel").empty();
            if (typeof categoryArry == "object") {
                $(".product-class").removeClass("dn");
                $.each(categoryArry, function(index, item) {
                    $(".firstLevel").append('<span class="level2stop btn" data-level2=' + item.categoryId + '>' + item.categoryName + '</span>');
                });
            } else if (typeof categoryArry == "string") {
                $(".product-class").addClass("dn");
            }
        },
        //百度统计
        getBaiduStatic:function(){
            var _hmt = _hmt || [];
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?cca871f3eb9c84e0eb8548a09946a838";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        }
    };
    var JPlaceHolder = {
        //检测浏览器是否支持 placeholder
        _check: function() {
            return 'placeholder' in document.createElement('input');
        },
        //初始化
        init: function() {
            if (!this._check()) {
                this.fix();
            }
        },
        //修复
        fix: function() {
            jQuery(':input[placeholder]').each(function(index, element) {
                var self = $(this),
                    txt = self.attr('placeholder');
                self.wrap($('<div></div>').css({ position: 'relative', zoom: '1', border: 'none', background: 'none', padding: 'none', margin: 'none' }));
                var pos = self.position(),
                    h = self.outerHeight(true),
                    paddingleft = self.css('padding-left');
                var holder = $('<span></span>').text(txt).css({ position: 'absolute', left: pos.left, top: '5px', height: h, lienHeight: h, paddingLeft: paddingleft, color: '#aaa' }).appendTo(self.parent());
                if ($(".J_SearchText").length > 0) {
                    var searchVal = that.parseURIComponent(that.getRequset().keyword);
                    if (searchVal != "undefined" && searchVal.length > 0) {
                        holder.hide();
                    }
                }
                self.focusin(function(e) {
                    holder.hide();
                }).focusout(function(e) {
                    if (!self.val()) {
                        holder.show();
                    }
                });
                holder.click(function(e) {
                    holder.hide();
                    self.focus();
                });
            });
        }
    };
    Market.init();
    window.getUserData = Market.getUserData;
    JPlaceHolder.init();
    return Market;
})
