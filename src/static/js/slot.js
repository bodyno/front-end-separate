$(function(){
    $(document).on("mouseenter",".slot-item",function(){
        $(this).find(".slot-item-btn").stop().fadeIn(300)
    }).on("mouseleave",".slot-item",function(){
        $(this).find(".slot-item-btn").stop().fadeOut(300)
    })


    iapiSetCallout('Login', calloutLogin);
    iapiSetCallout('Logout', calloutLogout);

    //iapiLogin("DWTEST100", "123123", 1, "zh-cn");
    iapiLogin("IG99TEST60", "123123", 1, "zh-cn");

    $(document).on("click",".slot-item-btn-begin",function(){

        window.open('/pt', 'onlinept',1280,650,'',0);

        return false;

    })

    function calloutLogin(allSessions){
        console.log(allSessions)
    }
    function calloutLogout(response){
        console.log(response)
    }

})