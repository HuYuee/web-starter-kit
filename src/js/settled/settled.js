define(['jquery','util', 'template','webuploader','PCASClass'], function ($, u, template, WebUploader,PCAS) {
    $('body').css('visibility', 'visible');

    $(function(){
        var updataUrl = "/market/product/category";
        var infoUrl = "/market/isv/info";
        var saveUrl = "/market/isv/save";
        var submmitUrl = "/market/isv/commit";
        var waittime = 5;
        var approveStatus
        var EmailReg = /^([a-z0-9A-Z]+[-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/; //邮件正则
        var TelReg =  /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;//手机号正则
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isOpera = userAgent.indexOf("Opera") > -1;
        if (isOpera) {
            $(".select_bars").show();
        }; //判断是否Opera浏览器
        if (userAgent.indexOf("Firefox") > -1) {
            $(".select_bars").show();
        } //判断是否Firefox浏览器
        if (userAgent.indexOf("Chrome") > -1){
            $(".select_bars").show();
        }
        if (userAgent.indexOf("Safari") > -1) {
            $(".select_bars").show();
        }
        function timeOver(o){
            if (waittime == 0) {
                waittime = 5;
            } else {
                waittime--;
                o.html(waittime)
                setTimeout(function() {
                        timeOver(o)
                    },
                    1000)
            }
        };
        $.ajax({
            type : 'get',
            url : updataUrl,
            contentType:"application/json",
            dataType : 'json',
            async : false,
            cache : false,
            success : function(res) {
                if(res.status==1){
                    for(var i =0; i < res.data.length;i++){
                        var categoryId =  res.data[i].categoryId;
                        var categoryName =  res.data[i].categoryName;
                        var html = '<option value='+categoryId+'>'+categoryName+'</option>'
                        $(".sttled2_category").append(html)
                    }

                }else{

                }

            }
        });
        $.ajax({
            type : 'get',
            url : infoUrl,
            contentType:"application/json",
            async : false,
            cache : false,
            dataType : 'json',
            success : function(res) {
                if(res.status==1 && res.data!=null){

                    if(res.data.location!=null&&res.data.location.indexOf("/")>0){
                        var tenantArea1 = res.data.location.split("/")[0];
                        var tenantArea2 = res.data.location.split("/")[1];
                        new PCAS("P1" ,"C1",tenantArea1,tenantArea2 );


                    }
                    $(".isv_name").val(res.data.isvName)
                    $(".settled_img2").find("img").attr("src",res.data.isvLogo)
                    $(".sttled2_category").val(res.data.isvMarket)
                    $(".tenantName").val(res.data.legalPerson)
                    $(".sttled2_hangye option:selected").text(res.data.industry)
                    //$(".settled2_address").val(res.data.location)
                    $(".companySite").val(res.data.officialSite)
                    $(".settled_email").val(res.data.officialEmail)
                    $(".tenant_contactname").val(res.data.linkmanName)
                    $(".settled_phone").val(res.data.linkmanMobile)
                    $(".tenant_email").val(res.data.linkmanEmail)
                    $(".chanpayAccount").val(res.data.chanpayAccount)

                    $(".settleds_Number").val(res.data.licenceNumber)
                    $(".settleds_ZzNumber").val(res.data.orgNumber)
                    $(".up1").append('<img src='+res.data.licencePic+'>');
                    $(".up2").append('<img src='+res.data.officialSeal+'>');
                    $(".up3").append('<img src='+res.data.authLetter+'>');
                    $(".up4").append('<img src='+res.data.legalPersonIDPic+'>');


                    $(".settled2_fapiao").val(res.data.invoiceType)
                    $(".tenant_Fullname").val(res.data.invoiceTitle)
                    $(".settled2_sw").val(res.data.registerNum)
                    $(".bank_username").val(res.data.registerName)
                    $(".bank_branchname").val(res.data.registerAccount)
                    $(".bank_name").val(res.data.registerAccountBank)
                    $(".register_phone").val(res.data.registerPhone)
                    $(".register_address").val(res.data.registerAddress)

                    $(".send_phone").val(res.data.receiverMobile)
                    $(".send_Name").val(res.data.receiverName)
                    $(".send_address").val(res.data.receiverAddress)

                    if(res.data.approveStatus==4){
                        $(".app_bottom_shenhew").css("visibility","visible");
                        $(".app_bottom_shenhew .app_approveReason").html(res.data.approveComment);
                    }else if(res.data.approveStatus==2){
                        $(".app_bottom_shenhew").css("visibility","visible").find("span").html(res.data.approveComment)
                    }
                    if(res.data.licencePic != "" && res.data.licencePic !=null){
                        upihover();
                    }
                }


            }
        });
        function upihover(){
            $(".upi1").hide();
            $(".up1").mouseenter(function(){
                $(".upi1").fadeIn();
                uploadimg('.upi1','.up1');
            });
            $(".upi1").mouseleave(function(){
                $(".upi1").fadeOut()
            })
        }
        $(".app_approveReason_i").mouseenter(function(){
            $(".app_approveReason").show()
        });
        $(".app_approveReason").mouseleave(function(){
            $(".app_approveReason").hide()
        })
        $(".settled_email,.tenant_email").bind("blur",function(){
            if(!EmailReg.test($(this).val())){
                $(this).addClass("errorinput");
            }
        }).bind("focus",function(){
            $(this).removeClass("errorinput");
        });
        $(".settled_phone").bind("blur",function(){
            if(!TelReg.test($(this).val())){
                $(this).addClass("errorinput");

            }else{

            }
        }).bind("focus",function(){
            $(this).removeClass("errorinput");

        });
        $(".isv_name").bind("blur",function(){
            if($(this).val()==""){
                $(this).addClass("errorinput");
            }
        }).bind("focus",function(){
            $(this).removeClass("errorinput");
        });
        $(".settled2_btnbc").click(function(){
            $(".app_bottom_shenhew").css("visibility","hidden")
            setledUpajax(saveUrl,"保存成功");
            return
        })
        $(".settled2_btntj").click(function(){
            $(".app_bottom_shenhew").css("visibility","hidden");
            setledUpajax(submmitUrl,"提交成功");
            /*$.ajax({
             type : 'get',
             url : infoUrl,
             contentType:"application/json",
             dataType : 'json',
             success : function(res) {
             if(res.status==1){
             if(res.data.approveStatus==2){
             $(".app_bottom_shenhew").css("visibility","visible").find("span").html(res.data.approveComment)
             }else{
             setledUpajax(submmitUrl,"提交成功");

             }
             }else{

             }

             }
             });*/





            return
        });
        function setledUpajax(Url,msg){
            if($(".isv_name").val()==""){
                $(".isv_name").addClass("errorinput");
                return
            }
            if($(".settleds_Number").val()==""){
                $(".settleds_Number").addClass("errorinput");
                return
            }
            if($(".up1 img").attr("src")=="" || $(".up1 img").attr("src")==undefined){
                $(".up1").addClass("errorinput");
                return
            }
            if($(".bank_branchname").val()==""){
                $(".bank_branchname").addClass("errorinput");
                return
            }if($(".bank_username").val()==""){
                $(".bank_username").addClass("errorinput");
                return
            }if($(".bank_name").val()==""){
                $(".bank_name").addClass("errorinput");
                return
            }if($(".settled2_sw").val()==""){
                $(".settled2_sw").addClass("errorinput");
                return
            }
            var tenantArea = $(".tenantArea1").val()+"/"+$(".tenantArea2").val();
            var data = {
                isvName:$(".isv_name").val(),
                isvLogo:$(".settled_img2").find("img").attr("src") || "",
                isvMarket:$(".sttled2_category").val(),
                legalPerson:$(".tenantName").val(),
                industry:$(".sttled2_hangye option:selected").text(),
                location:tenantArea,
                officialSite:$(".companySite").val(),
                officialEmail:$(".settled_email").val(),
                linkmanName:$(".tenant_contactname").val(),
                linkmanMobile:$(".settled_phone").val(),
                linkmanEmail:$(".tenant_email").val(),
                chanpayAccount:$(".chanpayAccount").val(),

                licenceNumber:$(".settleds_Number").val(),
                orgNumber:$(".settleds_ZzNumber").val(),
                licencePic:$(".up1").find("img").attr("src") || "",
                officialSeal:$(".up2").find("img").attr("src") || "",
                authLetter:$(".up3").find("img").attr("src") || "",
                legalPersonIDPic:$(".up4").find("img").attr("src") || "",

                invoiceType:$(".settled2_fapiao").val(),
                invoiceTitle:$(".tenant_Fullname").val(),
                registerNum:$(".settled2_sw").val(),
                registerName:$(".bank_username").val(),
                registerAccount:$(".bank_name").val(),
                registerAccountBank:$(".bank_branchname").val(),
                registerPhone:$(".register_phone").val(),
                registerAddress:$(".register_address").val(),

                receiverMobile :$(".send_phone").val(),
                receiverName:$(".send_Name").val(),
                receiverAddress:$(".send_address").val()

            };
            $.ajax({
                type : 'post',
                url : Url,
                data : JSON.stringify(data),
                contentType:"application/json",
                dataType : 'json',
                success : function(res) {
                    //console.log(res) ;
                    if(res.status==1){
                        $(".app_bottom_shenhew").css("visibility","visible").find("span").html(msg)

                        window.location.href="/market"

                    }else{
                        $(".app_bottom_shenhew").css("visibility","visible").find("span").html("申请失败，请重新申请")
                    }

                }
            });
        }
        uploadimg('.upi1','.up1');
        uploadimg('.upi2','.up2');
        uploadimg('.upi3','.up3');
        uploadimg('.upi4','.up4');
        uploadimg('.settled_btn_t2','.settled_img2');
        function uploadimg(upbtn,imgurl){
            var downurl = '/market/file/down/img';
            var up = WebUploader.create({
                server: '/market/file/upload/img',
                swf: '/market/market/src/vendor/uploader/swf/Uploader.swf?v=' + Math.random(),
                pick: upbtn,
                accept: [ //可以接受的文件类型，数组
                    {
                        title: 'Images',
                        extensions: 'jpg,jpeg,png',
                        mimeTypes: 'image/jpg,image/jpeg,image/png'
                    }
                ],
                auto: true,
                compress: false

            });
            up.on( 'uploadSuccess', function( file, res ) {
                if(res.fileName != '-1'){  // -1  表示文件太大，没有上传
                    var d =  res.fileName ;
                    var html = '<img src=' +d+ ' />'
                    $(imgurl).html(html);
                    upihover();
                    $(".upi1").addClass("upi1_hover");
                }
            });
            up.on( 'uploadError', function( file ) {

            });
            up.on( 'fileQueued', function( file ) {
                if( file.size > 1024*1024*5) {
                    alert("文件大小不能超过5m");
                    return false;
                }

            });
        }

    })


})
