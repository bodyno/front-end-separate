var afterTran;

afterTran = function() {
  return $(".promotion-btn-more").click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      return $(this).parents(".promotion-item").find(".promotion-detail").slideUp(200);
    } else {
      $(this).addClass("active");
      return $(this).parents(".promotion-item").find(".promotion-detail").slideDown(200);
    }
  });
};
