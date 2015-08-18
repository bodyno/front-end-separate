$(function(){
    $(document).on("mouseenter",".slot-item",function(){
        $(this).find(".slot-item-btn").stop().fadeIn(300)
    }).on("mouseleave",".slot-item",function(){
        $(this).find(".slot-item-btn").stop().fadeOut(300)
    })

    function where(arr, num) {
        // Find my place in this sorted array.
        for(var i=0;i<arr.length;i++){
            if(arr[i]>num){
                return i+1;
            }
        }
    }

    console.log(where([40, 60], 50))
})