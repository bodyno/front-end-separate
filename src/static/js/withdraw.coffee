afterTran = ->
  if getQueryString("more")
    $(".card-con").show()
    $(".withdraw-con").hide()
  else
    $(".withdraw-con").show()
  $(document).on "click", "#pass-set", ->
    pass = []
    $(".pass-set select").each ->
      pass.push $(this).val()

    $.post "/sidCustInfo/savPayPassword",
      payPassWord: pass.join("")
    , (result) ->
      resultHandle result, ->
        dialog.info $.t("valid.with.1"), ->
          location.reload()


  if $("#card-form").length
    $("#card-form").validate $.extend({}, validBase,
      rules:
        bankId:
          required: true

        custBankacctNo:
          required: true
          number: true

        bankProvince:
          required: true

        bankCity:
          required: true

        bankAddr:
          required: true

      messages:
        custBankacctNo:
          number: $.t("valid.with.2")
    )
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
            html.push "<option data-id=\"" + result[i].cityid + "\" value=\"" + result[i].cityname + "\">" + result[i].cityname + "</option>"
            i++
          $("#bankCity option:not(:eq(0))").remove()
          $("#bankCity option:eq(0)").after html


  $(document).on "click", "#bind-card", ->
    $(this).commit $("#card-form"), "/sidCustInfo/bindBank", ->
      dialog.info $.t("valid.with.3"), ->
        location.href = "/payment/withdraw"


  #验证码刷新
  $(document).on "click", ".code", ->
    $(this).attr "src", "/payCode?" + new Date().getTime()

  $(document).on "click", "#withdraw-btn", ->
    $(this).commit $("#withdraw-form"), "/cashier/withdraw", (->
      dialog.info $.t("valid.with.4"), ->
        location.reload()

    ), (->
      ele = $("#ammount")
      val = Number(ele.val())
      if val < ele.data("min")
        dialog.info $.t("with.34")
        return false
      if val > ele.data("max")
        dialog.info $.t("with.35")
        return false
      true
    ), null, ->
      $(".withdraw-form .code").trigger "click"


  if $("#withdraw-form").length
    $("#withdraw-form").validate $.extend({}, validBase,
      rules:
        ammount:
          required: true
          number: true

        payPassword:
          required: true
          number: true

        validCode:
          required: true
          remote: "/checkPayCode"

        remarks:
          required: true

      messages:
        ammount:
          number: $.t("valid.with.5")

        payPassword:
          number: $.t("valid.with.6")

        validCode:
          remote: $.t("valid.with.7")
    )
  $(document).on "click", ".card-table tr", (e) ->
    return true  if $(e.target).is(":radio")
    if $(this).find(":radio").length
      unless $(this).find(":checked").length
        $(".card-table").find(":checked").removeAttr "checked"
        $(this).find(":radio").prop "checked", "checked"
    false
