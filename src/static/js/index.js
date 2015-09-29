var afterTran;

afterTran = function() {
  return $("#go-top").click(function() {
    return $("html,body").animate({
      scrollTop: 0
    }, 200);
  });
};
