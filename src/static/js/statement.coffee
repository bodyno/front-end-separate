afterTran = ->
  statePage = (page) ->
    if page > 10 and $(".search-page").is(":hidden")
      $(".search-page").show().pagination
        items: page
        itemsOnPage: 10
        cssStyle: "light-theme"
        onPageClick: (number) ->
          getStatement number

    $(".search-page").hide()  if page <= 10
  getStatement = (page) ->
    $("#statement-loading").show()
    $.get "/cashier/transRecords",
      fundsType: $(".trans-type .on").data("value")
      index: $(".trans-date .on").data("value")
      per_page: 10
      page: (if page then page else 1)
    , (result) ->
      resultHandle result, ->
        if result.obj.content and result.obj.content.length
          tmpl = doT.template($("#statement-tmpl").html())(result.obj.content)
          $("#search-result").html(tmpl).i18n()
        else
          tmpl = doT.template($("#statement-no").html())()
          $("#search-result").html(tmpl).i18n()
        statePage result.obj.total

      $("#statement-loading").hide()

  getStatement()
  $(document).on "click", ".trans-type a,.trans-date a", ->
    $(this).addClass("on").siblings().removeClass "on"
    getStatement()


  #详情
  $(document).on "click", "#search-result .detail", ->
    $.get "/cashier/recordsDetail",
      balanceLogId: $(this).data("id")
    , (result) ->
      resultHandle result, (result) ->
        tmpl = doT.template($("#detail-tmpl").html())(result.obj)
        $("#detail-con").html("").html tmpl
        $("#show-tmpl").trigger "click"


    false
