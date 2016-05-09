!function(){
  $(".menu-main").click(function(){
    var ele=$(this).next(".menu-sub");
    ele.toggleClass("active");
  })
}()
