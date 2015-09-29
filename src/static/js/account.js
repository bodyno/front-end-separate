var Tips, Tips2, captchaTime, closeForm, tipsBlock;

closeForm = function() {
  return location.reload();
};

captchaTime = function() {
  return $(".btn-captcha").countdown(new Date().getTime() + 60000, function(event) {
    return $(this).html("(" + event.strftime("%S") + ")" + $.t("center:js.3"));
  }).on("finish.countdown", function() {
    return $(this).html($.t("center:js.3")).data("d", "0");
  });
};

$(function() {
  var i, p, popTime, t, temp;
  temp = 110;
  if ($(".illustration").length) {
    temp = 52;
  }
  $(".dial").knob({
    width: temp,
    height: temp,
    lineCap: "round",
    thickness: ".1",
    angleOffset: 180,
    readOnly: true,
    displayInput: false,
    fgColor: "#009b72",
    bgColor: "#a6ccc2"
  });
  p = $("#info-complete").attr("data-complete");
  i = 0;
  t = setInterval(function() {
    i += 5;
    if (i >= p) {
      i = p;
      clearInterval(t);
    }
    $(".dial").val(i).trigger("change");
    return $("#info-complete").html(i + "%");
  }, 30);
  popTime = void 0;
  $(".a-t-n-i").mouseenter(function() {
    $(".a-t-pop").hide();
    $(this).parent().find(".a-t-pop").show();
    return clearTimeout(popTime);
  }).mouseleave(function() {
    clearTimeout(popTime);
    return popTime = setTimeout(function() {
      return $(".a-t-pop").hide();
    }, 200);
  });
  $(".a-t-pop").mouseenter(function() {
    return clearTimeout(popTime);
  }).mouseleave(function() {
    return $(this).hide();
  });
  return $(document).on("click", ".a-t-pop .close", function() {
    return $(this).parent().hide();
  });
});

Tips = {
  Show: function(msg, css) {
    var $block;
    $block = $(".g-tips-block2");
    if ($block.length === 0) {
      $block = $("<div></div>").attr("class", "g-tips-block2").css(css).appendTo("body");
    }
    return $block.html(msg).hide().show(100, function() {
      return setTimeout((function() {
        return $block.hide();
      }), 300);
    });
  }
};

Tips2 = {
  timer: null,
  $el: null
};

Tips2.Show = function(content, offset, arcls) {
  var $tipsBlock, _self;
  _self = this;
  (_self.$el != null) && _self.RunHide();
  $tipsBlock = $("<div class=\"g-poptips\"><div class=\"bd\"></div><div class=\"ar\"><em>◆</em><span>◆</span></div></div>").appendTo("body");
  $tipsBlock.mouseenter(function() {
    return clearTimeout(_self.timer);
  }).mouseleave(function() {
    return _self.Hide();
  });
  $tipsBlock.find(".bd").html(content);
  $tipsBlock.find(".ar").attr("class", "ar " + arcls);
  $tipsBlock.css({
    left: offset.left,
    top: offset.top
  }).show();
  return _self.$el = $tipsBlock;
};

Tips2.Hide = function() {
  var $tipsBlock, _self;
  if (this.$el == null) {
    return;
  }
  _self = this;
  $tipsBlock = this.$el;
  return _self.timer = setTimeout(function() {
    return _self.RunHide();
  }, 300);
};

Tips2.RunHide = function() {
  this.$el.remove();
  return this.$el = null;
};

tipsBlock = {
  timer: null
};

tipsBlock.Show = function($target) {
  var $tipsBlock, _of, left, of_, top;
  (tipsBlock.timer != null) && clearTimeout(tipsBlock.timer);
  $tipsBlock = $(".g-tips-block");
  if ($tipsBlock.length === 0) {
    $tipsBlock = $("<div class=\"g-tips-block\"><div class=\"close\"></div><div class=\"title\"></div><p></p><div class=\"logo-sj6-b\"></div></div>").appendTo("body");
    $tipsBlock.find(".close").click(function() {
      return $tipsBlock.hide();
    });
    $tipsBlock.mouseenter(function() {
      return clearTimeout(tipsBlock.timer);
    }).mouseleave(function() {
      return tipsBlock.Hide();
    });
  }
  $tipsBlock.find(".title").html($target.attr("data-title"));
  $tipsBlock.find("p").html($target.attr("data-content"));
  top = $target.offset().top;
  left = $target.offset().left;
  top -= $tipsBlock.innerHeight() + 20;
  left -= parseInt($tipsBlock.innerWidth() / 2, 10);
  of_ = $target.attr("data-offset");
  if (typeof of_ !== "undefined" && of_ !== "") {
    _of = of_.split("|");
    left += parseInt(_of[0], 10);
    top += parseInt(_of[1], 10);
  }
  $tipsBlock.css({
    top: top,
    left: left
  }).show();
  return tipsBlock.$el = $target;
};

