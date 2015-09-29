var afterTran;

afterTran = function() {
  $(document).on("focus", "#amount", function() {
    return $(this).prev().hide();
  });
  $(document).on("blur", "#amount", function() {
    if (!$(this).val()) {
      return $(this).prev().show();
    }
  });
  $.validator.addMethod("point", (function(value, element) {
    return this.optional(element) || /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value);
  }), $.t("valid.tran.4"));
  $("#transfer-form").validate($.extend({}, validBase, {
    rules: {
      fromType: {
        required: true
      },
      toType: {
        required: true,
        notEqual: "#source-transfer"
      },
      ammount: {
        required: true,
        point: true,
        min: 1
      }
    },
    messages: {
      toType: {
        notEqual: $.t("valid.tran.1")
      },
      ammount: {
        required: $.t("valid.tran.2"),
        min: $.t("valid.tran.5")
      }
    }
  }));
  $("#transfer-btn").click(function() {
    return $(this).commit($("#transfer-form"), "/cashier/transfer", function() {
      return dialog.info($.t("valid.tran.ok"), function() {
        return location.reload();
      });
    });
  });
  return $(".s-d-exchange").click(function() {
    var temp, tempVal;
    temp = $("#source-transfer").html();
    tempVal = $("#source-transfer").val();
    $("#source-transfer").html($("#desc-transfer").html()).val($("#desc-transfer").val());
    return $("#desc-transfer").html(temp).val(tempVal);
  });
};
