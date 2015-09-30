afterTran = ->

#GPI游戏

#GPI试玩
  gameOpen = (id, mode) ->
    tempUrl = "http://slots.w88uat.com?"
    tempArr = []
    tempArr.push "op=IG99"
    tempArr.push "token=" + $("#token").val() + ""
    tempArr.push "fun=" + mode
    tempArr.push "op=IG99"
    tempArr.push "lang=zh-cn"
    tempArr.push "gameid=" + id + ""
    tempUrl = tempUrl + tempArr.join("&")
    openWindow tempUrl, "onlinew88", 1280, 650, "", ""
  $(document).on "click", ".game-begin", ->
    url = gameOpen($(this).data("id"), 0)  if isLogin()
    false

  $(document).on "click", ".slot-item-btn-try", ->
    gameOpen $(this).data("id"), 1
    false

  afterTran2()