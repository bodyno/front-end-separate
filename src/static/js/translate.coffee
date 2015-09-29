getNowLng = ->
  if $.cookie("lng")
    $.cookie "lng"
  else
    "zh.cn"

#动态加载国际化样式
loadLngCss = (lng) ->
  if lng is "zh.cn"
    $("#lng-css").remove()
    return false
  if lng is "en"
    unless $("#lng-css").length
      $("head").append "<link rel=\"stylesheet\" id=\"lng-css\" href=\"/static/local/css/" + lng + ".css\"/>"
    else
      $("#lng-css").attr "href", "/static/local/css/" + lng + ".css"
tempArr = [translate_page, "base"]
if window.page_inner
  i = 0

  while i < page_inner.length
    tempArr.push page_inner[i]
    i++
i18n.init(
  lng: getNowLng()
  resGetPath: "/static/local/lng/__lng__/__ns__.json"
  fallbackLng: []
  ns:
    namespaces: tempArr
    defaultNs: translate_page

  cookieName: "lng"
  cookieExpirationTime: 100000
).done ->
  $("html").i18n()
  unless $("#tran-status").data("id") is "1"
    setTimeout (->
      $("html").i18n()
    ), 0
  $ ->
    window.afterTranCore and afterTranCore()
    window.afterTran and afterTran()


$(document).on "click", ".language-item", ->
  _this = $(this)
  if _this.data("value")
    _this.parents(".language,.page-header-language").find(".language-now").text _this.text()
    _this.parents(".language-list").hide()
    i18n.setLng _this.data("value"), ->
      loadLngCss _this.data("value")
      location.reload()

  else
    dialog.info $.t("base:no_lang")
