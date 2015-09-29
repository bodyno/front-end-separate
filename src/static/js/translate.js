var getNowLng, i, loadLngCss, tempArr;

getNowLng = function() {
  if ($.cookie("lng")) {
    return $.cookie("lng");
  } else {
    return "zh.cn";
  }
};

loadLngCss = function(lng) {
  if (lng === "zh.cn") {
    $("#lng-css").remove();
    return false;
  }
  if (lng === "en") {
    if (!$("#lng-css").length) {
      return $("head").append("<link rel=\"stylesheet\" id=\"lng-css\" href=\"/static/local/css/" + lng + ".css\"/>");
    } else {
      return $("#lng-css").attr("href", "/static/local/css/" + lng + ".css");
    }
  }
};

tempArr = [translate_page, "base"];

if (window.page_inner) {
  i = 0;
  while (i < page_inner.length) {
    tempArr.push(page_inner[i]);
    i++;
  }
}

i18n.init({
  lng: getNowLng(),
  resGetPath: "/static/local/lng/__lng__/__ns__.json",
  fallbackLng: [],
  ns: {
    namespaces: tempArr,
    defaultNs: translate_page
  },
  cookieName: "lng",
  cookieExpirationTime: 100000
}).done(function() {
  $("html").i18n();
  if ($("#tran-status").data("id") !== "1") {
    setTimeout((function() {
      return $("html").i18n();
    }), 0);
  }
  return $(function() {
    window.afterTranCore && afterTranCore();
    return window.afterTran && afterTran();
  });
});

$(document).on("click", ".language-item", function() {
  var _this;
  _this = $(this);
  if (_this.data("value")) {
    _this.parents(".language,.page-header-language").find(".language-now").text(_this.text());
    _this.parents(".language-list").hide();
    return i18n.setLng(_this.data("value"), function() {
      loadLngCss(_this.data("value"));
      return location.reload();
    });
  } else {
    return dialog.info($.t("base:no_lang"));
  }
});
