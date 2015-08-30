i18n.init({
    lng:getNowLng(),
    resGetPath: '/static/local/lng/__lng__/__ns__.json',
    fallbackLng:[],
    ns:{
        namespaces: [translate_page,'base'],
        defaultNs: translate_page
    },
    cookieName:'lng',
    cookieExpirationTime:100000
}).done(function(){
    $('html').i18n();

    $(function(){
        window.afterTran&&afterTran()
    })
});

function getNowLng(){
    if($.cookie('lng')){
        return $.cookie('lng');
    }else{
        return 'zh.cn'
    }
}

$(document).on("click",".language-item",function(){
    var _this=$(this)
    _this.parents(".language,.page-header-language").find(".language-now").text(_this.text())
    _this.parents(".language-list").hide();
    i18n.setLng(_this.data("value"),function(){
        loadLngCss(_this.data('value'))
        $('html').i18n();
    })
})

//动态加载国际化样式
function loadLngCss(lng){
    if(lng=="zh.cn"){
        $("#lng-css").remove()
        return false;
    }
    if(lng=="en"){
        if(!$("#lng-css").length){
            $("head").append('<link rel="stylesheet" id="lng-css" href="/static/local/css/'+lng+'.css"/>')
        }else{
            $("#lng-css").attr("href","/static/local/css/"+lng+".css")
        }
    }
}