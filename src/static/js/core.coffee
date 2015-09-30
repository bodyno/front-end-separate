afterTranCore = ->

#语言

#下拉menu

#PT登录
  login_pt = ->
    iapiSetCallout "Login", (result) ->
      console.log result
      if result.errorCode
        dialog.info "PT游戏登录失败，请联系在线客服，错误信息:" + (result.playerMessage or result.errorText)
      else
        $.cookie "pt_status", "true"

    iapiLogin "IG99TEST50", "123456", 1, "zh-cn"

  #form转json

  #button禁用

  # push to event loop to allow forms to submit
  Plugin = (option) ->
    @each ->
      $this = $(this)
      data = $this.data("bs.button")
      options = typeof option is "object" and option
      $this.data "bs.button", (data = new Button(this, options))  unless data
      if option is "toggle"
        data.toggle()
      else data.setState option  if option

  lngTime = undefined
  $(".language,.page-header-language").hoverIntent (->
    $(this).find(".language-list").show()
    clearTimeout lngTime
  ), ->
    _this = $(this)
    clearTimeout lngTime
    lngTime = setTimeout(->
      _this.find(".language-list").hide()
    , 200)

  $(".language-list").mouseenter(->
    clearTimeout lngTime
  ).mouseleave ->
    $(this).fadeOut 200

  $(".header-login-con").keyup (e) ->
    $(this).find(".header-login").click()  if e.keyCode is 13

  $(".header-login").click ->
    form = $(".header-form")
    username = form.find("[name=username]").val()
    password = form.find("[name=password]").val()
    code = form.find("[name=validateCode]").val()
    if username.length is 0
      dialog.info $.t("base:valid.1")
      return false
    if password.length is 0
      dialog.info $.t("base:valid.2")
      return false
    if code.length is 0
      dialog.info $.t("base:valid.3")
      return false
    $(this).commit $(".header-form"), "/login", (->
      $.cookie "pt_status", "false"
      location.reload()
    ), ((data) ->
      $.extend {}, data,
        custCode: username
        passwd: password

    ), null, ->
      $(".header-code").trigger("click").prev().val ""

    false

  $(document).on "click", ".header-code", ->
    $(this).attr "src", "/validateCode?" + new Date().getTime()

  $(".header-more-left").css "left", ->
    -($(window).width() - 980) / 2

  $(".header-more-right").css "right", ->
    -($(window).width() - 980) / 2

  hmTime = undefined
  $(document).on("mouseenter", ".header .link", ->
    clearTimeout hmTime
    $(".header-block:visible").hide()
    $(this).parent().find(".header-block").stop().fadeIn()
  ).on "mouseleave", ".header li", ->
    _this = $(this)
    hmTime = setTimeout(->
      _this.parent().find(".header-block").stop().fadeOut()
    , 200)

  $(document).on("mouseenter", ".header-block", ->
    clearTimeout hmTime
    $(this).show()
  ).on "mouseleave", ".header-block", ->
    $(this).stop().fadeOut()

  $(document).on "click", ".browser-updatetips span", ->
    $(this).parents(".browser-updatetips").remove()

  if $("#user_status").text()
    login_pt()  if $.cookie("pt_status") is "false"
  else
    $.cookie "pt_status", "false"
  $.validator.addMethod "chinese", ((value, element) ->
    @optional(element) or /^[A-Za-z0-9\u4E00-\u9FA5]+$/.test(value)
  ), $.t("base:valid.4")
  $.validator.addMethod "string", ((value, element) ->
    @optional(element) or /^[A-Za-z0-9]+$/.test(value)
  ), $.t("base:valid.5")
  $.validator.addMethod "zh", ((value, element) ->
    @optional(element) or /^[A-Za-z\u4E00-\u9FA5]+$/.test(value)
  ), $.t("base:valid.6")
  $.validator.addMethod "en", ((value, element) ->
    @optional(element) or /^[A-Za-z]+$/.test(value)
  ), $.t("base:valid.7")
  $.validator.addMethod "date", ((value, element) ->
    @optional(element) or /^\d{4}-\d{2}-\d{2}$/.test(value)
  ), $.t("base:valid.8")
  $.validator.addMethod "qq", ((value, element) ->
    @optional(element) or /^\d{5,12}$/.test(value)
  ), $.t("base:valid.9")
  $.validator.addMethod "phone", ((value, element) ->
    @optional(element) or /^\d{11,16}$/.test(value)
  ), $.t("base:valid.10")
  $.validator.addMethod "cardno", ((value, element) ->
    @optional(element) or /^\S{9,18}$/.test(value)
  ), $.t("base:valid.11")
  $.validator.addMethod "notEqual", ((value, element, param) ->
    target = $(param)
    value isnt target.val()
  ), $.t("base:valid.12")
  $.fn.extend
    form: ->
      obj = @serializeArray()
      result = {}
      for item of obj
        result[obj[item].name] = filterXSS(obj[item].value)
      result

    commit: (form, url, func, func2, func3, funcError) ->
      if form.valid()
        return false  unless func2()  if func2
        _this = $(this)
        _this.btn "loading"
        data = form.form()
        data = func3(data)  if func3
        $.post(url, data).success (result) ->
          if result.code is "200"
            func result
          else
            showError result.msg
            funcError()  if funcError
          _this.btn "reset"


    commitWithError: (form, url, func, func2) ->
      if form.valid()
        _this = $(this)
        _this.btn "loading"
        data = form.form()
        $.post(url, data).success (result) ->
          if result.code is "200"
            func result
          else
            func2()  if func2
            showError result.msg
          _this.btn "reset"


  Button = (element, options) ->
    @$element = $(element)
    @options = $.extend({}, Button.DEFAULTS, options)
    @isLoading = false

  Button.DEFAULTS =
    loadingText: $.t("base:valid.13")
  Button::setState = (state) ->
    d = "disabled"
    $el = @$element
    val = (if $el.is("input") then "val" else "html")
    data = $el.data()
    state += "Text"
    $el.data "resetText", $el[val]()  unless data.resetText?
    setTimeout $.proxy(->
      $el[val] (if not data[state]? then @options[state] else data[state])
      if state is "loadingText"
        @isLoading = true
        $el.addClass(d).attr d, d
      else if @isLoading
        @isLoading = false
        $el.removeClass(d).removeAttr d
    , this), 0

  old = $.fn.button
  $.fn.btn = Plugin
  $.fn.btn.Constructor = Button
  $.fn.btn.noConflict = ->
    $.fn.btn = old
    this

  window.dialog =
    openned: false

