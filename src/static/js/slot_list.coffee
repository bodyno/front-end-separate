afterTran2 = ->
  switchTab = ->
    tempEle = $(".slot-game-one.active")
    $(".slot-game-one.active img").lazyload()
    unless tempEle.data("load") is "1"
      tempEle.data "load", "1"
      if window.getJackpot
        getJackpot tempEle.data("id")
    console.log(tempEle.find(".slot-game-main-con").height())
    $("#slot-height").height(tempEle.find(".slot-game-main-con").height()+35)

  moveJackpot = ->
    $("#jackpot_loader1 .container").children().each ->
      if $(this).is(":last-child")
        $(this).hide "slide",
          direction: "left"
        , 1000, ->
          $("#jackpot_loader1 .jackpot_loader_item:eq(2)").removeClass "special"
          $("#jackpot_loader1 .jackpot_loader_item:eq(3)").addClass "special"
          $("#jackpot_loader1 .container").append $("#jackpot_loader1 .jackpot_loader_item:first")
          $("#jackpot_loader1 .container").children().each ->
            $(this).show "slide",
              direction: "right"
            , 1000


      else
        $(this).hide "slide",
          direction: "left"
        , 1000

  $(".slot-game-one.active img").lazyload()
  $(document).on "click", ".slot-type-list", ->
    _this = $(this)
    _this.addClass("active").siblings().removeClass "active"
    $(".slot-game-one").eq(_this.index()).addClass("active").siblings().removeClass "active"
    switchTab()
    false

  setInterval (->
    moveJackpot()
  ), 5000
