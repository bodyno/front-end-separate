$(function(){
    $("#test").datepicker()
})
$(function(){
    //设置时间控件
    $("#starttime").datepicker({
        minDate: "-7d", maxDate: new Date(), onClose: function (selectedDate) {
            $("#endtime").datepicker("option", "minDate", selectedDate);
        }
    });
    $("#starttime").datepicker("setDate", new Date());
    $("#endtime").datepicker({
        minDate: "-7d", maxDate: new Date(), onClose: function (selectedDate) {
            $("#starttime").datepicker("option", "maxDate", selectedDate);
        }
    });
    $("#endtime").datepicker("setDate", new Date());


    //点击笔数
    $("body").on("click", ".bet-count", function(){
        $("#productid").val($(this).attr("data-productid"));
        $("#btn-submit").click();
    });

    $("#history-form").validate($.extend({},validBase,{}));


    $("#btn-history").click(function(){
        $(this).commit($("#history-form"),"/member/history",function(result){
            var tmpl = doT.template($("#template").html())({})

            $("#SearchResult").html(tmpl)
        })
    })

});
