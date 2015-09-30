var afterTranCore, getQueryString, isLogin, openWindow, resultHandle, showError, showPopUp, validBase;

afterTranCore = function() {
  var Button, Plugin, hmTime, lngTime, login_pt, old;
  login_pt = function() {
    iapiSetCallout("Login", function(result) {
      console.log(result);
      if (result.errorCode) {
        return dialog.info("PT游戏登录失败，请联系在线客服，错误信息:" + (result.playerMessage || result.errorText));
      } else {
        return $.cookie("pt_status", "true");
      }
    });
    return iapiLogin("IG99TEST50", "123456", 1, "zh-cn");
  };
  Plugin = function(option) {
    return this.each(function() {
      var $this, data, options;
      $this = $(this);
      data = $this.data("bs.button");
      options = typeof option === "object" && option;
      if (!data) {
        $this.data("bs.button", (data = new Button(this, options)));
      }
      if (option === "toggle") {
        return data.toggle();
      } else {
        if (option) {
          return data.setState(option);
        }
      }
    });
  };
  lngTime = void 0;
  $(".language,.page-header-language").hoverIntent((function() {
    $(this).find(".language-list").show();
    return clearTimeout(lngTime);
  }), function() {
    var _this;
    _this = $(this);
    clearTimeout(lngTime);
    return lngTime = setTimeout(function() {
      return _this.find(".language-list").hide();
    }, 200);
  });
  $(".language-list").mouseenter(function() {
    return clearTimeout(lngTime);
  }).mouseleave(function() {
    return $(this).fadeOut(200);
  });
  $(".header-login-con").keyup(function(e) {
    if (e.keyCode === 13) {
      return $(this).find(".header-login").click();
    }
  });
  $(".header-login").click(function() {
    var code, form, password, username;
    form = $(".header-form");
    username = form.find("[name=username]").val();
    password = form.find("[name=password]").val();
    code = form.find("[name=validateCode]").val();
    if (username.length === 0) {
      dialog.info($.t("base:valid.1"));
      return false;
    }
    if (password.length === 0) {
      dialog.info($.t("base:valid.2"));
      return false;
    }
    if (code.length === 0) {
      dialog.info($.t("base:valid.3"));
      return false;
    }
    $(this).commit($(".header-form"), "/login", (function() {
      $.cookie("pt_status", "false");
      return location.reload();
    }), (function(data) {
      return $.extend({}, data, {
        custCode: username,
        passwd: password
      });
    }), null, function() {
      return $(".header-code").trigger("click").prev().val("");
    });
    return false;
  });
  $(document).on("click", ".header-code", function() {
    return $(this).attr("src", "/validateCode?" + new Date().getTime());
  });
  $(".header-more-left").css("left", function() {
    return -($(window).width() - 980) / 2;
  });
  $(".header-more-right").css("right", function() {
    return -($(window).width() - 980) / 2;
  });
  hmTime = void 0;
  $(document).on("mouseenter", ".header .link", function() {
    clearTimeout(hmTime);
    $(".header-block:visible").hide();
    return $(this).parent().find(".header-block").stop().fadeIn();
  }).on("mouseleave", ".header li", function() {
    var _this;
    _this = $(this);
    return hmTime = setTimeout(function() {
      return _this.parent().find(".header-block").stop().fadeOut();
    }, 200);
  });
  $(document).on("mouseenter", ".header-block", function() {
    clearTimeout(hmTime);
    return $(this).show();
  }).on("mouseleave", ".header-block", function() {
    return $(this).stop().fadeOut();
  });
  $(document).on("click", ".browser-updatetips span", function() {
    return $(this).parents(".browser-updatetips").remove();
  });
  if ($("#user_status").text()) {
    if ($.cookie("pt_status") === "false") {
      login_pt();
    }
  } else {
    $.cookie("pt_status", "false");
  }
  $.validator.addMethod("chinese", (function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9\u4E00-\u9FA5]+$/.test(value);
  }), $.t("base:valid.4"));
  $.validator.addMethod("string", (function(value, element) {
    return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
  }), $.t("base:valid.5"));
  $.validator.addMethod("zh", (function(value, element) {
    return this.optional(element) || /^[A-Za-z\u4E00-\u9FA5]+$/.test(value);
  }), $.t("base:valid.6"));
  $.validator.addMethod("en", (function(value, element) {
    return this.optional(element) || /^[A-Za-z]+$/.test(value);
  }), $.t("base:valid.7"));
  $.validator.addMethod("date", (function(value, element) {
    return this.optional(element) || /^\d{4}-\d{2}-\d{2}$/.test(value);
  }), $.t("base:valid.8"));
  $.validator.addMethod("qq", (function(value, element) {
    return this.optional(element) || /^\d{5,12}$/.test(value);
  }), $.t("base:valid.9"));
  $.validator.addMethod("phone", (function(value, element) {
    return this.optional(element) || /^\d{11,16}$/.test(value);
  }), $.t("base:valid.10"));
  $.validator.addMethod("cardno", (function(value, element) {
    return this.optional(element) || /^\S{9,18}$/.test(value);
  }), $.t("base:valid.11"));
  $.validator.addMethod("notEqual", (function(value, element, param) {
    var target;
    target = $(param);
    return value !== target.val();
  }), $.t("base:valid.12"));
  $.fn.extend({
    form: function() {
      var item, obj, result;
      obj = this.serializeArray();
      result = {};
      for (item in obj) {
        result[obj[item].name] = filterXSS(obj[item].value);
      }
      return result;
    },
    commit: function(form, url, func, func2, func3, funcError) {
      var _this, data;
      if (form.valid()) {
        if (func2) {
          if (!func2()) {
            return false;
          }
        }
        _this = $(this);
        _this.btn("loading");
        data = form.form();
        if (func3) {
          data = func3(data);
        }
        return $.post(url, data).success(function(result) {
          if (result.code === "200") {
            func(result);
          } else {
            showError(result.msg);
            if (funcError) {
              funcError();
            }
          }
          return _this.btn("reset");
        });
      }
    },
    commitWithError: function(form, url, func, func2) {
      var _this, data;
      if (form.valid()) {
        _this = $(this);
        _this.btn("loading");
        data = form.form();
        return $.post(url, data).success(function(result) {
          if (result.code === "200") {
            func(result);
          } else {
            if (func2) {
              func2();
            }
            showError(result.msg);
          }
          return _this.btn("reset");
        });
      }
    }
  });
  Button = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    return this.isLoading = false;
  };
  Button.DEFAULTS = {
    loadingText: $.t("base:valid.13")
  };
  Button.prototype.setState = function(state) {
    var $el, d, data, val;
    d = "disabled";
    $el = this.$element;
    val = ($el.is("input") ? "val" : "html");
    data = $el.data();
    state += "Text";
    if (data.resetText == null) {
      $el.data("resetText", $el[val]());
    }
    return setTimeout($.proxy(function() {
      $el[val]((data[state] == null ? this.options[state] : data[state]));
      if (state === "loadingText") {
        this.isLoading = true;
        return $el.addClass(d).attr(d, d);
      } else if (this.isLoading) {
        this.isLoading = false;
        return $el.removeClass(d).removeAttr(d);
      }
    }, this), 0);
  };
  old = $.fn.button;
  $.fn.btn = Plugin;
  $.fn.btn.Constructor = Button;
  $.fn.btn.noConflict = function() {
    $.fn.btn = old;
    return this;
  };
  window.dialog = {
    openned: false,
    close: function() {
      window.top.$("#dialog").dialog("close").remove();
      return dialog.openned = false;
    },
    _getHTML: function(htmlArray) {
      if (htmlArray.join) {
        return "<div class='msg'><p>" + htmlArray.join("</p><p>") + "</p></div>";
      } else {
        return "<div class='msg'><p>" + htmlArray + "</p></div>";
      }
    },
    _show: function(title, messageHtml, buttons) {
      var $div, _buttons;
      _buttons = void 0;
      if (buttons.each) {
        _buttons = {};
        buttons.each(function() {
          var href;
          href = $(this).attr("href");
          return _buttons[$(this).html()] = function() {
            return window.location.href = href;
          };
        });
      } else {
        _buttons = buttons;
      }
      dialog.close();
      $div = window.top.$("<div id=\"dialog\"></div>");
      $div.html("<div class=\"field-c\">" + messageHtml + "</div>");
      $div.dialog({
        resizable: false,
        modal: true,
        buttons: _buttons,
        title: title,
        dialogClass: "dialog",
        minWidth: 360,
        minHeight: 200
      });
      return dialog.openned = true;
    },
    info: function(messageHtml, func) {
      var buttons;
      buttons = {};
      if (!func) {
        buttons[$.t("base:button.ok")] = function() {
          return dialog.close();
        };
      } else {
        buttons[$.t("base:button.ok")] = function() {
          func();
          return dialog.close();
        };
      }
      return dialog._show($.t("base:button.info"), "<span class=\"icon true\"></span>" + dialog._getHTML(messageHtml), buttons);
    },
    error: function(messageHtml, buttons) {
      if (buttons == null) {
        buttons = {};
        buttons[$.t("base:button.ok")] = function() {
          return dialog.close();
        };
      }
      return dialog._show($.t("base:button.error"), "<span class=\"icon error\"></span>" + dialog._getHTML(messageHtml), buttons);
    },
    custom: function(title, messageHtml, buttons) {
      return dialog._show(title, "<span class=\"icon confirm\"></span>" + dialog._getHTML(messageHtml), buttons);
    }
  };
  if ($("#user-multiple").val()) {
    return dialog.info($("#user-multiple").val());
  }
};

