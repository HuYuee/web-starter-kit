define(['jquery', 'util', 'template'], function ($, u, template) {
    $('body').css('visibility', 'visible');
    var curPage = 1;
    var self;
    var MarketList = {
        //初始化入口
        init: function () {
            var that = this;
            var dataLevelCate, dataLeve2Cate, market, category, label, page, price, deliver, os, customerGroup, arrChoseObj;
            //页面初始化的时候，先获取分类信息列表
            that.getProductCategory();
            //给搜索框赋值
            if (u.getRequset().keyword !== undefined) {
                var parseStr = u.parseURIComponent(u.getRequset().keyword);
                $(".J_SearchText").val(parseStr);
            }
            //如果获取url中含有锚点参数，就只传锚点参数中的一级分类和二级分类，
            // 如果获取的url中不含有锚点参数，按照传关键字的搜索接口走
            //获取筛选默认选中项,默认的价格，支付方式，操作系统，团体
            arrChoseObj = u.getPriceDos();
            price = arrChoseObj.price;
            deliver = arrChoseObj.deliver;
            os = arrChoseObj.os;
            customerGroup = arrChoseObj.customerGroup;
            if (window.location.hash.length > 0) {
                var marketName, category, marketFirst, marketSencond;
                var hashObject = u.getHashValue();
                category = hashObject.category;
                if (category == "undefined") {
                    category = "";
                }
                that.showNavData(hashObject.market, hashObject.category);
                that.getListProduct(u.getRequset().keyword, hashObject.market, category, label, page, price, deliver, os, customerGroup);
                //获取一二级分类的名称,然后展示广告位
                marketFirst = u.getMarketName();
                marketSencond = u.getCategoryName();
                if (marketSencond != "" && marketSencond != null) {
                    marketName = marketFirst + "$$" + marketSencond;
                } else {
                    marketName = marketFirst;
                }
                that.getAdvertSing(marketName);
            } else {
                that.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup);
            }
            that.bindEvent();
            var total, pageSize, totalPage; //总记录数，每页显示数，总页数

        },

        bindEvent: function () {
            var bindSelf = this;
            var choseAsc = true;
            var hashObject;
            //点击导航，展示列表推广位的产品
            $(".navp1_ul").delegate('li', "click", function () {
                var marketFirst, marketSencond, marketName, marketFirstText;
                //获取category的name
                marketSencond = $.trim($(this).text());
                //获取market的name
                marketFirstText = $(this).parent().parent().parent().find(".dropdown_main").find("span").text();
                marketFirst = $.trim(marketFirstText);
                if (marketFirst != "其他服务") {
                    marketName = marketFirst + "$$" + marketSencond;
                } else {
                    marketName = marketSencond;
                }
                bindSelf.getAdvertSing(marketName);
            });
            //url锚点参数改变的时候，ajax异步调用
            $(window).on("hashchange", function () {//兼容ie8+和手机端
                var category, label, page, price, deliver, os, customerGroup, sort;
                hashObject = u.getHashValue();
                category = hashObject.category;
                if (category == "undefined") {
                    category = "";
                }
                //移除价格，支付方式，操作系统的选中
                u.removeActive();
                bindSelf.showNavData(hashObject.market, hashObject.category);
                bindSelf.getListProduct(u.getRequset().keyword, hashObject.market, category, label, page, price, deliver, os, customerGroup, sort);
                //如果存在标签，则移除标签
                u.removeLabel();

            });

            //分页标签里每个列表项，除了开始页和结束页
            $("#pagecount").delegate('.ant-pagination-item', "click", function () {
                var market, category, label, page, tagStr1, price, deliver, os, customerGroup, arrChoseObj, rel, sort;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取sort排序
                sort = u.getSort();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                var rel = $(this).attr("rel");
                curPage = parseInt(rel);
                if (rel) {
                    bindSelf.getListProduct(u.getRequset().keyword, market, category, label, curPage - 1, price, deliver, os, customerGroup, sort);
                }

            });
            //分页标签里里的上一页
            $("#pagecount").delegate('.ant-pagination-prev', "click", function () {
                var market, category, label, page, tagStr1, price, deliver, os, customerGroup, arrChoseObj, rel, sort;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取sort排序
                sort = u.getSort();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                rel = $(this).attr("rel");
                curPage = parseInt(rel);
                if ($(".ant-pagination-prev").find("a").hasClass("discursor")) {

                } else {
                    bindSelf.getListProduct(u.getRequset().keyword, market, category, label, curPage - 1, price, deliver, os, customerGroup, sort);
                }

            });
            //分页标签里里的下一页
            $("#pagecount").delegate('.ant-pagination-next', "click", function () {
                var market, category, label, page, tagStr1, price, deliver, os, customerGroup, arrChoseObj, rel, sort;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取sort排序
                sort = u.getSort();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                //获取当前点击分页的点击数字
                rel = $(this).attr("rel");
                curPage = parseInt(rel);
                if ($(".ant-pagination-next").find("a").hasClass("discursor")) {

                } else {
                    bindSelf.getListProduct(u.getRequset().keyword, market, category, label, curPage - 1, price, deliver, os, customerGroup, sort);
                }


            });
            //按照时间排序
            $(".product-line-time").bind("click", function () {
                var market, sort, page, price, deliver, os, customerGroup, arrChoseObj, category, label;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                if (choseAsc) {
                    u.showSortBtn(".quick-sort span.rel", ".product-line-time", ".uf-triangle-down");
                    sort = "approveTime,desc";
                    choseAsc = false;
                } else {
                    u.showSortBtn(".quick-sort span.rel", ".product-line-time", ".uf-triangle-up");
                    sort = "approveTime,asc";
                    choseAsc = true;
                }

                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup, sort);
            });
            //按照价格排序
            $(".product-price").bind("click", function () {
                var market, sort, page, price, deliver, os, customerGroup, arrChoseObj, category, label;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                if (choseAsc) {
                    u.showSortBtn(".quick-sort span.rel", ".product-price", ".uf-triangle-down");
                    sort = "lowestPrice,desc";
                    choseAsc = false;
                } else {
                    u.showSortBtn(".quick-sort span.rel", ".product-price", ".uf-triangle-up");
                    sort = "lowestPrice,asc";
                    choseAsc = true;
                }
                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup, sort);
            });
            //按照默认排序
            $(".product-default").bind("click", function () {
                var market, sort, page, price, deliver, os, customerGroup, arrChoseObj, category, label;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                sort = "default";
                if (choseAsc) {
                    u.showSortBtn(".quick-sort span.rel", ".product-default", ".uf-triangle-down");
                    choseAsc = false;
                } else {
                    u.showSortBtn(".quick-sort span.rel", ".product-default", ".uf-triangle-up");
                    choseAsc = true;
                }
                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup, sort);
            });
            //选中产品项
            $(".product-class dd").delegate('span', "click", function (e) {
                var market, marketName, category, label, dataleve1, datalevelSub, dataleve2, dataleve2Sub, str1, str2, allItem, categoryArry, dataCategory, marketFirst, marketSencond;
                $(".ul-class").removeClass("y-hide");
                if ($(this).hasClass('level2stop')) {
                    dataleve2 = $(this).attr("data-level");
                    str2 = "";
                    str2 += "<div class='item'>";
                    str2 += "<i class='uf uf-arrow-right icon-color font-size-10'></i>";
                    str2 += "<span class='title padding-right-5'>";
                    str2 += "<span class='btn' data-level=" + dataleve2 + ">" + $(this).text() + "</span>";
                    str2 += "<i class='uf uf-triangle-down  font-size-10'></i>";
                    str2 += "<div class='sub y-hide'>";
                    str2 += " <ul class='y-clear' >";
                    $.each($(".level2stop"), function (index, item) {
                        dataleve2Sub = $(item).attr("data-level");
                        str2 += "<li class='sencondCate' data-level2=" + dataleve2Sub + ">" + item.innerText + "</li>";
                    })
                    str2 += "</ul>";
                    str2 += "</div>";
                    str2 += "</div>";
                    $(".search .class-list").append(str2);
                    $(".product-class").addClass("dn");
                } else {
                    //获取当前的一级分类
                    dataleve1 = $(this).attr("data-level");
                    allItem = "";
                    allItem += "<div class='item allCategory'>"
                    allItem += "<span class='title'>全部分类</span>"
                    allItem += "</div>";
                    str1 = "";
                    str1 += "<div class='item'>";
                    str1 += "<i class='uf uf-arrow-right icon-color font-size-10'></i>";
                    str1 += "<span class='title padding-right-5'>";
                    str1 += "<span class='btn' data-level=" + dataleve1 + ">" + $(this).text() + "</span>";
                    str1 += "<i class='uf uf-triangle-down  font-size-10'></i>";
                    str1 += "<div class='sub y-hide'>";
                    str1 += " <ul class='y-clear' >";
                    $.each(dataLevelCate, function (index, item) {
                        str1 += "<li class='firstCateg' data-level=" + item.categoryId + ">" + item.categoryName + "</li>";
                        if (dataleve1 == item.categoryId) {
                            if (item.productCategoryDtoList.length > 0) {
                                dataLeve2Cate = item.productCategoryDtoList;
                            } else {
                                dataLeve2Cate = "此一级分类下没有二级分类";
                            }
                        }
                    });
                    str1 += "</ul>";
                    str1 += "</div>";
                    $(".search .class-list").append(allItem).append(str1);
                    //循环遍历显示当前选中的一级分类下面的二级分类
                    u.setDataCategory(dataLeve2Cate);
                }
                //获取列表页，页签
                label = u.getLabel();
                //移除价格，支付方式，操作系统的选中
                u.removeActive();
                if ($(this).hasClass("levelFirst")) {
                    market = $(this).attr("data-level");
                    marketName = $(this).text();
                    self.getListProduct(u.getRequset().keyword, market, category, label);
                    self.getAdvertSing(marketName);

                } else if ($(this).hasClass("level2stop")) {
                    //获取market的id
                    market = u.getFirstCategory();
                    //获取market的name
                    marketFirst = u.getMarketName();
                    //获取category的name
                    marketSencond = $(this).text();
                    //吧一级分类和二级分类名称通过$$拼接
                    marketName = marketFirst + "$$" + marketSencond;
                    category = $(this).attr("data-level");
                    self.getListProduct(u.getRequset().keyword, market, category, label);
                    self.getAdvertSing(marketName);
                }
                e.stopPropagation();

            });
            //hover一级产品分类
            $(document).on("mouseover mouseout", ".class-list .item ", function (event) {
                if (event.type == "mouseover") {
                    //鼠标悬浮
                    $(this).find(".sub").removeClass("y-hide");
                } else if (event.type == "mouseout") {
                    //鼠标离开
                    $(this).find(".sub").addClass("y-hide");
                }
            });
            //点击一级产品分类，进行请求
            $(".y-clear").delegate('.firstCateg', "click", function (e) {
                var market, marketName, category, label, categoryArry, dataleve1, dataLeve2Cate;
                //循环遍历显示当前选中的一级分类下面的二级分类
                dataleve1 = $(this).attr("data-level");
                $.each(dataLevelCate, function (index, item) {
                    if (dataleve1 == item.categoryId) {
                        if (item.productCategoryDtoList.length > 0) {
                            dataLeve2Cate = item.productCategoryDtoList;
                        } else {
                            dataLeve2Cate = "此一级分类下没有二级分类";
                        }
                    }
                });
                u.setDataCategory(dataLeve2Cate);
                //获取label标签
                label = u.getLabel();
                //获取一级分类
                market = $(this).attr("data-level");
                marketName = $(this).text();
                //更新当前点击的二级分类
                $(".item .btn").attr("data-level", market);
                $(".padding-right-5 .btn").html($(this).text());
                //移除二级分类
                u.removeCategory();
                //移除价格，支付方式，操作系统的选中
                u.removeActive();
                self.getListProduct(u.getRequset().keyword, market, category, label);
                self.getAdvertSing(marketName);
                e.stopPropagation();
            });
            //点击二级产品分类，进行请求
            $(".y-clear").delegate('.sencondCate', "click", function (e) {
                var market, category, label, marketFirst, marketSencond, marketName;
                //获取market
                market = u.getFirstCategory();
                //获取market的name
                marketFirst = u.getMarketName();
                //获取category的name
                marketSencond = $(this).text();
                //获取label标签
                label = u.getLabel();
                //吧一级分类和二级分类名称通过$$拼接
                marketName = marketFirst + "$$" + marketSencond;
                //获取category
                category = $(this).attr("data-level2");
                //更新当前点击的二级分类携带的id和内容
                /*   $(".item .btn").eq(1).attr("data-level2",category);*/
                $(".padding-right-5 .btn").eq(1).html($(this).text());
                //移除价格，支付方式，操作系统的选中
                u.removeActive();
                self.getListProduct(u.getRequset().keyword, market, category, label);
                self.getAdvertSing(marketName);
                e.stopPropagation();
            });
            //label标签点击
            $(".product-list").delegate('span.tagBtn', "click", function () {
                var market, category, label, page, tagStr1, price, deliver, os, customerGroup, arrChoseObj;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = $(this).attr("data-label");
                //获取category
                category = u.getCategory();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                //当只点击标签的时候
                $(".ul-class").removeClass("y-hide");
                //每次点击标签的时候，移除上一次的标签选项
                $(".tag-list").remove();
                //生成标签
                tagStr1 = "";
                tagStr1 += "<span></span>";
                tagStr1 += "<div class='tag-list y-left'>";
                tagStr1 += "<div class='ml-line  y-left y-mr3'></div>";
                tagStr1 += "<dt class='title' >标签</dt>";
                tagStr1 += "<dd><span class='innerLab-text'data-label=" + label + ">" + $(this).text() + "</span><i class='close'></i> ";
                tagStr1 += "</dd>";
                tagStr1 += "</div>";
                $(".ul-class").append(tagStr1);
                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup);
            });
            //关闭lable标签
            $(".search").delegate('.close', "click", function () {
                var market, category, page, label, tagTarget, price, deliver, os, customerGroup, arrChoseObj;
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                //当只有标签存在筛选栏的情况下，移除标签，隐藏筛选栏，否则只是移除标签
                tagTarget = $(this).parent().parent();
                if (tagTarget.parent().find(".item").length > 0) {
                    tagTarget.remove();
                } else {
                    tagTarget.remove();
                    $(".ul-class").addClass("y-hide");
                }
                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup);
            });
            //点击价格,支付方式，操作系统
            $(".m-pro-item").delegate('.btn', "click", function () {
                var page, price, deliver, os, arrChoseObj, market, category, label, customerGroup;
                $(this).siblings().removeClass("chose-active");
                $(this).addClass("chose-active");
                //获取market
                market = u.getFirstCategory();
                //获取label标签
                label = u.getLabel();
                //获取category
                category = u.getCategory();
                //获取选中的价格，支付方式，操作系统
                arrChoseObj = u.getPriceDos();
                price = arrChoseObj.price;
                deliver = arrChoseObj.deliver;
                os = arrChoseObj.os;
                customerGroup = arrChoseObj.customerGroup;
                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup);

            });
            //点击全部分类，移除列表
            $(".class-list").delegate('.allCategory', "click", function () {
                var market, category, label, page, price, deliver, os, customerGroup, categoryArry;
                $(".search .class-list").empty();
                $(".product-class").removeClass("dn");
                $(".firstLevel").empty();
                $(".ul-class").addClass("y-hide");
                $.each(dataLevelCate, function (index, item) {
                    $(".firstLevel").append('<span class="levelFirst btn" data-level=' + item.categoryId + '>' + item.categoryName + '</span>');
                });
                self.getListProduct(u.getRequset().keyword, market, category, label, page, price, deliver, os, customerGroup);
            });
        },


        /**
         * 搜索获取产品数据
         * @param keyword
         * @param market
         * @param category
         * @param label
         * @param page
         * @param price
         * @param deliver
         * @param os
         * @param customerGroup
         * @param sort
         */
        getListProduct: function (keyword, market, category, label, page, price, deliver, os, customerGroup, sort) {
            self = this;
            var ProductListHTML, dataAryContent;
            $.ajax({
                type: 'get',
                /* url: "/market/product/search?keyword=%u7528%u53CB%u5E02%u573A%u8D22%u52A1%u8F6F%u4EF6", */
                url: "/search/product/s",
                data: {
                    "keyword": keyword ? keyword : "",
                    "market": market ? market : "",
                    "category": category ? category : "",
                    "label": label ? label : "",
                    "page": page ? page : "",
                    "price": price ? price : "",
                    "deliver": deliver ? deliver : "",
                    "os": os ? os : "",
                    "customerGroup": customerGroup ? customerGroup : "",
                    "sort": sort ? sort : ""
                },  //生产的参数
                dataType: "JSON",
                async: false,
                cache: false,
                beforeSend: function (XMLHttpRequest) {
                    if (market) {
                        if (category == undefined) {
                            category = "";
                        }
                        window.location.hash = "#marketId=" + market + "&categoryId=" + category;
                    }
                },
                success: function (data) {
                    if (data.status == 1) {
                        dataAryContent = data.data.content;
                        //如果data.data.content有元素，说明有产品存在
                        if (dataAryContent != null && dataAryContent.length > 0) {
                            total = data.data.totalElements; //总记录条数
                            pageSize = data.data.size; //每页显示条数
                            totalPage = data.data.totalPages; //总页数*/
                            //为您找到一共多少个产品
                            total = total > 0 ? total : 0;
                            $(".product-Count").text(total);
                            //使用模板引擎渲染列表
                            ProductListHTML = template('productUl', data.data);
                            document.querySelector('.product-ul').innerHTML = ProductListHTML;
                            //执行分页
                            $(".pages-ul").removeClass("dn");
                            $("#pagecount").children().remove();
                            self.getPageBar(totalPage);
                            //如果没有找到图片。显示一个默认图片
                            u.getUndefindImage(".view-img img");
                            window.scrollTo(0, 0);
                        } else {
                            $(".product-Count").text(0);
                            $('.product-ul').html('<h1 class="tc padding-20">没有查询到您搜索的产品</h1>');
                            $(".pages-ul").addClass("dn");
                        }

                    }

                },
                error: function () {
                    $(".product-Count").text(0);
                    $('.product-ul').html('<h1 class="tc padding-20">服务器延迟...</h1>');
                    $(".pages-ul").addClass("dn");
                }
            });
        },
        //产品分类条目展示
        getProductCategory: function () {
            self = this;
            $.ajax({
                type: 'get',
                url: "/market/product/category",
                dataType: "JSON",
                async: false,
                cache: false,
                success: function (data) {
                    var dataAryItem;
                    if (data.status == 1) {
                        dataAryItem = data.data;
                        if (dataAryItem.length > 0) {
                            dataLevelCate = dataAryItem;
                            //循环遍历数组
                            $.each(dataAryItem, function (index, item) {
                                $(".firstLevel").append('<span class="levelFirst btn" data-level=' + item.categoryId + '>' + item.categoryName + '</span>');
                                //如果productCategoryDtoList数组的长度大于0，说明一级分类里面含有二级分类
                                if (item.productCategoryDtoList.length > 0) {
                                    $(".levelFirst").data("level-key" + index, item.productCategoryDtoList);
                                } else {
                                    $(".levelFirst").data('level-key' + index, "产品二级分类的内容为空");
                                }
                            });
                        } else {
                            document.querySelector('.search').innerHTML = '<h1 class="tc padding-20">没有查询到分类信息</h1>';
                        }
                    } else {
                        document.querySelector('.search').innerHTML = '<h1 class="tc padding-20">没有查询到分类信息</h1>';
                    }
                },
                error: function () {
                    alert("分类数据加载失败");
                }
            });
        },
        //获取广告位
        getAdvertSing: function (market) {
            var ProducAderHTML, adverStr;
            $.ajax({
                type: 'get',
                url: "/api/cms/getdetail/name/" + market,
                dataType: "JSON",
                cache: false,
                success: function (data) {
                    $(".advertisement").html('');
                    if (data.code == 200) {
                        if (data.res.length >= 3) {
                            //广告位只允许放前三个产品，少于3个就不显示推广位
                            data.res.length = 3;
                            //使用模板引擎渲染列表
                            adverStr = template('adverPro', data);
                            $(".advertisement").html(adverStr);
                            $(".advertisement__item").eq(1).addClass("advertisement__item--middle");
                            //如果没有找到图片。显示一个默认图片
                            u.getUndefindImage(".advertisement__item__icon img");
                        }
                    }
                },
                error: function () {
                    $(".advertisement").html('<h1 class="tc padding-20">服务器延迟...</h1>');
                }
            });
        },
        //生成分页组件
        getPageBar: function (totalPage) {
            var pageStrStart = '<li title="上一页" rel="' + (parseInt(curPage) - 1) + '" class=" ant-pagination-prev">'
            pageStrStart += '<a>上一页</a>'
            pageStrStart += '</li>';
            var pageStrEnd = '<li title="下一页" rel="' + (parseInt(curPage) + 1) + '" class=" ant-pagination-next">'
            pageStrEnd += '<a> 下一页 </a>'
            pageStrEnd += '</li>';
            var pageData = "";
            if (totalPage > 1) {
                for (var i = 0; i < totalPage; i++) {
                    pageData += '<li rel="' + (i + 1) + '"class="ant-pagination-item">'
                    pageData += '<a>' + (i + 1) + '</a>'
                    pageData += '</li>';
                }
                $("#pagecount").append(pageStrStart + pageData + pageStrEnd);
                if (curPage == 1) {
                    $(".ant-pagination-prev").find("a").addClass("discursor");
                    $(".ant-pagination-item").eq(0).addClass("addActive");
                } else if (curPage < totalPage) {
                    $(".ant-pagination-item").eq(curPage - 1).addClass("addActive");
                } else if (curPage == totalPage) {
                    $(".ant-pagination-item").eq(curPage - 1).addClass("addActive");
                    $(".ant-pagination-next").find("a").addClass("discursor");
                } else if (curPage < 1) {
                    $(".ant-pagination-item").eq(curPage - 1).addClass("addActive");
                    $(".ant-pagination-prev").find("a").addClass("discursor");
                }
            } else if (totalPage == 1) {
                pageData += '<li rel="' + (0 + 1) + '"class="ant-pagination-item addActive">'
                pageData += '<a>' + (0 + 1) + '</a>'
                pageData += '</li>';
                $("#pagecount").append(pageStrStart + pageData + pageStrEnd);
                $(".ant-pagination-prev").find("a").addClass("discursor");
                $(".ant-pagination-next").find("a").addClass("discursor");
            }
            //默认吧第一页为默认选中页
            curPage = 1;

        },
        //如果锚点参数，显示导航匹配的数据
        showNavData: function (marketId, categoryId) {
            //每次展示之前，先清空以前的dom节点
            $(".class-list ").empty();
            $(".firstLevel").empty();
            var market, marketName, leve2categoryName, category, label, dataleve1, datalevelSub, dataleve2, dataleve2Sub, str1, str2, allItem, categoryArry, dataCategory, pipeiCategory, dataLeve2Cate;
            var strFirst = "";
            $.each(dataLevelCate, function (index, item) {
                strFirst += "<li class='firstCateg' data-level=" + item.categoryId + ">" + item.categoryName + "</li>";
                if (marketId == item.categoryId) {
                    marketName = item.categoryName;
                    if (item.productCategoryDtoList.length > 0) {
                        dataLeve2Cate = item.productCategoryDtoList;
                        //获取url中对应的二级分类名称
                        $.each(dataLeve2Cate, function (index, item) {
                            $(".firstLevel").append('<span class="level2stop btn" data-level=' + item.categoryId + '>' + item.categoryName + '</span>');
                            if (categoryId == item.categoryId) {
                                leve2categoryName = item.categoryName;
                            } else {
                                $(".product-class").removeClass("dn");
                            }
                        })
                    } else {
                        dataLeve2Cate = "此一级分类下没有二级分类";
                        $(".product-class").addClass("dn");
                    }
                }
            });
            if (marketName) {
                $(".ul-class").removeClass("y-hide");
                allItem = "";
                allItem += "<div class='item allCategory'>"
                allItem += "<span class='title'>全部分类</span>"
                allItem += "</div>";
                str1 = "";
                str1 += "<div class='item'>";
                str1 += "<i class='uf uf-arrow-right icon-color font-size-10'></i>";
                str1 += "<span class='title padding-right-5'>";
                str1 += "<span class='btn' data-level=" + marketId + ">" + marketName + "</span>";
                str1 += "<i class='uf uf-triangle-down  font-size-10'></i>";
                str1 += "<div class='sub y-hide'>";
                str1 += " <ul class='y-clear' >";
                str1 += strFirst;
                str1 += "</ul>";
                str1 += "</div>";
                $(".search .class-list").append(allItem).append(str1);

                //循环遍历显示当前选中的一级分类下面的二级分类
                if (leve2categoryName) {
                    str2 = "";
                    str2 += "<div class='item'>";
                    str2 += "<i class='uf uf-arrow-right icon-color font-size-10'></i>";
                    str2 += "<span class='title padding-right-5'>";
                    str2 += "<span class='btn' data-level=" + categoryId + ">" + leve2categoryName + "</span>";
                    str2 += "<i class='uf uf-triangle-down  font-size-10'></i>";
                    str2 += "<div class='sub y-hide'>";
                    str2 += " <ul class='y-clear' >";
                    $.each(dataLeve2Cate, function (index, item) {
                        str2 += "<li class='sencondCate' data-level2=" + item.categoryId + ">" + item.categoryName + "</li>";
                    });
                    str2 += "</ul>";
                    str2 += "</div>";
                    str2 += "</div>";
                    $(".search .class-list").append(str2);
                    $(".product-class").addClass("dn");
                }

            }
        }


    };

    $(function () {
        MarketList.init();
    });

})
