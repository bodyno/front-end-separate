var afterTran;

afterTran = function() {
  var gameOpen;
  gameOpen = function(id, mode) {
    var tempArr, tempUrl;
    tempUrl = "http://slots.w88uat.com?";
    tempArr = [];
    tempArr.push("op=IG99");
    tempArr.push("token=" + $("#token").val() + "");
    tempArr.push("fun=" + mode);
    tempArr.push("op=IG99");
    tempArr.push("lang=zh-cn");
    tempArr.push("gameid=" + id + "");
    tempUrl = tempUrl + tempArr.join("&");
    return openWindow(tempUrl, "onlinew88", 1280, 650, "", "");
  };
  $(document).on("click", ".game-begin", function() {
    var url;
    if (isLogin()) {
      url = gameOpen($(this).data("id"), 0);
    }
    return false;
  });
  $(document).on("click", ".slot-item-btn-try", function() {
    gameOpen($(this).data("id"), 1);
    return false;
  });
  return afterTran2();
};
