$(function(){

    var temp=110;
    if($(".illustration").length){
        temp=52;
    }
    $(".dial").knob({
        width: temp, height: temp, lineCap: "round", thickness: ".1", angleOffset: 180, readOnly: true, displayInput: false, fgColor: "#009b72", bgColor: "#a6ccc2"
    });

    var p = $("#info-complete").attr("data-complete");
    var i = 0;

    var t = setInterval(function() {
        i += 5;
        if (i >= p) { i = p; clearInterval(t); }
        $(".dial").val(i).trigger("change");
        $("#info-complete").html(i + "%");
    }, 30);


    var popTime;
    //语言
    $(".a-t-n-i").mouseenter(function(){
        $(".a-t-pop").hide();
        $(this).parent().find(".a-t-pop").show();
        clearTimeout(popTime);
    }).mouseleave(function(){
        clearTimeout(popTime);
        popTime=setTimeout(function(){
            $(".a-t-pop").hide();
        },200)
    })

    $(".a-t-pop").mouseenter(function(){
        clearTimeout(popTime);
    }).mouseleave(function(){
        $(this).hide();
    })


    $(document).on("click",".a-t-pop .close",function(){
        $(this).parent().hide();
    })
})

Tips = {
    Show: function(msg, css) {
        var $block = $(".g-tips-block2");
        if ($block.length == 0) { $block = $("<div></div>").attr("class", "g-tips-block2").css(css).appendTo("body") };
        $block.html(msg).hide().show(100,function() { setTimeout(function() { $block.hide(); }, 300); });
    }
};
Tips2 = { timer: null, $el: null };
Tips2.Show = function(content, offset, arcls) {
    var _self = this;
    _self.$el != null && _self.RunHide();
    $tipsBlock = $('<div class="g-poptips"><div class="bd"></div><div class="ar"><em>◆</em><span>◆</span></div></div>').appendTo("body");
    $tipsBlock.mouseenter(function() { clearTimeout(_self.timer); }).mouseleave(function() { _self.Hide(); })

    $tipsBlock.find(".bd").html(content);
    $tipsBlock.find(".ar").attr("class", "ar " + arcls);
    $tipsBlock.css({ left: offset.left, top: offset.top }).show();
    _self.$el = $tipsBlock;
};
Tips2.Hide = function() {
    if (this.$el == null) { return; }
    var _self = this, $tipsBlock = this.$el;
    _self.timer = setTimeout(function() { _self.RunHide(); }, 300);
}
Tips2.RunHide = function() {
    this.$el.remove(); this.$el = null;
}

var tipsBlock = { timer: null };
tipsBlock.Show = function($target) {
    tipsBlock.timer != null && clearTimeout(tipsBlock.timer);
    var $tipsBlock = $(".g-tips-block");
    if ($tipsBlock.length == 0) {
        $tipsBlock = $('<div class="g-tips-block"><div class="close"></div><div class="title"></div><p></p><div class="logo-sj6-b"></div></div>').appendTo("body");
        $tipsBlock.find(".close").click(function() { $tipsBlock.hide(); });
        $tipsBlock.mouseenter(function() { clearTimeout(tipsBlock.timer); }).mouseleave(function() { tipsBlock.Hide(); })
    }

    $tipsBlock.find(".title").html($target.attr("data-title"));
    $tipsBlock.find("p").html($target.attr("data-content"));

    var top = $target.offset().top, left = $target.offset().left;
    top -= $tipsBlock.innerHeight() + 20;
    left -= parseInt($tipsBlock.innerWidth() / 2, 10);

    var of = $target.attr("data-offset");
    if (typeof of != "undefined" && of != "") {
        var _of = of.split("|");
        left += parseInt(_of[0], 10);
        top += parseInt(_of[1], 10);
    }

    $tipsBlock.css({ top: top, left: left }).show();

    tipsBlock.$el = $target;
};
tipsBlock.Hide = function() {
    var $tipsBlock = $(".g-tips-block");
    tipsBlock.timer = setTimeout(function() { $tipsBlock.hide(); tipsBlock.$el = null; }, 300);
}
$("[data-showtips='true']").mouseenter(function (e) {
    tipsBlock.Show($(e.currentTarget));
}).mouseleave(function () {
    tipsBlock.Hide();
});



