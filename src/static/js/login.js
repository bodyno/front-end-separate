var afterTran;

afterTran = function() {
  var changeCode;
  changeCode = function() {
    return $(".reg-code-img").attr("src", "/validateCode?" + new Date().getTime());
  };
  $("#login-form").validate($.extend({}, validBase, {
    rules: {
      custCode: {
        required: true,
        rangelength: [2, 15]
      },
      passwd: {
        required: true,
        minlength: 6,
        maxlength: 20
      },
      validateCode: {
        remote: "/checkValidateCode",
        required: true,
        maxlength: 4,
        minlength: 4
      }
    },
    messages: {
      custCode: {
        required: $.t("login.valid.1"),
        rangelength: $.t("login.valid.2")
      },
      passwd: {
        required: $.t("login.valid.3"),
        minlength: $.t("login.valid.4"),
        maxlength: $.t("login.valid.4")
      },
      validateCode: {
        remote: $.t("login.valid.5"),
        required: $.t("login.valid.6"),
        maxlength: $.t("login.valid.7"),
        minlength: $.t("login.valid.7")
      }
    }
  }));
  $("#login-btn").click(function() {
    return $(this).commitWithError($("#login-form"), "/login", (function() {
      return location.href = "/";
    }), function() {
      $(".login-code-img").trigger("click").prev().val("");
      return $(".login-code-img").parents(".form-login").removeClass("ok");
    });
  });
  $("#login-form").keyup(function(e) {
    if (e.keyCode === 13) {
      return $("#login-btn").trigger("click");
    }
  });
  return $(".reg-code-img,.code-text span").click(function() {
    return changeCode();
  });
};
