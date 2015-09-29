afterTran = ->

#国家

#邮箱

#介绍人

#验证码

#姓

#名

#昵称

#英文姓名

#生日

#QQ

#取款密码

#手机

#证件类型

#证件
  initRequire = (filed, txt) ->
    tempRule[filed] = {}
    tempMessage[filed] = {}
    tempRule[filed]["required"] = true
    tempMessage[filed]["required"] = txt

  #注册验证

  #邮箱自动完成

  #注册按钮

  #验证码刷新
  changeCode = ->
    $(".reg-code-img").attr "src", "/validateCode?" + new Date().getTime()
  refHandle = ->
    refId = getQueryString("affiliateId")
    if refId
      date = new Date()
      date.setMinutes new Date().getMinutes() + 30
      $.cookie "refId", refId,
        expires: date

    else
      refId = $.cookie("refId")
    setref refId  if refId
  setref = (refId) ->
    $("#affiliateId").val refId
    $("#affiliateId-hidden").val refId
  tempRule =
    custCode:
      remote: "/checkCustCode"
      required: true
      rangelength: [2, 10]
      string: true

    passwd:
      required: true
      rangelength: [6, 12]
      string: true

    repasswd:
      required: true
      equalTo: "#passwd"
      rangelength: [6, 12]
      string: true

    agree:
      required: true

  tempMessage =
    custCode:
      remote: $.t("js.1")
      required: $.t("js.2")
      rangelength: $.t("js.3")

    passwd:
      required: $.t("js.4")
      rangelength: $.t("js.5")

    repasswd:
      required: $.t("js.6")
      equalTo: $.t("js.7")

    agree:
      required: $.t("js.37")

  tempEle = $("#country")
  initRequire "country", $.t("js.8")  if tempEle.parents(".reg-group").data("require")  if tempEle.length
  tempEle = $("#emailAddress")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "emailAddress", $.t("js.9")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["emailAddress"]["email"] = true
        tempMessage["emailAddress"]["email"] = $.t("js.10")
  tempEle = $("#affiliateId")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "affiliateId", $.t("js.11")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["affiliateId"]["minlength"] = 2
        tempRule["affiliateId"]["maxlength"] = 50
        tempMessage["affiliateId"]["minlength"] = $.t("js.12")
        tempMessage["affiliateId"]["maxlength"] = $.t("js.13")
  tempEle = $("#validateCode")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "validateCode", $.t("js.14")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["validateCode"]["remote"] = "/checkValidateCode"
        tempRule["validateCode"]["minlength"] = 4
        tempRule["validateCode"]["maxlength"] = 4
        tempMessage["validateCode"]["remote"] = $.t("js.15")
        tempMessage["validateCode"]["minlength"] = $.t("js.16")
        tempMessage["validateCode"]["maxlength"] = $.t("js.17")
  tempEle = $("#firstName")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "firstName", $.t("js.18")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["firstName"]["minlength"] = 1
        tempRule["firstName"]["maxlength"] = 6
        tempRule["firstName"]["zh"] = true
        tempMessage["firstName"]["minlength"] = $.t("js.19")
        tempMessage["firstName"]["maxlength"] = $.t("js.20")
  tempEle = $("#lastName")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "lastName", $.t("js.21")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["lastName"]["minlength"] = 2
        tempRule["lastName"]["maxlength"] = 20
        tempRule["lastName"]["zh"] = true
        tempMessage["lastName"]["minlength"] = $.t("js.22")
        tempMessage["lastName"]["maxlength"] = $.t("js.23")
  tempEle = $("#nickName")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "nickName", $.t("js.24")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["nickName"]["minlength"] = 2
        tempRule["nickName"]["maxlength"] = 30
        tempRule["nickName"]["chinese"] = true
        tempMessage["nickName"]["minlength"] = $.t("js.25")
        tempMessage["nickName"]["maxlength"] = $.t("js.26")
  tempEle = $("#enName")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "enName", $.t("js.27")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["enName"]["minlength"] = 2
        tempRule["enName"]["maxlength"] = 30
        tempRule["enName"]["en"] = true
        tempMessage["enName"]["minlength"] = $.t("js.28")
        tempMessage["enName"]["maxlength"] = $.t("js.29")
  tempEle = $("#birthDate")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "birthDate", $.t("js.30")
      tempRule["birthDate"]["date"] = true  if tempEle.parents(".reg-group").data("valid")
  tempEle = $("#qq")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "qq", $.t("js.31")
      tempRule["qq"]["qq"] = true  if tempEle.parents(".reg-group").data("valid")
  tempEle = $("#drawPwd")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "drawPwd", $.t("js.32")
      if tempEle.parents(".reg-group").data("valid")
        tempRule["drawPwd"]["maxlength"] = 16
        tempMessage["drawPwd"]["maxlength"] = $.t("js.33")
  tempEle = $("#mobileNumber")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "mobileNumber", $.t("js.34")
      tempRule["mobileNumber"]["phone"] = true  if tempEle.parents(".reg-group").data("valid")
  tempEle = $("#certificateType")
  initRequire "certificateType", $.t("js.35")  if tempEle.parents(".reg-group").data("require")  if tempEle.length
  tempEle = $("#certificate")
  if tempEle.length
    if tempEle.parents(".reg-group").data("require")
      initRequire "certificate", $.t("js.36")
      tempRule["certificate"]["cardno"] = true  if tempEle.parents(".reg-group").data("valid")
  $("#reg-form").validate $.extend({}, validBase,
    rules: tempRule
    messages: tempMessage
  )
  $("#email").mailAutoComplete()
  $("#birthDate").prop("readonly", "readonly").datepicker
    changeMonth: true
    changeYear: true
    yearRange: "1960:" + (new Date().getFullYear() - 10)
    onSelect: (date, ele) ->
      $(ele.input).trigger "blur"

  $("#reg-btn").click ->
    $(this).commitWithError $("#reg-form"), "/register", (->
      location.href = "/register_success"
    ), ->
      $(".reg-code-img").trigger("click").prev().val ""
      $(".reg-code-img").parents(".reg-group").removeClass "ok"


  $("#reg-form").keyup (e) ->
    $("#reg-btn").trigger "click"  if e.keyCode is 13

  $(".reg-code-img").click ->
    changeCode()

  refHandle()