//#region document.click
$(document).click(function (event) {//For popup and window.open
    var srcElement;

    if (event.srcElement) {
        srcElement = event.srcElement;
    }
    else {
        srcElement = event.target;
    }

    if (srcElement.tagName.toLowerCase() != "a") {
        srcElement = $(srcElement).parent()[0];
    }

    if (typeof srcElement == "undefined") return;

    if (srcElement.tagName && srcElement.tagName.toLowerCase() == "a") {
        var par = $(srcElement).attr("data-window");
        var tokens;

        if (par) {
            event.preventDefault();
            tokens = par.split("|"); //myaccount|974|600|a-l|please click this button after you login
            if (tokens[3] && tokens[3] == "a-l") {//after login
                if (!$("body").hasClass("login")) {
                    dialog.error(l.Message, tokens[4]);
                    return;
                }
            }
            openWindow($(srcElement).attr("href"), tokens[0], tokens[1], tokens[2]);
            return false;
        }

        par = $(srcElement).attr("data-dialog");

        if (par) {
            event.preventDefault();
            tokens = par.split("|"); //Join Us|974|600|a-l|please click this button after you login
            if (tokens[3] && tokens[3] == "a-l") {//after login
                if (!$("body").hasClass("login")) {
                    dialog.error(l.Message, tokens[4]);
                    return;
                }
            }

            var html=$($(srcElement).attr("href")).html();

            showPopUp(html, tokens[0], tokens[1], tokens[2]);
            $(".ui-dialog").i18n();
            $(srcElement).trigger("show");
            return false;
        }
    }
});
//#endregion



$(document).on("click","#phone-btn-1",function(){
    var tmpl = doT.template($("#t-phone2").html())({
        phone:13517341111
    })
    $("#bindphone-content").html(tmpl)
    return false;
})

$(document).on("click","#phone-btn-2",function(){
    var tmpl = doT.template($("#t-phone3").html())({

    })
    $("#bindphone-content").html(tmpl)
    return false;
})


//邮箱
$(document).on("show",".mail-show",function(){
    $("#bindForm").validate($.extend({},validBase,{
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        messages:{
            email: {
                email: $.t("center:js.1")
            }
        }
    }));
})
$(document).on("click","#mail-btn-1",function(){
    if($("#bindForm").valid()){

        $.post('/sidCustInfo/getEmailCode',{
            emailAddress:$("#email").val()
        },function(result){
            resultHandle(result)
        })

        var tmpl = doT.template($("#t-mail2").html())({
            mail:$("#email").val()
        })
        $("#bind-email").html(tmpl).i18n()


        $("#bindForm").validate($.extend({},validBase,{
            rules: {
                captcha: {
                    required: true
                }
            }
        }));


        captchaTime()


        return false;
    }
})

$(document).on("click",".btn-captcha",function(){

    if($(this).data("d")=="0"){
        $.post('/sidCustInfo/getEmailCode',{
            emailAddress:$("#current-email").html()
        },function(result){
            resultHandle(result,function(){
                dialog.info($.t("center:js.2"));
                $(".btn-captcha").data("d","1");
                captchaTime()
            })
        });
    }
})

$(document).on("click","#mail-btn-2",function(){
    if($("#bindForm").valid()){

        $.post("/sidCustInfo/bindEmail",{
            emailAddress:$("#current-email").html(),
            emailCode:$("#captcha").val()
        },function(result){
            resultHandle(result,function(){
                var tmpl = doT.template($("#t-mail3").html())({
                })
                $("#bind-email").html(tmpl).i18n()
            })
        })
    }
    return false;
})

function closeForm(){
    location.reload();
}

function captchaTime(){
    $('.btn-captcha').countdown(new Date().getTime()+60000, function(event) {
           $(this).html(
                "("+event.strftime('%S')+")"+$.t("center:js.3")
           );
    }).on('finish.countdown', function(){
        $(this).html($.t("center:js.3")).data("d","0")
    });
}

$("#as-bindcard").click(function(){
    location.href=$(this).attr("href");
})

//刷新所有钱包
$(document).on("click",".btn-refresh-2",function(){
    var _this=$(this);
    $.get("/cashier/fresh",{
        type:_this.data("type")
    },function(result){
        resultHandle(result, function (result) {
            $(_this.data("ele")).text(result.obj);
        })
    })
})