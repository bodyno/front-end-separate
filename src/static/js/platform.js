$(function() {
  var moveBig, moveLeft, moveRight;
  moveBig = function(ele) {
    return ele.css({
      zIndex: 12
    }).animate({
      width: 316,
      height: 224,
      left: 250,
      top: 40
    }, 500, function() {
      return ele.attr("class", "prod-item prod-center");
    });
  };
  moveLeft = function(ele, index) {
    return ele.css({
      zIndex: index
    }).animate({
      width: 233,
      height: 165,
      left: 0,
      top: 70
    }, 500, function() {
      return ele.attr("class", "prod-item prod-left");
    });
  };
  moveRight = function(ele, index) {
    return ele.css({
      zIndex: index
    }).animate({
      width: 233,
      height: 165,
      left: 587,
      top: 70
    }, 500, function() {
      return ele.attr("class", "prod-item prod-right");
    });
  };
  $("body").localScroll({
    duration: 300,
    stop: false
  });
  return $(document).on("click", ".prod-page span", function() {
    var _this;
    _this = $(this);
    if (_this.hasClass("active")) {
      return false;
    }
    _this.addClass("active").siblings().removeClass("active");
    moveBig($(".prod-left"));
    moveLeft($(".prod-right"), 9);
    return moveRight($(".prod-center"), 10);
  });
});