##region close
    close: ->
      window.top.$("#dialog").dialog("close").remove()
      dialog.openned = false

    _getHTML: (htmlArray) ->
      if htmlArray.join
        "<div class='msg'><p>" + htmlArray.join("</p><p>") + "</p></div>"
      else
        "<div class='msg'><p>" + htmlArray + "</p></div>"

    _show: (title, messageHtml, buttons) ->
      _buttons = undefined
      if buttons.each
        _buttons = {}
        buttons.each ->
          href = $(this).attr("href")
          _buttons[$(this).html()] = ->
            window.location.href = href

      else
        _buttons = buttons
      dialog.close()
      $div = window.top.$("<div id=\"dialog\"></div>")
      $div.html "<div class=\"field-c\">" + messageHtml + "</div>"
      $div.dialog
        resizable: false
        modal: true
        buttons: _buttons
        title: title
        dialogClass: "dialog"
        minWidth: 360
        minHeight: 200

      dialog.openned = true

    info: (messageHtml, func) ->
      buttons = {}
      unless func
        buttons[$.t("base:button.ok")] = ->
          dialog.close()
      else
        buttons[$.t("base:button.ok")] = ->
          func()
          dialog.close()
      dialog._show $.t("base:button.info"), "<span class=\"icon true\"></span>" + dialog._getHTML(messageHtml), buttons

    error: (messageHtml, buttons) ->
      unless buttons?
        buttons = {}
        buttons[$.t("base:button.ok")] = ->
          dialog.close()
      dialog._show $.t("base:button.error"), "<span class=\"icon error\"></span>" + dialog._getHTML(messageHtml), buttons

    custom: (title, messageHtml, buttons) ->
      dialog._show title, "<span class=\"icon confirm\"></span>" + dialog._getHTML(messageHtml), buttons


  #多账号登录
  dialog.info $("#user-multiple").val()  if $("#user-multiple").val()

#ajax显示错误信息
showError = (text) ->
  dialog.error $.t("base:msg." + text)
getQueryString = (name) ->
  reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  r = window.location.search.substr(1).match(reg)
  return unescape(r[2])  if r?
  null
resultHandle = (result, func) ->
  if result.code is "200"
    func result  if func
  else
    showError result.msg
openWindow = (openUrl, openName, openWidth, openHeight, openLeft, openTop) ->
  url = openUrl
  name = openName
  width = openWidth
  height = openHeight
  left = ((if String(openLeft) is "" then (window.screen.availWidth - 10 - openWidth) / 2 else openLeft))
  top = ((if String(openTop) is "" then (window.screen.availHeight - 40 - openHeight) / 2 else openTop))
  window.open url, name, "depended=yes,resizable=yes,width=" + width + ",height=" + height + ",left=" + left + ",top=" + top
isLogin = ->
  if $("#user_status").text()
    true
  else
    dialog.info $.t("base:login_text")
    false

showPopUp = (html, title, width, height, closefn) ->
  $("#popup").remove()
  $div = window.top.$("<div id=\"popup\"></div>")
  $div.html html
  $div.css "width", width
  $div.find("iframe").css "width", width
  $div.dialog
    height: height
    width: width
    resizable: false
    modal: true
    title: title
    dialogClass: "popup"
    close: closefn


validBase =
  debug: true
  success: (label) ->
    label.addClass "success"

  unhighlight: (element) ->
    $(element).parent().addClass("ok").removeClass "red"
    $(element).parent().append "<b></b>"  unless $(element).parent().find("b").length

  highlight: (element, errorClass) ->
    $(element).parent().addClass("red").removeClass("ok").find("." + errorClass).removeClass "success"
    $(element).parent().append "<b></b>"  unless $(element).parent().find("b").length

  errorPlacement: (error, element) ->
    error.appendTo element.parent()