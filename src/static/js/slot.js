$(function(){
    $(document).on("mouseenter",".slot-item",function(){
        $(this).find(".slot-item-btn").stop().fadeIn(300)
    }).on("mouseleave",".slot-item",function(){
        $(this).find(".slot-item-btn").stop().fadeOut(300)
    })
})