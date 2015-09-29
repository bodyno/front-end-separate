var afterTran;

afterTran = function() {
  var beginCount, bindProvince, checkAmount, companyData, companyValid, copy, moveBtn, moveStep, nextStepGoon, restoreCk;
  restoreCk = function() {
    var temp;
    temp = $(".deposit-item.active");
    temp.find(".radio-bank-3 .checked").find(":radio").prop("checked", "checked");
    return moveStep(temp.data("step"), true);
  };
  beginCount = function() {
    return $(".step-1 .time").countdown(new Date().getTime() + 1200000, function(event) {
      return $(this).html(event.strftime("%M") + ":" + event.strftime("%S"));
    }).on("finish.countdown", function() {
      $(".step-1").hide();
      return $(".step-2").show();
    });
  };
  moveBtn = function() {
    var amount, bank, tempP;
    tempP = $(".deposit-item.active");
    amount = tempP.find(".amount").val().length;
    bank = tempP.find(".radio-bank-3 .checked,.radio-bank .checked").length;
    if (amount && bank) {
      tempP.find(".btn-deposit-top").stop().animate({
        marginTop: "-36px"
      }, 200, "linear");
    } else {
      tempP.find(".btn-deposit-top").stop().animate({
        marginTop: "0px"
      }, 200, "linear");
    }
    if (amount && !isNaN(tempP.find(".amount").val())) {
      if (bank) {
        return moveStep("3");
      } else {
        return moveStep("2");
      }
    } else {
      return moveStep("1");
    }
  };
  moveStep = function(step, stop) {
    $("#step").removeAttr("class").addClass("step-" + step);
    if (!stop) {
      return $(".deposit-item.active").data("step", step);
    }
  };
  checkAmount = function() {
    var ele, val;
    ele = $(".deposit-item.active").find(".amount");
    val = ele.val();
    if (val.length = 0 || isNaN(val)) {
      dialog.info($.t("js.2"));
      return false;
    }
    if (val.length = 0 || isNaN(val)) {
      dialog.info($.t("js.3"));
      return false;
    }
    if (!/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(val)) {
      dialog.info($.t("js.4"));
      return false;
    }
    val = Number(val);
    if (val < ele.data("min")) {
      dialog.info($.t("js.5"));
      return false;
    }
    if (val > ele.data("max")) {
      dialog.info($.t("js.6"));
      return false;
    }
    return true;
  };
  copy = function() {
    var client;
    client = new ZeroClipboard($(".btn-copy"));
    return client.on("copy", function(event) {
      var clipboard;
      clipboard = event.clipboardData;
      clipboard.setData("text/plain", $(event.target).data("clipboard-text"));
      return client.on("afterCopy", function(event) {
        var offset;
        offset = $(event.currentTarget).offset();
        return Tips.Show($.t("js.7"), {
          top: offset.top + 30,
          left: offset.left + 60
        });
      });
    });
  };
  nextStepGoon = function() {
    var tmpl;
    tmpl = doT.template($("#deposit-company2").html())(companyData);
    $("#company-con3").html(tmpl).addClass("active").siblings().removeClass("active");
    $("#company-con3").i18n();
    bindProvince();
    return companyValid();
  };
  bindProvince = function() {
    $.get("/cashier/listProvince", function(result) {
      return resultHandle(result, function() {
        var html, i;
        html = [];
        result = result.obj;
        i = 0;
        while (i < result.length) {
          html.push("<option data-id=\"" + result[i].provinceid + "\" value=\"" + result[i].provincename + "\">" + result[i].provincename + "</option>");
          i++;
        }
        return $("#bankProvince option:eq(0)").after(html);
      });
    });
    return $("#bankProvince").change(function() {
      return $.get("/cashier/listCity", {
        provinceid: $("#bankProvince option:selected").data("id")
      }, function(result) {
        return resultHandle(result, function() {
          var html, i;
          html = [];
          result = result.obj;
          i = 0;
          while (i < result.length) {
            html.push("<option value=\"" + result[i].cityname + "\">" + result[i].cityname + "</option>");
            i++;
          }
          $("#bankCity option:not(:eq(0))").remove();
          return $("#bankCity option:eq(0)").after(html);
        });
      });
    });
  };
  companyValid = function() {
    return $("#company-form").validate($.extend({}, validBase, {
      rules: {
        name: {
          required: true
        },
        bankProvince: {
          required: true
        },
        bankCity: {
          required: true
        },
        validCode: {
          required: true
        }
      }
    }));
  };
  $(".deposit-tags li").click(function() {
    $(this).siblings().find("span").removeClass("on");
    $(this).find("span").addClass("on");
    $(".deposit-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    return restoreCk();
  });
  $(document).on("click", ".radio-bank", function() {
    $(this).find(":radio").prop("checked", "checked");
    $(this).find(">div").addClass("checked");
    $(this).parent().siblings().find(".radio-bank>div").removeClass("checked");
    return moveBtn();
  });
  $(document).on("click", ".radio-bank-3", function() {
    if ($(this).hasClass("c-bank")) {
      return false;
    }
    $(this).find(":radio").prop("checked", "checked");
    $(this).find(">div").addClass("checked");
    $(this).siblings().find(">div").removeClass("checked");
    return moveBtn();
  });
  $(document).on("keyup", ".deposit-item.active .amount", function() {
    return moveBtn();
  });
  $(document).on("click", ".step-2 .btn-blue", function() {
    return location.reload();
  });
  $(document).on("focus", ".deposit-item.active .amount", function() {
    return $(this).prev().hide();
  });
  $(document).on("blur", ".deposit-item.active .amount", function() {
    if (!$(this).val()) {
      return $(this).prev().show();
    }
  });
  $("body").on("click", ".third-party-use .more", function() {
    $(".third-banks").animate({
      height: "160px"
    }, 400, function() {
      return $(".third-party-use .collapse").show();
    });
    $(this).hide();
    return false;
  });
  $("body").on("click", ".third-party-use .collapse", function() {
    $(".third-banks").animate({
      height: "83px"
    }, 400, function() {
      return $(".third-party-use .more").slideDown();
    });
    $(this).hide();
    return false;
  });
  $(document).on("click", "#ThirdPaymentPay", function() {
    if (!checkAmount()) {
      return false;
    }
    return $.post("/cashier/deposit", {
      orderMoney: $(".deposit-item.active").find(".amount").val(),
      payId: $(".deposit-item.active").find(".bank-input:checked").val()
    }, function(result) {
      return resultHandle(result, function(result) {
        var tmpl;
        tmpl = doT.template($("#deposit-tmpl").html())();
        showPopUp(tmpl, $.t("js.1"), 700, 450, function() {});
        $(".ui-dialog").i18n();
        beginCount();
        return window.open(result.obj);
      });
    });
  });
  $(document).on("click", ".btnClose,.reload", function() {
    location.reload();
    return false;
  });
  $(document).on("click", "#payment-ali", function() {
    var tmpl;
    tmpl = doT.template($("#deposit-tmpl2").html())();
    showPopUp(tmpl, $.t("js.1"), 700, 450, function() {});
    return copy();
  });
  companyData = void 0;
  $("#c-btn").click(function() {
    if (!checkAmount()) {
      return false;
    }
    return $.get("/cashier/getFundInfo", {
      companyAcctId: $(".deposit-item.active").find(".bank-input:checked").val()
    }, function(result) {
      return resultHandle(result, function(result) {
        var tmpl;
        companyData = $.extend({}, result.obj, {
          money: $(".deposit-item.active .amount").val(),
          bankVal: $(".deposit-item.active").find(".bank-input:checked").val(),
          bank: $(".deposit-item.active").find(".bank-input:checked").data("bank")
        });
        tmpl = doT.template($("#deposit-company").html())(companyData);
        $("#company-con2").html(tmpl).addClass("active").siblings().removeClass("active");
        $("#company-con2").i18n();
        return copy();
      });
    });
  });
  $(document).on("click", "#c-btn-prev1", function() {
    return $(this).parents(".c-item").prev().addClass("active").siblings().removeClass("active");
  });
  $(document).on("click", "#c-btn-next1", function() {
    var _this;
    _this = $(this);
    _this.btn("loading");
    return $.get("/cashier/billStatus", {
      companyAcctId: companyData.bankVal
    }, function(result) {
      if (Boolean(result)) {
        nextStepGoon();
      } else {
        dialog.info($.t("company_tmpl.13"), function() {
          return location.reload();
        });
      }
      return _this.btn("reset");
    });
  });
  $(document).on("click", "#btn-company", function() {
    var data;
    if ($("#company-form").valid()) {
      data = $.extend({}, $("#company-form").form(), {
        companyAcctId: companyData.bankVal,
        account: companyData.money,
        orderNo: companyData.orderNo,
        createdTime: companyData.createdTime
      });
      return $.post("/cashier/companyDeposit", data, function(result) {
        return resultHandle(result, function(result) {
          return dialog.info($.t("js.8"), function() {
            return location.reload();
          });
        });
      });
    }
  });
  return $(document).on("click", "#company-code", function() {
    return $(this).attr("src", "/payCode?" + new Date().getTime());
  });
};
