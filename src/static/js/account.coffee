#语言

##region document.click
#For popup and window.open
#myaccount|974|600|a-l|please click this button after you login
#after login
#Join Us|974|600|a-l|please click this button after you login
#after login

##endregion

#邮箱
closeForm = ->
  location.reload()
captchaTime = ->
  $(".btn-captcha").countdown(new Date().getTime() + 60000, (event) ->
    $(this).html "(" + event.strftime("%S") + ")" + $.t("center:js.3")
  ).on "finish.countdown", ->
    $(this).html($.t("center:js.3")).data "d", "0"

$ ->
  temp = 110
  temp = 52  if $(".illustration").length
  $(".dial").knob
    width: temp
    height: temp
    lineCap: "round"
    thickness: ".1"
    angleOffset: 180
    readOnly: true
    displayInput: false
    fgColor: "#009b72"
    bgColor: "#a6ccc2"

  p = $("#info-complete").attr("data-complete")
  i = 0
  t = setInterval(->
    i += 5
    if i >= p
      i = p
      clearInterval t
    $(".dial").val(i).trigger "change"
    $("#info-complete").html i + "%"
  , 30)
  popTime = undefined
  $(".a-t-n-i").mouseenter(->
    $(".a-t-pop").hide()
    $(this).parent().find(".a-t-pop").show()
    clearTimeout popTime
  ).mouseleave ->
    clearTimeout popTime
    popTime = setTimeout(->
      $(".a-t-pop").hide()
    , 200)

  $(".a-t-pop").mouseenter(->
    clearTimeout popTime
  ).mouseleave ->
    $(this).hide()

  $(document).on "click", ".a-t-pop .close", ->
    $(this).parent().hide()


Tips = Show: (msg, css) ->
  $block = $(".g-tips-block2")
  $block = $("<div></div>").attr("class", "g-tips-block2").css(css).appendTo("body")  if $block.length is 0
  $block.html(msg).hide().show 100, ->
    setTimeout (->
      $block.hide()
    ), 300


Tips2 =
  timer: null
  $el: null

Tips2.Show = (content, offset, arcls) ->
  _self = this
  _self.$el? and _self.RunHide()
  $tipsBlock = $("<div class=\"g-poptips\"><div class=\"bd\"></div><div class=\"ar\"><em>◆</em><span>◆</span></div></div>").appendTo("body")
  $tipsBlock.mouseenter(->
    clearTimeout _self.timer
  ).mouseleave ->
    _self.Hide()

  $tipsBlock.find(".bd").html content
  $tipsBlock.find(".ar").attr "class", "ar " + arcls
  $tipsBlock.css(
    left: offset.left
    top: offset.top
  ).show()
  _self.$el = $tipsBlock

Tips2.Hide = ->
  return  unless @$el?
  _self = this
  $tipsBlock = @$el
  _self.timer = setTimeout(->
    _self.RunHide()
  , 300)

Tips2.RunHide = ->
  @$el.remove()
  @$el = null

tipsBlock = timer: null
tipsBlock.Show = ($target) ->
  tipsBlock.timer? and clearTimeout(tipsBlock.timer)
  $tipsBlock = $(".g-tips-block")
  if $tipsBlock.length is 0
    $tipsBlock = $("<div class=\"g-tips-block\"><div class=\"close\"></div><div class=\"title\"></div><p></p><div class=\"logo-sj6-b\"></div></div>").appendTo("body")
    $tipsBlock.find(".close").click ->
      $tipsBlock.hide()

    $tipsBlock.mouseenter(->
      clearTimeout tipsBlock.timer
    ).mouseleave ->
      tipsBlock.Hide()

  $tipsBlock.find(".title").html $target.attr("data-title")
  $tipsBlock.find("p").html $target.attr("data-content")
  top = $target.offset().top
  left = $target.offset().left
  top -= $tipsBlock.innerHeight() + 20
  left -= parseInt($tipsBlock.innerWidth() / 2, 10)
  of_ = $target.attr("data-offset")
  if typeof of_ isnt "undefined" and of_ isnt ""
    _of = of_.split("|")
    left += parseInt(_of[0], 10)
    top += parseInt(_of[1], 10)
  $tipsBlock.css(
    top: top
    left: left
  ).show()
  tipsBlock.$el = $target

