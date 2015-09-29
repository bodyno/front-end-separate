afterTran = ->
  $(document).on "focus", "#amount", ->
    $(this).prev().hide()

  $(document).on "blur", "#amount", ->
    $(this).prev().show()  unless $(this).val()

  $.validator.addMethod "point", ((value, element) ->
    @optional(element) or /^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/.test(value)
  ), $.t("valid.tran.4")
  $("#transfer-form").validate $.extend({}, validBase,
    rules:
      fromType:
        required: true

      toType:
        required: true
        notEqual: "#source-transfer"

      ammount:
        required: true
        point: true
        min: 1

    messages:
      toType:
        notEqual: $.t("valid.tran.1")

      ammount:
        required: $.t("valid.tran.2")
        min: $.t("valid.tran.5")
  )
  $("#transfer-btn").click ->
    $(this).commit $("#transfer-form"), "/cashier/transfer", ->
      dialog.info $.t("valid.tran.ok"), ->
        location.reload()


  $(".s-d-exchange").click ->
    temp = $("#source-transfer").html()
    tempVal = $("#source-transfer").val()
    $("#source-transfer").html($("#desc-transfer").html()).val $("#desc-transfer").val()
    $("#desc-transfer").html(temp).val tempVal
