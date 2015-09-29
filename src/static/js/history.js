var afterTran;

afterTran = function() {
  $("#starttime").datepicker({
    minDate: "-7d",
    maxDate: new Date(),
    onClose: function(selectedDate) {
      return $("#endtime").datepicker("option", "minDate", selectedDate);
    }
  });
  $("#starttime").datepicker("setDate", new Date());
  $("#endtime").datepicker({
    minDate: "-7d",
    maxDate: new Date(),
    onClose: function(selectedDate) {
      return $("#starttime").datepicker("option", "maxDate", selectedDate);
    }
  });
  $("#endtime").datepicker("setDate", new Date());
  $("body").on("click", ".bet-count", function() {
    $("#productid").val($(this).attr("data-productid"));
    return $("#btn-submit").click();
  });
  $("#history-form").validate($.extend({}, validBase, {}));
  return $("#btn-history").click(function() {
    return $.get("/transaction/listRecords", {
      startDate: $("#starttime").val() + $("#hmstarttime").val(),
      endDate: $("#endtime").val() + $("#hmendtime").val()
    }, function() {
      var tmpl;
      tmpl = doT.template($("#template").html())({});
      return $("#SearchResult").html(tmpl);
    });
  });
};