tipsBlock.Hide = ->
  $tipsBlock = $(".g-tips-block")
  tipsBlock.timer = setTimeout(->
    $tipsBlock.hide()
    tipsBlock.$el = null
  , 300)

$("[data-showtips='true']").mouseenter((e) ->
  tipsBlock.Show $(e.currentTarget)
).mouseleave ->
  tipsBlock.Hide()

$(document).click (event) ->
  srcElement = undefined
  if event.srcElement
    srcElement = event.srcElement
  else
    srcElement = event.target
  srcElement = $(srcElement).parent()[0]  unless srcElement.tagName.toLowerCase() is "a"
  return  if typeof srcElement is "undefined"
  if srcElement.tagName and srcElement.tagName.toLowerCase() is "a"
    par = $(srcElement).attr("data-window")
    tokens = undefined
    if par
      event.preventDefault()
      tokens = par.split("|")
      if tokens[3] and tokens[3] is "a-l"
        unless $("body").hasClass("login")
          dialog.error l.Message, tokens[4]
          return
      openWindow $(srcElement).attr("href"), tokens[0], tokens[1], tokens[2]
      return false
    par = $(srcElement).attr("data-dialog")
    if par
      event.preventDefault()
      tokens = par.split("|")
      if tokens[3] and tokens[3] is "a-l"
        unless $("body").hasClass("login")
          dialog.error l.Message, tokens[4]
          return
      html = $($(srcElement).attr("href")).html()
      showPopUp html, tokens[0], tokens[1], tokens[2]
      $(".ui-dialog").i18n()
      $(srcElement).trigger "show"
      false

$(document).on "click", "#phone-btn-1", ->
  tmpl = doT.template($("#t-phone2").html())(phone: 13517341111)
  $("#bindphone-content").html tmpl
  false

$(document).on "click", "#phone-btn-2", ->
  tmpl = doT.template($("#t-phone3").html())({})
  $("#bindphone-content").html tmpl
  false

$(document).on "show", ".mail-show", ->
  $("#bindForm").validate $.extend({}, validBase,
    rules:
      email:
        required: true
        email: true

    messages:
      email:
        email: $.t("center:js.1")
  )

$(document).on "click", "#mail-btn-1", ->
  if $("#bindForm").valid()
    $.post "/sidCustInfo/getEmailCode",
      emailAddress: $("#email").val()
    , (result) ->
      resultHandle result

    tmpl = doT.template($("#t-mail2").html())(mail: $("#email").val())
    $("#bind-email").html(tmpl).i18n()
    $("#bindForm").validate $.extend({}, validBase,
      rules:
        captcha:
          required: true
    )
    captchaTime()
    false

$(document).on "click", ".btn-captcha", ->
  if $(this).data("d") is "0"
    $.post "/sidCustInfo/getEmailCode",
      emailAddress: $("#current-email").html()
    , (result) ->
      resultHandle result, ->
        dialog.info $.t("center:js.2")
        $(".btn-captcha").data "d", "1"
        captchaTime()


$(document).on "click", "#mail-btn-2", ->
  if $("#bindForm").valid()
    $.post "/sidCustInfo/bindEmail",
      emailAddress: $("#current-email").html()
      emailCode: $("#captcha").val()
    , (result) ->
      resultHandle result, ->
        tmpl = doT.template($("#t-mail3").html())({})
        $("#bind-email").html(tmpl).i18n()


  false

$("#as-bindcard").click ->
  location.href = $(this).attr("href")


#刷新所有钱包
$(document).on "click", ".btn-refresh-2", ->
  _this = $(this)
  $.get "/cashier/fresh",
    type: _this.data("type")
  , (result) ->
    resultHandle result, (result) ->
      $(_this.data("ele")).text result.obj


