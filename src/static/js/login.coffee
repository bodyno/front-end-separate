afterTran = ->

#登录验证

#登录按钮

#验证码刷新
  changeCode = ->
    $(".reg-code-img").attr "src", "/validateCode?" + new Date().getTime()
  $("#login-form").validate $.extend({}, validBase,
    rules:
      custCode:
        required: true
        rangelength: [2, 15]

      passwd:
        required: true
        minlength: 6
        maxlength: 20

      validateCode:
        remote: "/checkValidateCode"
        required: true
        maxlength: 4
        minlength: 4

    messages:
      custCode:
        required: $.t("login.valid.1")
        rangelength: $.t("login.valid.2")

      passwd:
        required: $.t("login.valid.3")
        minlength: $.t("login.valid.4")
        maxlength: $.t("login.valid.4")

      validateCode:
        remote: $.t("login.valid.5")
        required: $.t("login.valid.6")
        maxlength: $.t("login.valid.7")
        minlength: $.t("login.valid.7")
  )
  $("#login-btn").click ->
    $(this).commitWithError $("#login-form"), "/login", (->
      location.href = "/"
    ), ->
      $(".login-code-img").trigger("click").prev().val ""
      $(".login-code-img").parents(".form-login").removeClass "ok"


  $("#login-form").keyup (e) ->
    $("#login-btn").trigger "click"  if e.keyCode is 13

  $(".reg-code-img,.code-text span").click ->
    changeCode()
