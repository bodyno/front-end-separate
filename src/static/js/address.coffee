afterTran = ->
  $.validator.addMethod "receiver", ((value, element) ->
    @optional(element) or /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,8}$/.test(value)
  ), $.t("valid.addr.1")
  $.validator.addMethod "phone", ((value, element) ->
    @optional(element) or /^0{0,1}(13\d|14\d|15\d|17\d|18\d)\d{8}$/.test(value)
  ), $.t("valid.addr.2")
  $("#realinfo-form").validate $.extend({}, validBase,
    rules:
      province:
        required: true

      city:
        required: true

      county:
        required: true

      address:
        required: true
        rangelength: [2, 20]
        chinese: true

      receiverBy:
        required: true
        receiver: true

      receiverPhone:
        required: true
        phone: true
  )
  $("#btn-realinfo").click ->
    $(this).commit $("#realinfo-form"), "/sidCustInfo/saveCustReceive", (->
      dialog.info $.t("base:edit_ok"), ->
        location.reload()

    ), null, (data) ->
      $.fn.extend {}, data,
        birthDate: data.BirthYear + "-" + data.BirthMonth + "-" + data.BirthDay


  $.get "/cashier/listProvince", (result) ->
    resultHandle result, ->
      html = []
      result = result.obj
      i = 0

      while i < result.length
        html.push "<option data-id=\"" + result[i].provinceid + "\" value=\"" + result[i].provincename + "\">" + result[i].provincename + "</option>"
        i++
      $("#province option:eq(0)").after html


  $("#province").change ->
    $.get "/cashier/listCity",
      provinceid: $("#province option:selected").data("id")
    , (result) ->
      resultHandle result, ->
        html = []
        result = result.obj
        i = 0

        while i < result.length
          html.push "<option data-id=\"" + result[i].cityid + "\" value=\"" + result[i].cityname + "\">" + result[i].cityname + "</option>"
          i++
        $("#city option:not(:eq(0))").remove()
        $("#city option:eq(0)").after html
        $("#city").trigger "change_ok"


  $("#city").change ->
    _this = $(this)
    $.get "/cashier/listDistrict",
      cityid: $("#city option:selected").data("id")
    , (result) ->
      resultHandle result, ->
        html = []
        result = result.obj
        i = 0

        while i < result.length
          html.push "<option value=\"" + result[i].districtname + "\">" + result[i].districtname + "</option>"
          i++
        $("#county option:not(:eq(0))").remove()
        $("#county option:eq(0)").after html
        $("#county").trigger "change_ok"


  $("#reedit").click ->
    $("#view-box").hide()
    $("#edit-box").show()
    $("#province").val(->
      $(this).data "val"
    ).trigger "change"
    $("#city").one "change_ok", ->
      console.log $(this)
      $(this).val(->
        $(this).data "val"
      ).trigger "change"

    $("#county").one "change_ok", ->
      $(this).val ->
        $(this).data "val"


