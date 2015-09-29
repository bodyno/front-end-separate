afterTran = ->
  inboxPage = (page) ->
    if page > 10 and $(".page-inbox").is(":hidden")
      $(".page-inbox").show().pagination
        items: page
        itemsOnPage: 10
        cssStyle: "light-theme"
        onPageClick: (number) ->
          getInbox number

    $(".page-inbox").hide()  if page <= 10
  getInbox = (page) ->
    $.get "/message/listInbox",
      per_page: 10
      page: (if page then page else 1)
    , (result) ->
      resultHandle result, ->
        if result.obj.content and result.obj.content.length
          tmpl = doT.template($("#message-tmpl").html())(result.obj.content)
          $(".m-item.active .mcj_g").html(tmpl).i18n()
          $(".m-item.active .mcj_l").show()
        else
          $(".m-item.active .mcj_g").html("<h3 class=\"message-no\" data-i18n=\"msg.no\"></h3>").i18n()
          $(".m-item.active .mcj_l").hide()
        inboxPage result.obj.total
        setUnreadCount result.obj.unRead


  setUnreadCount = (number) ->
    unless number is `undefined`
      if number is 0
        $("#receive-newcounts,#r-read").text ""
      else
        $("#receive-newcounts,#r-read").text number
    else
      $("#receive-newcounts,#r-read").text ->
        Number($(this).text()) - 1

  getOutbox = (page) ->
    $.get "/message/listOutbox",
      per_page: 10
      page: (if page then page else 1)
    , (result) ->
      resultHandle result, ->
        if result.obj.content and result.obj.content.length
          tempData = result.obj.content
          i = 0

          while i < tempData.length
            tempData[i].status = ""
            i++
          tmpl = doT.template($("#message-tmpl").html())(tempData)
          $(".m-item.active .mcj_g").html(tmpl).i18n()
          $(".m-item.active .mcj_l").show()
        else
          $(".m-item.active .mcj_g").html("<h3 class=\"message-no\" data-i18n=\"msg.no\"></h3>").i18n()
          $(".m-item.active .mcj_l").hide()
        outboxPage result.obj.total


  outboxPage = (page) ->
    if page > 10 and $(".page-outbox").is(":hidden")
      $(".page-outbox").show().pagination
        items: page
        itemsOnPage: 10
        cssStyle: "light-theme"
        onPageClick: (number) ->
          getInbox number

    $(".page-outbox").hide()  if page <= 10
  getInbox()
  $(".mcj_c li").click ->
    $(this).addClass("active").siblings().removeClass "active"
    $(".m-item").eq($(this).index()).addClass("active").siblings().removeClass "active"


  #发件箱
  $(document).on "click", "#tab1", ->
    getOutbox()  unless $(".m-item.active .mcj_g li").length

  nowDetail = undefined
  $(document).on "click", ".mcj_j", ->
    nowDetail = $(this).parents("li")
    if $(this).parents("li").hasClass("unread")
      $(this).parents("li").removeClass "unread"
      $.post "/message/saveCrmMessage",
        custMessageId: $(this).data("id")
      , (result) ->
        resultHandle result
        setUnreadCount()

    _this = $(this).children()
    tmpl = doT.template($("#message-detail").html())(
      subject: _this.data("subject")
      time: _this.data("time")
      content: _this.data("content")
    )
    $(".msgpop-main").html(tmpl).i18n()
    $("body").css "overflow-y", "hidden"
    $("#fix-messagepopup").css("overflow-y", "scroll").fadeIn()
    false

  $(document).on "click", ".m-detail", ->
    $(this).parents("li").find(".mcj_j").trigger "click"
    false


  #关闭
  $(document).on "click", "#btn-close,#message-box .close", ->
    $(".msgpop-main").html ""
    $("body").css "overflow-y", "auto"
    $("#fix-messagepopup").css("overflow-y", "hidden").fadeOut()
    false


  #全选
  $(document).on "click", ".all", ->
    if $(this).is(":checked")
      $(".m-item.active .mcj_g").find(":checkbox").prop "checked", "checked"
    else
      $(".m-item.active .mcj_g").find(":checkbox").removeAttr "checked"


  #删除
  $(document).on "click", "#del-receivemsg", ->
    tempCk = $(".m-item.active .mcj_g").find(":checkbox:checked")
    unless tempCk.length
      dialog.info $.t("valid.msg.1")
      return false
    data = []
    tempCk.each ->
      data.push $(this).val()

    $.post "/message/deleteCrms",
      custMessageId: data.join(",")
    , (result) ->
      resultHandle result, ->
        tempCk.parents("li").slideUp ->
          $(this).remove()


  $(document).on "click", ".delete-inner", ->
    $(this).parents("#fix-messagepopup").find(".close").trigger "click"
    $.post "/message/deleteCrms",
      custMessageId: nowDetail.find(".mcj_j").data("id")
    , (result) ->
      resultHandle result, ->
        nowDetail.slideUp ->
          $(this).remove()


  #发件
  $(document).on "click", "#btn-send", ->
    title = $("#title").val()
    message = $("#message").val()
    if not title.length or not message.length
      dialog.info $.t("valid.msg.2")
      return false
    if title.length < 2 or message.length < 5
      dialog.info $.t("valid.msg.3")
      return false
    $.post "/message/saveCrmMessage",
      messageTo: $("#sendto").val()
      subject: title
      content: message
    , (result) ->
      msgarr = ["<p><div class=\"msg-plan\"></div></p><p data-i18n=\"[append]valid.msg.5\"><br/></p>"]
      button = {}
      button[$.t("valid.msg.4")] = ->
        dialog.close()

      resultHandle result, ->
        dialog.custom $.t("valid.msg.6"), msgarr.join(""), button
        $(".ui-dialog").i18n()

      $("#inbox .mcj_g").html ""
      $(".mc-content")[0].reset()

    false
