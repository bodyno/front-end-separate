$(function(){
    $(".deposit-tags li").click(function(){
        $(this).siblings().find("span").removeClass("on");
        $(this).find("span").addClass("on")
        $(".mode-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    })

    $(document).on("click",".radio-bank",function(){
        $(this).find(":radio").prop("checked","checked");
        $(this).find(">div").addClass("checked");
        $(this).parent().siblings().find(".radio-bank>div").removeClass("checked");
    })

    $(document).on("click",".radio-bank-3",function(){
        $(this).find(":radio").prop("checked","checked");
        $(this).find(">div").addClass("checked");
        $(this).siblings().find(">div").removeClass("checked");
    })


    $("#deposit-btn1").click(function(){
        var tmpl = doT.template($("#deposit-tmpl").html())({
            timeText:"有效时间"
        })
        showPopUp(tmpl, "订单已提交", 700, 450, function() {});
        beginCount();

    })

    $("#btn-deposit2").click(function(){
        showPopUp($("#deposit-tmpl2").html(), "订单已提交", 700, 450, function() {});
        copy();
    })


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
            //date: +(new Date) + 1200000,
            date: +(new Date) + 2000,
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


})