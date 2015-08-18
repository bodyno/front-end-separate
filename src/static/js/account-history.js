$(function(){
    $(".input-date").datepicker();

    //分页
    $(".page").pagination({
        items: 1000,
        itemsOnPage: 10,
        hrefTextPrefix:'#page=',
        onPageClick:function(pageNumber){

        }
    });
})