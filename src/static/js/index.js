$(function(){

    $(".product-s-item").hoverIntent(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".product-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    });

})