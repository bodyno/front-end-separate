var afterTran2;

afterTran2 = function() {
  var moveJackpot, switchTab;
  switchTab = function() {
    var tempEle;
    tempEle = $(".slot-game-one.active");
    $(".slot-game-one.active img").lazyload();
    if (tempEle.data("load") !== "1") {
      tempEle.data("load", "1");
      if (window.getJackpot) {
        getJackpot(tempEle.data("id"));
      }
    }
    console.log(tempEle.find(".slot-game-main-con").height());
    return $("#slot-height").height(tempEle.find(".slot-game-main-con").height() + 35);
  };
  moveJackpot = function() {
    return $("#jackpot_loader1 .container").children().each(function() {
      if ($(this).is(":last-child")) {
        return $(this).hide("slide", {
          direction: "left"
        }, 1000, function() {
          $("#jackpot_loader1 .jackpot_loader_item:eq(2)").removeClass("special");
          $("#jackpot_loader1 .jackpot_loader_item:eq(3)").addClass("special");
          $("#jackpot_loader1 .container").append($("#jackpot_loader1 .jackpot_loader_item:first"));
          return $("#jackpot_loader1 .container").children().each(function() {
            return $(this).show("slide", {
              direction: "right"
            }, 1000);
          });
        });
      } else {
        return $(this).hide("slide", {
          direction: "left"
        }, 1000);
      }
    });
  };
  $(".slot-game-one.active img").lazyload();
  $(document).on("click", ".slot-type-list", function() {
    var _this;
    _this = $(this);
    _this.addClass("active").siblings().removeClass("active");
    $(".slot-game-one").eq(_this.index()).addClass("active").siblings().removeClass("active");
    switchTab();
    return false;
  });
  return setInterval((function() {
    return moveJackpot();
  }), 5000);
};
