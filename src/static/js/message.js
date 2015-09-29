var afterTran;

afterTran = function() {
  var getInbox, getOutbox, inboxPage, nowDetail, outboxPage, setUnreadCount;
  inboxPage = function(page) {
    if (page > 10 && $(".page-inbox").is(":hidden")) {
      $(".page-inbox").show().pagination({
        items: page,
        itemsOnPage: 10,
        cssStyle: "light-theme",
        onPageClick: function(number) {
          return getInbox(number);
        }
      });
    }
    if (page <= 10) {
      return $(".page-inbox").hide();
    }
  };
  getInbox = function(page) {
    return $.get("/message/listInbox", {
      per_page: 10,
      page: (page ? page : 1)
    }, function(result) {
      return resultHandle(result, function() {
        var tmpl;
        if (result.obj.content && result.obj.content.length) {
          tmpl = doT.template($("#message-tmpl").html())(result.obj.content);
          $(".m-item.active .mcj_g").html(tmpl).i18n();
          $(".m-item.active .mcj_l").show();
        } else {
          $(".m-item.active .mcj_g").html("<h3 class=\"message-no\" data-i18n=\"msg.no\"></h3>").i18n();
          $(".m-item.active .mcj_l").hide();
        }
        inboxPage(result.obj.total);
        return setUnreadCount(result.obj.unRead);
      });
    });
  };
  setUnreadCount = function(number) {
    if (number !== undefined) {
      if (number === 0) {
        return $("#receive-newcounts,#r-read").text("");
      } else {
        return $("#receive-newcounts,#r-read").text(number);
      }
    } else {
      return $("#receive-newcounts,#r-read").text(function() {
        return Number($(this).text()) - 1;
      });
    }
  };
  getOutbox = function(page) {
    return $.get("/message/listOutbox", {
      per_page: 10,
      page: (page ? page : 1)
    }, function(result) {
      return resultHandle(result, function() {
        var i, tempData, tmpl;
        if (result.obj.content && result.obj.content.length) {
          tempData = result.obj.content;
          i = 0;
          while (i < tempData.length) {
            tempData[i].status = "";
            i++;
          }
          tmpl = doT.template($("#message-tmpl").html())(tempData);
          $(".m-item.active .mcj_g").html(tmpl).i18n();
          $(".m-item.active .mcj_l").show();
        } else {
          $(".m-item.active .mcj_g").html("<h3 class=\"message-no\" data-i18n=\"msg.no\"></h3>").i18n();
          $(".m-item.active .mcj_l").hide();
        }
        return outboxPage(result.obj.total);
      });
    });
  };
  outboxPage = function(page) {
    if (page > 10 && $(".page-outbox").is(":hidden")) {
      $(".page-outbox").show().pagination({
        items: page,
        itemsOnPage: 10,
        cssStyle: "light-theme",
        onPageClick: function(number) {
          return getInbox(number);
        }
      });
    }
    if (page <= 10) {
      return $(".page-outbox").hide();
    }
  };
  getInbox();
  $(".mcj_c li").click(function() {
    $(this).addClass("active").siblings().removeClass("active");
    return $(".m-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
  });
  $(document).on("click", "#tab1", function() {
    if (!$(".m-item.active .mcj_g li").length) {
      return getOutbox();
    }
  });
  nowDetail = void 0;
  $(document).on("click", ".mcj_j", function() {
    var _this, tmpl;
    nowDetail = $(this).parents("li");
    if ($(this).parents("li").hasClass("unread")) {
      $(this).parents("li").removeClass("unread");
      $.post("/message/saveCrmMessage", {
        custMessageId: $(this).data("id")
      }, function(result) {
        resultHandle(result);
        return setUnreadCount();
      });
    }
    _this = $(this).children();
    tmpl = doT.template($("#message-detail").html())({
      subject: _this.data("subject"),
      time: _this.data("time"),
      content: _this.data("content")
    });
    $(".msgpop-main").html(tmpl).i18n();
    $("body").css("overflow-y", "hidden");
    $("#fix-messagepopup").css("overflow-y", "scroll").fadeIn();
    return false;
  });
  $(document).on("click", ".m-detail", function() {
    $(this).parents("li").find(".mcj_j").trigger("click");
    return false;
  });
  $(document).on("click", "#btn-close,#message-box .close", function() {
    $(".msgpop-main").html("");
    $("body").css("overflow-y", "auto");
    $("#fix-messagepopup").css("overflow-y", "hidden").fadeOut();
    return false;
  });
  $(document).on("click", ".all", function() {
    if ($(this).is(":checked")) {
      return $(".m-item.active .mcj_g").find(":checkbox").prop("checked", "checked");
    } else {
      return $(".m-item.active .mcj_g").find(":checkbox").removeAttr("checked");
    }
  });
  $(document).on("click", "#del-receivemsg", function() {
    var data, tempCk;
    tempCk = $(".m-item.active .mcj_g").find(":checkbox:checked");
    if (!tempCk.length) {
      dialog.info($.t("valid.msg.1"));
      return false;
    }
    data = [];
    tempCk.each(function() {
      return data.push($(this).val());
    });
    return $.post("/message/deleteCrms", {
      custMessageId: data.join(",")
    }, function(result) {
      return resultHandle(result, function() {
        return tempCk.parents("li").slideUp(function() {
          return $(this).remove();
        });
      });
    });
  });
  $(document).on("click", ".delete-inner", function() {
    $(this).parents("#fix-messagepopup").find(".close").trigger("click");
    return $.post("/message/deleteCrms", {
      custMessageId: nowDetail.find(".mcj_j").data("id")
    }, function(result) {
      return resultHandle(result, function() {
        return nowDetail.slideUp(function() {
          return $(this).remove();
        });
      });
    });
  });
  return $(document).on("click", "#btn-send", function() {
    var message, title;
    title = $("#title").val();
    message = $("#message").val();
    if (!title.length || !message.length) {
      dialog.info($.t("valid.msg.2"));
      return false;
    }
    if (title.length < 2 || message.length < 5) {
      dialog.info($.t("valid.msg.3"));
      return false;
    }
    $.post("/message/saveCrmMessage", {
      messageTo: $("#sendto").val(),
      subject: title,
      content: message
    }, function(result) {
      var button, msgarr;
      msgarr = ["<p><div class=\"msg-plan\"></div></p><p data-i18n=\"[append]valid.msg.5\"><br/></p>"];
      button = {};
      button[$.t("valid.msg.4")] = function() {
        return dialog.close();
      };
      resultHandle(result, function() {
        dialog.custom($.t("valid.msg.6"), msgarr.join(""), button);
        return $(".ui-dialog").i18n();
      });
      $("#inbox .mcj_g").html("");
      return $(".mc-content")[0].reset();
    });
    return false;
  });
};
