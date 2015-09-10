function afterTran(){
    $("#go-top").click(function(){
        $("html,body").animate({"scrollTop":0},200);
    })
}