var afterTran;

afterTran = function() {
  $.validator.addMethod("receiver", (function(value, element) {
    return this.optional(element) || /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,8}$/.test(value);
  }), $.t("valid.addr.1"));
  $.validator.addMethod("phone", (function(value, element) {
    return this.optional(element) || /^0{0,1}(13\d|14\d|15\d|17\d|18\d)\d{8}$/.test(value);
  }), $.t("valid.addr.2"));
  $("#realinfo-form").validate($.extend({}, validBase, {
    rules: {
      province: {
        required: true
      },
      city: {
        required: true
      },
      county: {
        required: true
      },
      address: {
        required: true,
        rangelength: [2, 20],
        chinese: true
      },
      receiverBy: {
        required: true,
        receiver: true
      },
      receiverPhone: {
        required: true,
        phone: true
      }
    }
  }));
  $("#btn-realinfo").click(function() {
    return $(this).commit($("#realinfo-form"), "/sidCustInfo/saveCustReceive", (function() {
      return dialog.info($.t("base:edit_ok"), function() {
        return location.reload();
      });
    }), null, function(data) {
      return $.fn.extend({}, data, {
        birthDate: data.BirthYear + "-" + data.BirthMonth + "-" + data.BirthDay
      });
    });
  });
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
      return $("#province option:eq(0)").after(html);
    });
  });
  $("#province").change(function() {
    return $.get("/cashier/listCity", {
      provinceid: $("#province option:selected").data("id")
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
        $("#city option:not(:eq(0))").remove();
        $("#city option:eq(0)").after(html);
        return $("#city").trigger("change_ok");
      });
    });
  });
  $("#city").change(function() {
    var _this;
    _this = $(this);
    return $.get("/cashier/listDistrict", {
      cityid: $("#city option:selected").data("id")
    }, function(result) {
      return resultHandle(result, function() {
        var html, i;
        html = [];
        result = result.obj;
        i = 0;
        while (i < result.length) {
          html.push("<option value=\"" + result[i].districtname + "\">" + result[i].districtname + "</option>");
          i++;
        }
        $("#county option:not(:eq(0))").remove();
        $("#county option:eq(0)").after(html);
        return $("#county").trigger("change_ok");
      });
    });
  });
  return $("#reedit").click(function() {
    $("#view-box").hide();
    $("#edit-box").show();
    $("#province").val(function() {
      return $(this).data("val");
    }).trigger("change");
    $("#city").one("change_ok", function() {
      console.log($(this));
      return $(this).val(function() {
        return $(this).data("val");
      }).trigger("change");
    });
    return $("#county").one("change_ok", function() {
      return $(this).val(function() {
        return $(this).data("val");
      });
    });
  });
};
