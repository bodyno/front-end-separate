function afterTranCore(){

    var lngTime;
    //语言
    $(".language,.page-header-language").hoverIntent(function(){
        $(this).find(".language-list").show();
        clearTimeout(lngTime);
    },function(){
        var _this=$(this)
        clearTimeout(lngTime);
        lngTime=setTimeout(function(){
            _this.find(".language-list").hide();
        },200)
    })

    $(".language-list").mouseenter(function(){
        clearTimeout(lngTime);
    }).mouseleave(function(){
        $(this).fadeOut(200)
    })

    $(".header-login-con").keyup(function(e){
        if(e.keyCode==13){
            $(this).find(".header-login").click();
        }
    })
    $(".header-login").click(function(){
        var form=$(".header-form");
        var username=form.find("[name=custCode]").val();
        var password=form.find("[name=passwd]").val();
        var code=form.find("[name=validateCode]").val();

        if(username.length==0){
            dialog.info($.t("base:valid.1"));
            return false;
        }
        if(password.length==0){
            dialog.info($.t("base:valid.2"));
            return false;
        }
        if(code.length==0){
            dialog.info($.t("base:valid.3"));
            return false;
        }

        $(this).commit(form,"/login",function(){
            location.reload()
        })



    })

    $(document).on("click",".header-code",function(){
        $(this).attr("src","/validateCode?"+new Date().getTime())
    })

    $(".header-more-left").css("left",function(){
        return -($(window).width()-980)/2
    })
    $(".header-more-right").css("right",function(){
        return -($(window).width()-980)/2
    })

    //下拉menu
    var hmTime;
    $(document).on("mouseenter",".header .link",function(){
        clearTimeout(hmTime);
        $(".header-block:visible").hide();
        $(this).parent().find(".header-block").stop().fadeIn();
    }).on("mouseleave",".header li",function(){
        var _this=$(this);
        hmTime=setTimeout(function(){
            _this.parent().find(".header-block").stop().fadeOut();
        },200)
    })

    $(document).on("mouseenter",".header-block",function(){
        clearTimeout(hmTime)
        $(this).show();
    }).on("mouseleave",".header-block",function(){
        $(this).stop().fadeOut();
    })

    $(document).on("click",".browser-updatetips span",function(){
        $(this).parents(".browser-updatetips").remove();
    })


    $.validator.addMethod("chinese", function(value, element) {
        return this.optional(element) || /^[A-Za-z0-9\u4E00-\u9FA5]+$/.test(value);
    }, $.t("base:valid.4"));

    $.validator.addMethod("string", function(value, element) {
        return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
    }, $.t("base:valid.5"));

    $.validator.addMethod("zh", function(value, element) {
        return this.optional(element) || /^[A-Za-z\u4E00-\u9FA5]+$/.test(value);
    }, $.t("base:valid.6"));

    $.validator.addMethod("en", function(value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, $.t("base:valid.7"));

    $.validator.addMethod("date", function(value, element) {
        return this.optional(element) || /^\d{4}-\d{2}-\d{2}$/.test(value);
    }, $.t("base:valid.8"));

    $.validator.addMethod("qq", function(value, element) {
        return this.optional(element) || /^\d{5,12}$/.test(value);
    }, $.t("base:valid.9"));

    $.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^\d{12,16}$/.test(value);
    }, $.t("base:valid.10"));

    $.validator.addMethod("cardno", function(value, element) {
        return this.optional(element) || /^\S{9,18}$/.test(value);
    }, $.t("base:valid.11"));

    $.validator.addMethod("notEqual", function(value, element, param) {
        var target = $( param );
        return value !== target.val();
    }, $.t("base:valid.12"));

    $.fn.extend({
        /*form转json*/
        form:function(){
            var obj=this.serializeArray(),
                result={};
            for(var item in obj){
                result[obj[item].name]=filterXSS(obj[item].value);
            }
            return result;
        },
        commit:function(form,url,func,func2,func3){
            if(form.valid()){
                if(func2){
                    if(!func2()) return false
                }
                var _this=$(this)
                _this.btn("loading")
                var data=form.form();
                if(func3){
                    data = func3(data);
                }
                $.post(url,data).success(function(result){
                    if(result.code=="200"){
                        func(result)
                    }else{
                        showError(result.msg)
                    }
                    _this.btn("reset")
                })
            }
        }
    })

    /*button禁用*/
    var Button = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.DEFAULTS = {
        loadingText: $.t("base:valid.13")
    }

    Button.prototype.setState = function (state) {
        var d    = 'disabled'
        var $el  = this.$element
        var val  = $el.is('input') ? 'val' : 'html'
        var data = $el.data()

        state += 'Text'

        if (data.resetText == null) $el.data('resetText', $el[val]())

        // push to event loop to allow forms to submit
        setTimeout($.proxy(function () {
            $el[val](data[state] == null ? this.options[state] : data[state])

            if (state == 'loadingText') {
                this.isLoading = true
                $el.addClass(d).attr(d, d)
            } else if (this.isLoading) {
                this.isLoading = false
                $el.removeClass(d).removeAttr(d)
            }
        }, this), 0)
    }

    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.button')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.button', (data = new Button(this, options)))

            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    var old = $.fn.button

    $.fn.btn             = Plugin
    $.fn.btn.Constructor = Button

    $.fn.btn.noConflict = function () {
        $.fn.btn = old
        return this
    }

    dialog = {
        openned: false,
        //#region close
        close: function () {
            window.top.$('#dialog').dialog("close").remove();
            dialog.openned = false;
        }

        , _getHTML: function (htmlArray) {
            if (htmlArray.join) {
                return "<div class='msg'><p>" + htmlArray.join("</p><p>") + "</p></div>";
            }
            else {
                return "<div class='msg'><p>" + htmlArray + "</p></div>";
            }
        }

        , _show: function (title, messageHtml, buttons) {
            var _buttons;
            if (buttons.each) {
                _buttons = {};
                buttons.each(function () {
                    var href = $(this).attr("href");
                    _buttons[$(this).html()] = function () {
                        window.location.href = href;
                    };
                });
            }
            else {
                _buttons = buttons;
            }
            dialog.close();
            var $div = window.top.$('<div id="dialog"></div>');
            $div.html('<div class="field-c">' + messageHtml + '</div>');
            $div.dialog({
                resizable: false,
                modal: true,
                buttons: _buttons,
                title: title,
                dialogClass: 'dialog',
                minWidth: 360,
                minHeight: 200
            });
            dialog.openned = true;
        },

        info: function (messageHtml, func) {
            buttons = {};
            if(!func){
                buttons[$.t("base:button.ok")] = function () { dialog.close(); };
            }else{
                buttons[$.t("base:button.ok")] = function () {
                    func()
                    dialog.close();
                };
            }
            dialog._show($.t("base:button.info"), '<span class="icon true"></span>' + dialog._getHTML(messageHtml), buttons);
        },

        error: function (messageHtml, buttons) {
            if (buttons == null) {
                buttons = {};
                buttons[$.t("base:button.ok")] = function () { dialog.close(); };
            }
            dialog._show($.t("base:button.error"), '<span class="icon error"></span>' + dialog._getHTML(messageHtml), buttons);
        },

        custom: function (title, messageHtml, buttons) {
            dialog._show(title, '<span class="icon confirm"></span>' + dialog._getHTML(messageHtml), buttons);
        }
    };


}
//ajax显示错误信息
function showError(text){
    dialog.error($.t("base:msg."+text));
}

var dialog;

function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function resultHandle(result,func){
    if(result.code=="200"){
        if(func){
            func(result)
        }
    }else{
        showError(result.msg)
    }
}

var showPopUp = function(html, title, width, height, closefn) {
    $("#popup").remove();
    var $div = window.top.$('<div id="popup"></div>');
    $div.html(html);
    $div.css("width", width);
    $div.find("iframe").css("width", width);
    $div.dialog({
        height: height,
        width: width,
        resizable: false,
        modal: true,
        title: title,
        dialogClass: 'popup',
        close: closefn
    });
}

var validBase={
    debug:true,
    success: function(label) {
        label.addClass("success");
    },
    unhighlight:function(element){
        $(element).parent().addClass("ok").removeClass("red");
        if(!$(element).parent().find("b").length){
            $(element).parent().append("<b></b>")
        }
    },
    highlight: function(element, errorClass) {
        $(element).parent().addClass("red").removeClass("ok").find("." + errorClass).removeClass("success");
        if(!$(element).parent().find("b").length){
            $(element).parent().append("<b></b>")
        }
    },
    errorPlacement:function(error, element) {
        error.appendTo(element.parent());
    }
}