afterTran = ->
  $(document).on "click", ".start", ->
    if isLogin()
      tempUrl = "http://casino.w88uat.com/?op=IG99&m=2d&token=" + $("#token").val() + "&lang=zh-cn"
      openWindow tempUrl, "onlinecasino", 1280, 650, "", ""
    false

  $(document).on "click", ".casino-t-i", ->
    $(".casino-t").toggleClass "active"
    $(".casino-item").eq($(this).index()).addClass("active").siblings().removeClass "active"
    false

  $(document).on("mouseenter", ".cg-col", ->
    $(this).addClass "active"
  ).on "mouseleave", ".cg-col", ->
    $(this).removeClass "active"


#
#window.onbeforeunload = function (event) {
#    //window.open('accountUnbound.jsp','','height=0,width=0,top=10000,left=10000')
#    console.log("123")
#    return null;
#};
#