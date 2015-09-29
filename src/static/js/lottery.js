var afterTran;

afterTran = function() {
  return $(".lottery-one").on("mouseenter", function() {
    $(this).find(".lottery-text").fadeIn(200);
    return $(this).find(".lottery-btn").animate({
      bottom: 44
    }, 200);
  }).on("mouseleave", function() {
    $(this).find(".lottery-text").fadeOut(200);
    return $(this).find(".lottery-btn").animate({
      bottom: -20
    }, 200);
  });
};
