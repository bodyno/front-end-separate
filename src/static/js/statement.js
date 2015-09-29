var afterTran;

afterTran = function() {
  var getStatement, statePage;
  statePage = function(page) {
    if (page > 10 && $(".search-page").is(":hidden")) {
      $(".search-page").show().pagination({
        items: page,
        itemsOnPage: 10,
        cssStyle: "light-theme",
        onPageClick: function(number) {
          return getStatement(number);
        }
      });
    }
    if (page <= 10) {
      return $(".search-page").hide();
    }
  };
  getStatement = function(page) {
    $("#statement-loading").show();
    return $.get("/cashier/transRecords", {
      fundsType: $(".trans-type .on").data("value"),
      index: $(".trans-date .on").data("value"),
      per_page: 10,
      page: (page ? page : 1)
    }, function(result) {
      resultHandle(result, function() {
        var tmpl;
        if (result.obj.content && result.obj.content.length) {
          tmpl = doT.template($("#statement-tmpl").html())(result.obj.content);
          $("#search-result").html(tmpl).i18n();
        } else {
          tmpl = doT.template($("#statement-no").html())();
          $("#search-result").html(tmpl).i18n();
        }
        return statePage(result.obj.total);
      });
      return $("#statement-loading").hide();
    });
  };
  getStatement();
  $(document).on("click", ".trans-type a,.trans-date a", function() {
    $(this).addClass("on").siblings().removeClass("on");
    return getStatement();
  });
  return $(document).on("click", "#search-result .detail", function() {
    $.get("/cashier/recordsDetail", {
      balanceLogId: $(this).data("id")
    }, function(result) {
      return resultHandle(result, function(result) {
        var tmpl;
        tmpl = doT.template($("#detail-tmpl").html())(result.obj);
        $("#detail-con").html("").html(tmpl);
        return $("#show-tmpl").trigger("click");
      });
    });
    return false;
  });
};