showError = function(text) {
  return dialog.error($.t("base:msg." + text));
};

getQueryString = function(name) {
  var r, reg;
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};

resultHandle = function(result, func) {
  if (result.code === "200") {
    if (func) {
      return func(result);
    }
  } else {
    return showError(result.msg);
  }
};

openWindow = function(openUrl, openName, openWidth, openHeight, openLeft, openTop) {
  var height, left, name, top, url, width;
  url = openUrl;
  name = openName;
  width = openWidth;
  height = openHeight;
  left = (String(openLeft) === "" ? (window.screen.availWidth - 10 - openWidth) / 2 : openLeft);
  top = (String(openTop) === "" ? (window.screen.availHeight - 40 - openHeight) / 2 : openTop);
  return window.open(url, name, "depended=yes,resizable=yes,width=" + width + ",height=" + height + ",left=" + left + ",top=" + top);
};

isLogin = function() {
  if ($("#user_status").text()) {
    return true;
  } else {
    dialog.info($.t("base:login_text"));
    return false;
  }
};

showPopUp = function(html, title, width, height, closefn) {
  var $div;
  $("#popup").remove();
  $div = window.top.$("<div id=\"popup\"></div>");
  $div.html(html);
  $div.css("width", width);
  $div.find("iframe").css("width", width);
  return $div.dialog({
    height: height,
    width: width,
    resizable: false,
    modal: true,
    title: title,
    dialogClass: "popup",
    close: closefn
  });
};

validBase = {
  debug: true,
  success: function(label) {
    return label.addClass("success");
  },
  unhighlight: function(element) {
    $(element).parent().addClass("ok").removeClass("red");
    if (!$(element).parent().find("b").length) {
      return $(element).parent().append("<b></b>");
    }
  },
  highlight: function(element, errorClass) {
    $(element).parent().addClass("red").removeClass("ok").find("." + errorClass).removeClass("success");
    if (!$(element).parent().find("b").length) {
      return $(element).parent().append("<b></b>");
    }
  },
  errorPlacement: function(error, element) {
    return error.appendTo(element.parent());
  }
};
