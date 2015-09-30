afterTran = ->

#获取奖池
  getJackpot $(".slot-game-one.active").data("id")

  #PT游戏
  $(document).on "click", ".game-begin", ->
    if isLogin()
      tempId = $(this).data("id")
      url = "http://cache.download.banner.turtledragon88.com/casinoclient.html?game=" + tempId + "&language=zh-CN"
      openWindow url, "onlinept", 1280, 650, "", ""
    false


  #PT试玩
  $(document).on "click", ".slot-item-btn-try", ->
    tempId = $(this).data("id")
    url = "http://cache.download.banner.turtledragon88.com/casinoclient.html?game=" + tempId + "&language=zh-CN&language=zh-CN&mode=offline"
    openWindow url, "onlinept", 1280, 650, "", ""
    false

  afterTran2()
getJackpot = (game_type) ->
  games = jackpot_games[game_type]
  for game of games
    ticker = new Ticker(
      info: 1
      casino: "playtech"
      game: games[game].jp
      currency: "cny"
    )
    ticker.attachToTextBox $(".slot-game-one.active").find("#" + game)[0]
    ticker.SetCurrencySign "¥"
    ticker.SetCurrencyPos 0
    ticker.tick()
jackpot_games =
  "featured-games":
    bl:
      name: "海滨嘉年华"
      jp: "bl"

    bld:
      name: "刀锋战士"
      jp: "mrj-4"

    cifr:
      name: "全景电影"
      jp: "cifr"

    drd:
      name: "夜魔侠 "
      jp: "mrj-4"

    gs:
      name: "钻石山谷"
      jp: "gs2"

    elr:
      name: "艾丽卡"
      jp: "mrj-4"

    evj:
      name: "每个人的头奖 "
      jp: "evjj-1"

    fnf:
      name: "神奇四侠"
      jp: "mrj-4"

    fnf50:
      name: "50线神奇四侠"
      jp: "mrj-4"

    fmn:
      name: "狂热水果"
      jp: "fmn1"

    fnfrj:
      name: "疯狂水果"
      jp: "fmn1"

    ghr:
      name: "恶灵骑士"
      jp: "mrj-4"

    irm2:
      name: "钢铁侠"
      jp: "mrj-4"

    drts:
      name: "头奖飞镖"
      jp: "drts4"

    jb10p:
      name: "10线Jacks or Better"
      jp: "drts4"

    ms:
      name: "神奇老虎机"
      jp: "ms4"

    rom:
      name: "奇迹轮盘"
      jp: "mrj-4"

    bls:
      name: "百万球"
      jp: "bls"

    pnp:
      name: "粉红豹"
      jp: "adv-3"

    pbj:
      name: "累积二十一点"
      jp: "pbj"

    photk:
      name: "紫红水果屋"
      jp: "photk9"

    qop:
      name: "金字塔女王"
      jp: "qop2"

    str:
      name: "古怪扑克"
      jp: "str_sb"

    cnpr:
      name: "甜蜜派对"
      jp: "cnpr4"

    hlk2:
      name: "绿巨人"
      jp: "mrj-4"

    pyrrk:
      name: "拉美西斯的金字塔"
      jp: "pyrrk7"

    trm:
      name: "雷神"
      jp: "mrj-4"

    wsffr:
      name: "狂热华尔街"
      jp: "wsffr"

  "slot-machine":
    bl:
      name: "海滨嘉年华"
      jp: "bl"

    bld:
      name: "刀锋战士"
      jp: "mrj-4"

    cifr:
      name: "全景电影"
      jp: "cifr"

    drd:
      name: "夜魔侠"
      jp: "mrj-4"

    gs:
      name: "钻石山谷"
      jp: "gs2"

    elr:
      name: "艾丽卡"
      jp: "mrj-4"

    evj:
      name: "每个人的头奖 "
      jp: "evjj-1"

    fnf:
      name: "神奇四侠"
      jp: "mrj-4"

    fnf50:
      name: "50线神奇四侠 "
      jp: "mrj-4"

    fmn:
      name: "狂热水果"
      jp: "fmn1"

    fnfrj:
      name: "疯狂水果"
      jp: "fmn1"

    ghr:
      name: "恶灵骑士"
      jp: "mrj-4"

    irm2:
      name: "钢铁侠"
      jp: "mrj-4"

    irm3:
      name: "钢铁侠2"
      jp: "mrj-4"

    irm50:
      name: "50线钢铁侠2"
      jp: "mrj-4"

    irmn3:
      name: "钢铁侠3"
      jp: "mrj-4"

    ms:
      name: "神奇老虎机"
      jp: "ms4"

    pnp:
      name: "粉红豹"
      jp: "adv-3"

    photk:
      name: "紫红水果屋"
      jp: "photk9"

    qop:
      name: "金字塔女王"
      jp: "qop2"

    spidc:
      name: "蜘蛛侠"
      jp: "mrj-4"

    cnpr:
      name: "甜蜜派对"
      jp: "cnpr4"

    hlk2:
      name: "绿巨人"
      jp: "mrj-4"

    hlk50:
      name: "50线绿巨人"
      jp: "mrj-4"

    pyrrk:
      name: "拉美西斯的金字塔"
      jp: "pyrrk7"

    trm:
      name: "雷神"
      jp: "mrj-4"

    wsffr:
      name: "狂热华尔街"
      jp: "wsffr"

    wvm:
      name: "金刚狼"
      jp: "mrj-4"

    xmn:
      name: "X战警"
      jp: "mrj-4"

    drts:
      name: "头奖飞镖"
      jp: "drts4"

  "man-wei":
    bld:
      name: "刀锋战士"
      jp: "mrj-4"

    fnf:
      name: "神奇四侠"
      jp: "mrj-4"

    fnf50:
      name: "50线神奇四侠"
      jp: "mrj-4"

    irm2:
      name: "钢铁侠"
      jp: "mrj-4"

    irm3:
      name: "钢铁侠2"
      jp: "mrj-4"

    irm50:
      name: "50线钢铁侠2"
      jp: "mrj-4"

    irmn3:
      name: "钢铁侠3"
      jp: "mrj-4"

    spidc:
      name: "蜘蛛侠"
      jp: "mrj-4"

    hlk50:
      name: "50线绿巨人"
      jp: "mrj-4"

    trm:
      name: "雷神"
      jp: "mrj-4"

    wvm:
      name: "金刚狼"
      jp: "mrj-4"

    xmn:
      name: "X战警"
      jp: "mrj-4"

  "card-games":
    jb10p:
      name: "10线Jacks or Better"
      jp: "drts4"

    rom:
      name: "奇迹轮盘"
      jp: "mrj-4"

    pbj:
      name: "累积二十一点"
      jp: "pbj"

    str:
      name: "古怪扑克"
      jp: "str_sb"

  tgcarousel:
    bld:
      name: "刀锋战士"
      jp: "mrj-4"

    drd:
      name: "夜魔侠 "
      jp: "mrj-4"

    elr:
      name: "艾丽卡"
      jp: "mrj-4"

    fnf:
      name: "神奇四侠"
      jp: "mrj-4"

    ghr:
      name: "恶灵骑士"
      jp: "mrj-4"

    hlk2:
      name: "绿巨人"
      jp: "mrj-4"

    irm2:
      name: "钢铁侠"
      jp: "mrj-4"

    xmn:
      name: "X战警"
      jp: "mrj-4"