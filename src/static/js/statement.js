function afterTran(){
    function statePage(page){
        if(page>10&&$(".search-page").is(":hidden")){
            $(".search-page").show().pagination({
                items: page,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                onPageClick:function(number){
                    getStatement(number)
                }
            });
        }
        if(page<=10){
            $(".search-page").hide()
        }
    }

    function getStatement(page){
        $("#statement-loading").show()
        $.get("/cashier/transRecords",{
            fundsType:$(".trans-type .on").data("value"),
            index:$(".trans-date .on").data("value"),
            per_page:10,
            page:page?page:1
        },function(result){
            resultHandle(result,function(){
                if(result.obj.content&&result.obj.content.length){
                    var tmpl = doT.template($("#statement-tmpl").html())(result.obj.content)
                    $("#search-result").html(tmpl).i18n();
                }else{
                    var tmpl = doT.template($("#statement-no").html())()
                    $("#search-result").html(tmpl).i18n();
                }
                statePage(result.obj.total)
            })
            $("#statement-loading").hide()
        })
    }

    getStatement()


    $(document).on("click",".trans-type a,.trans-date a",function(){
        $(this).addClass("on").siblings().removeClass("on")
        getStatement()
    })

    //详情
    $(document).on("click","#search-result .detail",function(){
        $.get("/cashier/recordsDetail",{
            balanceLogId:$(this).data("id")
        }, function (result) {
            resultHandle(result,function(result){
                var tmpl = doT.template($("#detail-tmpl").html())(result.obj);
                $("#detail-con").html("").html(tmpl);
                $("#show-tmpl").trigger("click");
            })
        })
        return false;
    })

}