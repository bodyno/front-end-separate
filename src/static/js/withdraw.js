var afterTran;

afterTran = function() {
  if (getQueryString("more")) {
    $(".card-con").show();
    $(".withdraw-con").hide();
  } else {
    $(".withdraw-con").show();
  }
  $(document).on("click", "#pass-set", function() {
    var pass;
    pass = [];
    $(".pass-set select").each(function() {
      return pass.push($(this).val());
    });
    return $.post("/sidCustInfo/savPayPassword", {
      payPassWord: pass.join("")
    }, function(result) {
      return resultHandle(result, function() {
        return dialog.info($.t("valid.with.1"), function() {
          return location.reload();
        });
      });
    });
  });
  if ($("#card-form").length) {
    $("#card-form").validate($.extend({}, validBase, {
      rules: {
        bankId: {
          required: true
        },
        custBankacctNo: {
          required: true,
          number: true
        },
        bankProvince: {
          required: true
        },
        bankCity: {
          required: true
        },
        bankAddr: {
          required: true
        }
      },
      messages: {
        custBankacctNo: {
          number: $.t("valid.with.2")
        }
      }
    }));
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
    $("#bankProvince").change(function() {
      return $.get("/cashier/listCity", {
        provinceid: $("#bankProvince option:selected").data("id")
      }, function(result) {
        return resultHandle(result, function() {
          var html, i;
          html = [];
          result = result.obj;
          i = 0;
          while (i < result.length) {
            html.push("<option data-id=\"" + result[i].cityid + "\" value=\"" + result[i].cityname + "\">" + result[i].cityname + "</option>");
            i++;
          }
          $("#bankCity option:not(:eq(0))").remove();
          return $("#bankCity option:eq(0)").after(html);
        });
      });
    });
  }
  $(document).on("click", "#bind-card", function() {
    return $(this).commit($("#card-form"), "/sidCustInfo/bindBank", function() {
      return dialog.info($.t("valid.with.3"), function() {
        return location.href = "/payment/withdraw";
      });
    });
  });
  $(document).on("click", ".code", function() {
    return $(this).attr("src", "/payCode?" + new Date().getTime());
  });
  $(document).on("click", "#withdraw-btn", function() {
    return $(this).commit($("#withdraw-form"), "/cashier/withdraw", (function() {
      return dialog.info($.t("valid.with.4"), function() {
        return location.reload();
      });
    }), (function() {
      var ele, val;
      ele = $("#ammount");
      val = Number(ele.val());
      if (val < ele.data("min")) {
        dialog.info($.t("with.34"));
        return false;
      }
      if (val > ele.data("max")) {
        dialog.info($.t("with.35"));
        return false;
      }
      return true;
    }), null, function() {
      return $(".withdraw-form .code").trigger("click");
    });
  });
  if ($("#withdraw-form").length) {
    $("#withdraw-form").validate($.extend({}, validBase, {
      rules: {
        ammount: {
          required: true,
          number: true
        },
        payPassword: {
          required: true,
          number: true
        },
        validCode: {
          required: true,
          remote: "/checkPayCode"
        },
        remarks: {
          required: true
        }
      },
      messages: {
        ammount: {
          number: $.t("valid.with.5")
        },
        payPassword: {
          number: $.t("valid.with.6")
        },
        validCode: {
          remote: $.t("valid.with.7")
        }
      }
    }));
  }
  return $(document).on("click", ".card-table tr", function(e) {
    if ($(e.target).is(":radio")) {
      return true;
    }
    if ($(this).find(":radio").length) {
      if (!$(this).find(":checked").length) {
        $(".card-table").find(":checked").removeAttr("checked");
        $(this).find(":radio").prop("checked", "checked");
      }
    }
    return false;
  });
};
