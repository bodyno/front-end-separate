var afterTran;

afterTran = function() {
  $(document).on("click", ".start", function() {
    var tempUrl;
    if (isLogin()) {
      tempUrl = "http://casino.w88uat.com/?op=IG99&m=2d&token=" + $("#token").val() + "&lang=zh-cn";
      openWindow(tempUrl, "onlinecasino", 1280, 650, "", "");
    }
    return false;
  });
  $(document).on("click", ".casino-t-i", function() {
    $(".casino-t").toggleClass("active");
    $(".casino-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    return false;
  });
  return $(document).on("mouseenter", ".cg-col", function() {
    return $(this).addClass("active");
  }).on("mouseleave", ".cg-col", function() {
    return $(this).removeClass("active");
  });
};
