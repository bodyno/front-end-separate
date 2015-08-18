$(function(){

    //登录验证
    $("#login-form").validate($.extend({},validBase,{
        rules: {
            custCode: {
                required:true,
                rangelength:[2,15]
            },
            passwd: {
                required:true,
                minlength:6,
                maxlength:20
            },
            validateCode: {
                remote: "/checkValidateCode",
                required:true,
                maxlength:4,
                minlength:4
            }
        },
        messages:{
            custCode:{
                "required":"用户名必须填写",
                "rangelength":"用户名长度为2-15位"
            },
            passwd:{
                "required":"密码必须填写",
                "minlength":"密码长度6-20个字符",
                "maxlength":"密码长度6-20个字符"
            },
            validateCode: {
                "remote": "验证码错误",
                "required":"验证码不能为空",
                "maxlength":"请输入4位验证码",
                "minlength":"请输入4位验证码"
            }
        }
    }));

    //登录按钮
    $("#login-btn").click(function(){
        $(this).commit($("#login-form"),"/login",function(){
            location.href="/profile"
        })
    })

    //验证码刷新
    $(".reg-code-img,.code-text span").click(function () {
        changeCode()
    })
    function changeCode(){
        $(".reg-code-img").attr("src","/validateCode?"+new Date().getTime())
    }


})
