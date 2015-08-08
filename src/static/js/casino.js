$(function(){
    $(document).on("mouseenter",".feature",function(){
        if(!$(".feature-center:animated").length){
            if($(this).hasClass("feature-left")){
                moveBig($(this))
                moveRight($(".feature-center"),10)
                moveLeft($(".feature-right"),9)
            }
            if($(this).hasClass("feature-right")){
                moveBig($(this))
                moveLeft($(".feature-center"),10)
                moveRight($(".feature-left"),9)
            }
        }
    })

    function moveBig(ele){
        ele.css({
            "zIndex":12
        }).animate({
            "width": 649,
            "height": 408,
            "left":143,
            "top":48
        },500,function(){
            ele.attr("class","feature feature-center")
        })
    }
    function moveLeft(ele,index){
        ele.css({
            "zIndex":index
        }).animate({
            "width": 335,
            "height": 239,
            "left":-45,
            "top":117
        },500,function(){
            ele.attr("class","feature feature-left")
        })
    }
    function moveRight(ele,index){
        ele.css({
            "zIndex":index
        }).animate({
            "width": 335,
            "height": 239,
            "left":662,
            "top":117
        },500,function(){
            ele.attr("class","feature feature-right")
        })
    }
})