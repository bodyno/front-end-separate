function afterTran(){
    $(".deposit-tags li").click(function(){
        $(this).siblings().find("span").removeClass("on");
        $(this).find("span").addClass("on")
        $(".deposit-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    })

    $(document).on("click",".radio-bank",function(){
        $(this).find(":radio").prop("checked","checked");
        $(this).find(">div").addClass("checked");
        $(this).parent().siblings().find(".radio-bank>div").removeClass("checked");

        moveBtn();
    })

    $(document).on("click",".radio-bank-3",function(){
        if($(this).hasClass("c-bank")){
            return false;
        }
        $(this).find(":radio").prop("checked","checked");
        $(this).find(">div").addClass("checked");
        $(this).siblings().find(">div").removeClass("checked");

        moveBtn();
    })

    $(document).on("keyup",".deposit-item.active .amount",function(){
        moveBtn();
    })


    //倒计时
    function beginCount(){
        $('.step-1 .time').countdown(new Date().getTime()+1200000, function(event) {
            $(this).html(
                event.strftime('%M')+":"+event.strftime('%S')
            );
        }).on('finish.countdown', function(){
            $(".step-1").hide();
            $(".step-2").show();
        });
    }

    //再存一次
    $(document).on("click",".step-2 .btn-blue",function(){
        location.reload();
    })

    $(document).on("focus",".deposit-item.active .amount",function(){
        $(this).prev().hide()
    })

    $(document).on("blur",".deposit-item.active .amount",function(){
        if(!$(this).val()){
            $(this).prev().show()
        }
    })


    $("body").on("click", ".third-party-use .more", function() {
        $(".third-banks").animate({ height: "160px" }, 400, function() {
            $(".third-party-use .collapse").show();
        });
        $(this).hide();
        return false;
    });
    $("body").on("click", ".third-party-use .collapse", function() {
        $(".third-banks").animate({ height: "83px" }, 400, function() {
            $(".third-party-use .more").slideDown();
        });
        $(this).hide();
        return false;
    });


    function moveBtn(){
        var tempP=$(".deposit-item.active");
        var amount=tempP.find(".amount").val().length;
        var bank=tempP.find(".radio-bank-3 .checked,.radio-bank .checked").length;
        if(amount&&bank) {
            tempP.find(".btn-deposit-top").stop().animate({ marginTop: "-36px" }, 200, "linear");
        }
        else {
            tempP.find(".btn-deposit-top").stop().animate({ marginTop: "0px" }, 200, "linear");
        }
    }


    //第三方开始充值
    $(document).on("click","#ThirdPaymentPay",function(){
        if(!checkAmount()){
            return false;
        }

        $.post("/cashier/deposit",{
            orderMoney:$(".deposit-item.active").find(".amount").val(),
            payId:$(".deposit-item.active").find(".bank-input:checked").val()
        },function(result){
            resultHandle(result,function(result){
                var tmpl = doT.template($("#deposit-tmpl").html())()
                showPopUp(tmpl, $.t("js.1"), 700, 450, function() {});
                $(".ui-dialog").i18n();
                beginCount();
                window.open(result.obj)
            })
        })

    })

    $(document).on("click",".btnClose,.reload",function(){
        location.reload();
        return false;
    })

    $(document).on("click","#payment-ali",function(){
        var tmpl = doT.template($("#deposit-tmpl2").html())()
        showPopUp(tmpl, $.t("js.1"), 700, 450, function() {});
        copy();
    })


    function checkAmount(){
        var ele=$(".deposit-item.active").find(".amount");
        var val= ele.val();
        if(val.length=0||isNaN(val)){
            dialog.info($.t("js.2"));
            return false;
        }
        if(val.length=0||isNaN(val)){
            dialog.info($.t("js.3"));
            return false;
        }
        if(!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(val)){
            dialog.info($.t("js.4"));
            return false;
        }

        val=Number(val);
        if(val<ele.data("min")){
            dialog.info($.t("js.5"));
            return false;
        }
        if(val>ele.data("max")){
            dialog.info($.t("js.6"));
            return false;
        }
        return true;
    }



    //公司入款
    var companyData;
    $("#c-btn").click(function(){
        if(!checkAmount()){
            return false;
        }

        $.get("/cashier/getFundInfo",{
            companyAcctId:$(".deposit-item.active").find(".bank-input:checked").val()
        },function(result){
            resultHandle(result,function(result){
                companyData= $.extend({},result.obj,{
                    money:$('.deposit-item.active .amount').val(),
                    bankVal:$(".deposit-item.active").find(".bank-input:checked").val(),
                    bank:$(".deposit-item.active").find(".bank-input:checked").data("bank")
                })
                var tmpl = doT.template($("#deposit-company").html())(companyData)
                $("#company-con2").html(tmpl).addClass("active").siblings().removeClass("active");
                $("#company-con2").i18n();
                copy();
            })
        })
    })

    //复制
    function copy() {
        $(".btn-copy").zclip({
            copy: function () {
                return $(this).data("clipboard-text");
            }, afterCopy: function (data) {
                var offset=$(data.currentTarget).offset();
                Tips.Show($.t("js.7"), {top: offset.top+30, left: offset.left+60});
            }
        });
    }

    //上一步
    $(document).on("click","#c-btn-prev1",function(){
        $(this).parents(".c-item").prev().addClass("active").siblings().removeClass("active");
    })

    //下一步
    $(document).on("click","#c-btn-next1",function(){
        var tmpl = doT.template($("#deposit-company2").html())(companyData)
        $("#company-con3").html(tmpl).addClass("active").siblings().removeClass("active");
        $("#company-con3").i18n();
        bindProvince();
        companyValid();
    })

    function bindProvince(){
        $.get("/cashier/listProvince",function(result){
            resultHandle(result,function(){
                var html=[];
                result=result.obj;
                for(var i=0;i<result.length;i++){
                    html.push('<option data-id="'+result[i].provinceid+'" value="'+result[i].provincename+'">'+result[i].provincename+'</option>')
                }
                $("#bankProvince option:eq(0)").after(html);
            })
        })

        $("#bankProvince").change(function(){
            $.get("/cashier/listCity",{
                provinceid:$("#bankProvince option:selected").data("id")
            },function(result){
                resultHandle(result,function(){
                    var html=[];
                    result=result.obj;
                    for(var i=0;i<result.length;i++){
                        html.push('<option value="'+result[i].cityname+'">'+result[i].cityname+'</option>')
                    }
                    $("#bankCity option:not(:eq(0))").remove();
                    $("#bankCity option:eq(0)").after(html);
                })
            })
        })
    }

    //提交
    $(document).on("click","#btn-company",function(){
        if($("#company-form").valid()){
            var data= $.extend({},$("#company-form").form(),{
                companyAcctId:companyData.bankVal,
                account:companyData.money,
                orderNo:companyData.orderNo
            })
            $.post("/cashier/companyDeposit",data,function(result){
                resultHandle(result,function(result){
                    dialog.info($.t("js.8"),function(){
                        location.reload();
                    });
                })
            })
        }
    })

    function companyValid(){
        $("#company-form").validate($.extend({},validBase,{
            rules: {
                name: {
                    required: true
                },
                bankProvince:{
                    required: true
                },
                bankCity:{
                    required: true
                },
                validCode:{
                    required: true
                }
            }
        }));
    }

    //验证码刷新
    $(document).on("click","#company-code",function(){
        $(this).attr("src","/payCode?"+new Date().getTime())
    })
}