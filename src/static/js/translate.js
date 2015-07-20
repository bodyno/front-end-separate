i18n.init({
    lng:getNowLng(),
    resGetPath: '/static/locales/__lng__/__ns__.json',
    fallbackLng:[],
    ns:{
        namespaces: ['login','base'],
        defaultNs: 'login'
    },
    cookieExpirationTime:100000
}).done(function(){
    $('html').i18n();
});

function getNowLng(){
    if($.cookie('i18next')){
        return $.cookie('i18next');
    }else{
        return 'zh.cn'
    }
}

$(document).on('click','.sel-country',function(){
    i18n.setLng('en',function(){
        $('html').i18n();
    })
})