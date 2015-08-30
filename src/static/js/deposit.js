$(function(){
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
        $(this).find(":radio").prop("checked","checked");
        $(this).find(">div").addClass("checked");
        $(this).siblings().find(">div").removeClass("checked");

        moveBtn();
    })

    $(document).on("keyup","#amount",function(){
        moveBtn();
    })


    /*$("#deposit-btn1").click(function(){
        /!*var tmpl = doT.template($("#deposit-tmpl").html())({
            timeText:"有效时间"
        })
        showPopUp(tmpl, "订单已提交", 700, 450, function() {});
        beginCount();*!/

        $.post('/deposit',{
            orderMoney:0.1,
            payId:123
        }).success(function(result){
            alert(result)
        })


    })*/


    //复制
    function copy() {
        $(".btn-copy").zclip({
            copy: function () {
                return $(this).data("clipboard-text");
            }, afterCopy: function () { /*dialog.info(l.Message, "复制成功");*/
                Tips.Show("复制成功", {top: "108px", left: "280px"});
            }
        });
    }


    //倒计时
    function beginCount(){
        $(".step-1 .time").countdown({
            date: +(new Date) + 1200000,
            //date: +(new Date) + 2000,
            render: function(data) {
                $(this.el).text(this.leadingZeros(data.min)+":"+this.leadingZeros(data.sec, 2));
            },
            onEnd: function() {
                $(".step-1").hide();
                $(".step-2").show();
            }
        })
    }

    //再存一次
    $(document).on("click",".step-2 .btn-blue",function(){
        location.reload();
    })

    $(document).on("focus","#amount",function(){
        $(this).prev().hide()
    })

    $(document).on("blur","#amount",function(){
        if(!$(this).val()){
            $(this).prev().show()
        }
    })


    $("body").on("click", ".third-party-use .more", function() {
        if ($.cookie("thirdpayment") != null && $(".third-banks").height() == 35) {
            var cbv = $("input[type='radio']:checked", ".third-banks").val();
            ThirdPB.Render();
            $("input[type='radio'][value='"+cbv+"']", ".third-banks").prop("checked", true);
        }

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
        var amount=tempP.find("#amount").val().length;
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
        var tmpl = doT.template($("#deposit-tmpl").html())({
            timeText:"有效时间"
        })
        showPopUp(tmpl, "订单已提交", 700, 450, function() {});
        beginCount();
    })

    $(document).on("click",".btnClose,.reload",function(){
        location.reload();
        return false;
    })

    $(document).on("click","#payment-ali",function(){
        var tmpl = doT.template($("#deposit-tmpl2").html())()
        showPopUp(tmpl, "订单已提交", 700, 450, function() {});
        copy();
    })

})