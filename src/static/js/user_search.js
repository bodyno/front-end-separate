$(function(){
    $(".user-history-item").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".user-history-type").eq($(this).index()).addClass("active").siblings().removeClass("active");
    })
})