$ ->
  moveBig = (ele) ->
    ele.css(zIndex: 12).animate
      width: 316
      height: 224
      left: 250
      top: 40
    , 500, ->
      ele.attr "class", "prod-item prod-center"

  moveLeft = (ele, index) ->
    ele.css(zIndex: index).animate
      width: 233
      height: 165
      left: 0
      top: 70
    , 500, ->
      ele.attr "class", "prod-item prod-left"

  moveRight = (ele, index) ->
    ele.css(zIndex: index).animate
      width: 233
      height: 165
      left: 587
      top: 70
    , 500, ->
      ele.attr "class", "prod-item prod-right"

  $("body").localScroll
    duration: 300
    stop: false

  $(document).on "click", ".prod-page span", ->
    _this = $(this)
    return false  if _this.hasClass("active")
    _this.addClass("active").siblings().removeClass "active"
    moveBig $(".prod-left")
    moveLeft $(".prod-right"), 9
    moveRight $(".prod-center"), 10

