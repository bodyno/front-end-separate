$(function(){
    $(".fix-icon").hoverIntent(function(){
        $(this).find(".fix-icon-text,.fix-qcode").show();
    },function(){
        $(this).find(".fix-icon-text,.fix-qcode").hide();
    })

    $(".account-nav-right").click(function(){
        var href=$(".page-menu-list .active").next().find("a").attr("href");
        if(href) location.href=href;
    })
    $(".account-nav-left").click(function(){
        var href=$(".page-menu-list .active").prev().find("a").attr("href");
        if(href) location.href=href;
    })
})