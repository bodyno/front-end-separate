afterTran = ->
  restoreCk = ->
    temp = $(".deposit-item.active")
    temp.find(".radio-bank-3 .checked").find(":radio").prop "checked", "checked"
    moveStep temp.data("step"), true

  #倒计时
  beginCount = ->
    $(".step-1 .time").countdown(new Date().getTime() + 1200000, (event) ->
      $(this).html event.strftime("%M") + ":" + event.strftime("%S")
    ).on "finish.countdown", ->
      $(".step-1").hide()
      $(".step-2").show()


  #再存一次
  moveBtn = ->
    tempP = $(".deposit-item.active")
    amount = tempP.find(".amount").val().length
    bank = tempP.find(".radio-bank-3 .checked,.radio-bank .checked").length
    if amount and bank
      tempP.find(".btn-deposit-top").stop().animate
        marginTop: "-36px"
      , 200, "linear"
    else
      tempP.find(".btn-deposit-top").stop().animate
        marginTop: "0px"
      , 200, "linear"
    if amount and not isNaN(tempP.find(".amount").val())
      if bank
        moveStep "3"
      else
        moveStep "2"
    else
      moveStep "1"
  moveStep = (step, stop) ->
    $("#step").removeAttr("class").addClass "step-" + step
    $(".deposit-item.active").data "step", step  unless stop

  #第三方开始充值
  checkAmount = ->
    ele = $(".deposit-item.active").find(".amount")
    val = ele.val()
    if val.length = 0 or isNaN(val)
      dialog.info $.t("js.2")
      return false
    if val.length = 0 or isNaN(val)
      dialog.info $.t("js.3")
      return false
    unless /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(val)
      dialog.info $.t("js.4")
      return false
    val = Number(val)
    if val < ele.data("min")
      dialog.info $.t("js.5")
      return false
    if val > ele.data("max")
      dialog.info $.t("js.6")
      return false
    true

  #公司入款

  #复制
  copy=->
    client=new ZeroClipboard $(".btn-copy")
    client.on "copy",(event)->
      clipboard = event.clipboardData
      clipboard.setData "text/plain", $(event.target).data "clipboard-text"
      client.on "afterCopy",(event)->
        offset = $(event.currentTarget).offset()
        Tips.Show $.t("js.7"),
          top: offset.top + 30
          left: offset.left + 60

  #上一步

  #下一步

  #下一步成功后
  nextStepGoon=->
    tmpl = doT.template($("#deposit-company2").html())(companyData)
    $("#company-con3").html(tmpl).addClass("active").siblings().removeClass "active"
    $("#company-con3").i18n()
    bindProvince()
    companyValid()
  bindProvince = ->
    $.get "/cashier/listProvince", (result) ->
      resultHandle result, ->
        html = []
        result = result.obj
        i = 0

        while i < result.length
          html.push "<option data-id=\"" + result[i].provinceid + "\" value=\"" + result[i].provincename + "\">" + result[i].provincename + "</option>"
          i++
        $("#bankProvince option:eq(0)").after html


    $("#bankProvince").change ->
      $.get "/cashier/listCity",
        provinceid: $("#bankProvince option:selected").data("id")
      , (result) ->
        resultHandle result, ->
          html = []
          result = result.obj
          i = 0

          while i < result.length
            html.push "<option value=\"" + result[i].cityname + "\">" + result[i].cityname + "</option>"
            i++
          $("#bankCity option:not(:eq(0))").remove()
          $("#bankCity option:eq(0)").after html


  #提交
  companyValid = ->
    $("#company-form").validate $.extend({}, validBase,
      rules:
        name:
          required: true

        bankProvince:
          required: true

        bankCity:
          required: true

        validCode:
          required: true
    )
  $(".deposit-tags li").click ->
    $(this).siblings().find("span").removeClass "on"
    $(this).find("span").addClass "on"
    $(".deposit-item").eq($(this).index()).addClass("active").siblings().removeClass "active"
    restoreCk()

  $(document).on "click", ".radio-bank", ->
    $(this).find(":radio").prop "checked", "checked"
    $(this).find(">div").addClass "checked"
    $(this).parent().siblings().find(".radio-bank>div").removeClass "checked"
    moveBtn()

  $(document).on "click", ".radio-bank-3", ->
    return false  if $(this).hasClass("c-bank")
    $(this).find(":radio").prop "checked", "checked"
    $(this).find(">div").addClass "checked"
    $(this).siblings().find(">div").removeClass "checked"
    moveBtn()

  $(document).on "keyup", ".deposit-item.active .amount", ->
    moveBtn()

  $(document).on "click", ".step-2 .btn-blue", ->
    location.reload()

  $(document).on "focus", ".deposit-item.active .amount", ->
    $(this).prev().hide()

  $(document).on "blur", ".deposit-item.active .amount", ->
    $(this).prev().show()  unless $(this).val()

  $("body").on "click", ".third-party-use .more", ->
    $(".third-banks").animate
      height: "160px"
    , 400, ->
      $(".third-party-use .collapse").show()

    $(this).hide()
    false

  $("body").on "click", ".third-party-use .collapse", ->
    $(".third-banks").animate
      height: "83px"
    , 400, ->
      $(".third-party-use .more").slideDown()

    $(this).hide()
    false

  $(document).on "click", "#ThirdPaymentPay", ->
    return false  unless checkAmount()
    $.post "/cashier/deposit",
      orderMoney: $(".deposit-item.active").find(".amount").val()
      payId: $(".deposit-item.active").find(".bank-input:checked").val()
    , (result) ->
      resultHandle result, (result) ->
        tmpl = doT.template($("#deposit-tmpl").html())()
        showPopUp tmpl, $.t("js.1"), 700, 450, ->

        $(".ui-dialog").i18n()
        beginCount()
        window.open result.obj


  $(document).on "click", ".btnClose,.reload", ->
    location.reload()
    false

  $(document).on "click", "#payment-ali", ->
    tmpl = doT.template($("#deposit-tmpl2").html())()
    showPopUp tmpl, $.t("js.1"), 700, 450, ->

    copy()

  companyData = undefined
  $("#c-btn").click ->
    return false  unless checkAmount()
    $.get "/cashier/getFundInfo",
      companyAcctId: $(".deposit-item.active").find(".bank-input:checked").val()
    , (result) ->
      resultHandle result, (result) ->
        companyData = $.extend({}, result.obj,
          money: $(".deposit-item.active .amount").val()
          bankVal: $(".deposit-item.active").find(".bank-input:checked").val()
          bank: $(".deposit-item.active").find(".bank-input:checked").data("bank")
        )
        tmpl = doT.template($("#deposit-company").html())(companyData)
        $("#company-con2").html(tmpl).addClass("active").siblings().removeClass "active"
        $("#company-con2").i18n()
        copy()


  $(document).on "click", "#c-btn-prev1", ->
    $(this).parents(".c-item").prev().addClass("active").siblings().removeClass "active"

  $(document).on "click", "#c-btn-next1", ->
    _this = $(this)
    _this.btn "loading"
    $.get "/cashier/billStatus",
      companyAcctId: companyData.bankVal
    , (result) ->
      if Boolean(result)
        nextStepGoon()
      else
        dialog.info $.t("company_tmpl.13"), ->
          location.reload()

      _this.btn "reset"


  $(document).on "click", "#btn-company", ->
    if $("#company-form").valid()
      data = $.extend({}, $("#company-form").form(),
        companyAcctId: companyData.bankVal
        account: companyData.money
        orderNo: companyData.orderNo
        createdTime: companyData.createdTime
      )
      $.post "/cashier/companyDeposit", data, (result) ->
        resultHandle result, (result) ->
          dialog.info $.t("js.8"), ->
            location.reload()


  #验证码刷新
  $(document).on "click", "#company-code", ->
    $(this).attr "src", "/payCode?" + new Date().getTime()
