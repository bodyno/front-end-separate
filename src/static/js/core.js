$(function(){

    /*logo处理*/
    if(localStorage.getItem("logo")){
        $(".logo").html(localStorage.getItem("logo"))
    }else{
        $(".logo a").css("display","block");
    }

    /*时钟*/
    var tempTimeEle=$(".header .time span");
    tempTimeEle.parent().show();
    tempTimeEle.text(moment().format("YYYY-M-D hh:mm:ss"))
    setInterval(function(){
        tempTimeEle.text(moment().format("YYYY-M-D hh:mm:ss"))
    },1000)

    /*logo跳转*/
    $(".logo").click(function(){
        var tempurl=$(this).children().attr("href");
        if(tempurl){
            location.href=url
        }else{

        }
    })

})

/*form转json*/
function toObj(ele){
    var obj=ele.serializeArray(),
        result={};
    for(var item in obj){
        result[obj[item].name]=filterXSS(obj[item].value);
    }
    return result;
}

//ajax显示错误信息
function showError(text){
    dialog.error('错误', $.t("base:msg."+text));
}

/*button禁用*/
+function ($) {
    'use strict';

    // BUTTON PUBLIC CLASS DEFINITION
    // ==============================

    var Button = function (element, options) {
        this.$element  = $(element)
        this.options   = $.extend({}, Button.DEFAULTS, options)
        this.isLoading = false
    }

    Button.DEFAULTS = {
        loadingText: '处理中...'
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

    // BUTTON PLUGIN DEFINITION
    // ========================

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


    // BUTTON NO CONFLICT
    // ==================

    $.fn.btn.noConflict = function () {
        $.fn.btn = old
        return this
    }

}(jQuery);

//#region dialog
var dialog = {
    openned: false,
    //#region close
    close: function () {
        window.top.$('#dialog').dialog("close").remove();
        dialog.openned = false;
    }
    //#endregion

    //#region _getHTML
    , _getHTML: function (htmlArray) {
        if (htmlArray.join) {
            return "<div class='msg'><p>" + htmlArray.join("</p><p>") + "</p></div>";
        }
        else {
            return "<div class='msg'><p>" + htmlArray + "</p></div>";
        }
    }
    //#endregion

    //#region _show
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
    //#endregion

    //#region info
    info: function (title, messageHtml, buttons) {
        if (messageHtml == null) {
            messageHtml = l.UpdatedSuccess;
        }
        if (buttons == null) {
            buttons = {};
            buttons["确定"] = function () { dialog.close(); };
        }
        dialog._show(title, '<span class="icon true"></span>' + dialog._getHTML(messageHtml), buttons);
    },
    //#endregion

    //#region error
    error: function (title, messageHtml, buttons) {
        if (messageHtml == null) {
            messageHtml = l.UpdatedSuccess;
        }
        if (buttons == null) {
            buttons = {};
            buttons["确定"] = function () { dialog.close(); };
        }
        dialog._show(title, '<span class="icon error"></span>' + dialog._getHTML(messageHtml), buttons);
    },
    //#endregion

    //#region confirm
    confirm: function (title, messageHtml, buttons) {
        if (messageHtml == null) {
            messageHtml = l.UpdatedSuccess;
        }
        if (buttons == null) {
            buttons = {};
            buttons["确定"] = function () { dialog.close(); };
        }
        dialog._show(title, '<span class="icon confirm"></span>' + dialog._getHTML(messageHtml), buttons);
    }
    //#endregion
};
//#endregion