tipsBlock.Hide = function() {
  var $tipsBlock;
  $tipsBlock = $(".g-tips-block");
  return tipsBlock.timer = setTimeout(function() {
    $tipsBlock.hide();
    return tipsBlock.$el = null;
  }, 300);
};

$("[data-showtips='true']").mouseenter(function(e) {
  return tipsBlock.Show($(e.currentTarget));
}).mouseleave(function() {
  return tipsBlock.Hide();
});

$(document).click(function(event) {
  var html, par, srcElement, tokens;
  srcElement = void 0;
  if (event.srcElement) {
    srcElement = event.srcElement;
  } else {
    srcElement = event.target;
  }
  if (srcElement.tagName.toLowerCase() !== "a") {
    srcElement = $(srcElement).parent()[0];
  }
  if (typeof srcElement === "undefined") {
    return;
  }
  if (srcElement.tagName && srcElement.tagName.toLowerCase() === "a") {
    par = $(srcElement).attr("data-window");
    tokens = void 0;
    if (par) {
      event.preventDefault();
      tokens = par.split("|");
      if (tokens[3] && tokens[3] === "a-l") {
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
      tokens = par.split("|");
      if (tokens[3] && tokens[3] === "a-l") {
        if (!$("body").hasClass("login")) {
          dialog.error(l.Message, tokens[4]);
          return;
        }
      }
      html = $($(srcElement).attr("href")).html();
      showPopUp(html, tokens[0], tokens[1], tokens[2]);
      $(".ui-dialog").i18n();
      $(srcElement).trigger("show");
      return false;
    }
  }
});

$(document).on("click", "#phone-btn-1", function() {
  var tmpl;
  tmpl = doT.template($("#t-phone2").html())({
    phone: 13517341111
  });
  $("#bindphone-content").html(tmpl);
  return false;
});

$(document).on("click", "#phone-btn-2", function() {
  var tmpl;
  tmpl = doT.template($("#t-phone3").html())({});
  $("#bindphone-content").html(tmpl);
  return false;
});

$(document).on("show", ".mail-show", function() {
  return $("#bindForm").validate($.extend({}, validBase, {
    rules: {
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      email: {
        email: $.t("center:js.1")
      }
    }
  }));
});

$(document).on("click", "#mail-btn-1", function() {
  var tmpl;
  if ($("#bindForm").valid()) {
    $.post("/sidCustInfo/getEmailCode", {
      emailAddress: $("#email").val()
    }, function(result) {
      return resultHandle(result);
    });
    tmpl = doT.template($("#t-mail2").html())({
      mail: $("#email").val()
    });
    $("#bind-email").html(tmpl).i18n();
    $("#bindForm").validate($.extend({}, validBase, {
      rules: {
        captcha: {
          required: true
        }
      }
    }));
    captchaTime();
    return false;
  }
});

$(document).on("click", ".btn-captcha", function() {
  if ($(this).data("d") === "0") {
    return $.post("/sidCustInfo/getEmailCode", {
      emailAddress: $("#current-email").html()
    }, function(result) {
      return resultHandle(result, function() {
        dialog.info($.t("center:js.2"));
        $(".btn-captcha").data("d", "1");
        return captchaTime();
      });
    });
  }
});

$(document).on("click", "#mail-btn-2", function() {
  if ($("#bindForm").valid()) {
    $.post("/sidCustInfo/bindEmail", {
      emailAddress: $("#current-email").html(),
      emailCode: $("#captcha").val()
    }, function(result) {
      return resultHandle(result, function() {
        var tmpl;
        tmpl = doT.template($("#t-mail3").html())({});
        return $("#bind-email").html(tmpl).i18n();
      });
    });
  }
  return false;
});

$("#as-bindcard").click(function() {
  return location.href = $(this).attr("href");
});

$(document).on("click", ".btn-refresh-2", function() {
  var _this;
  _this = $(this);
  return $.get("/cashier/fresh", {
    type: _this.data("type")
  }, function(result) {
    return resultHandle(result, function(result) {
      return $(_this.data("ele")).text(result.obj);
    });
  });
});
