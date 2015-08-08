$(function(){

    //登录验证
    $("#login-form").validate({
        rules: {
            operator: {
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
            operator:{
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
        },
        success: function(label) {
            label.addClass("success");
        },
        unhighlight:function(element){
            $(element).parent().addClass("ok").removeClass("red");
            if(!$(element).parent().find("b").length){
                $(element).parent().append("<b></b>")
            }
        },
        highlight: function(element, errorClass) {
            $(element).parent().addClass("red").removeClass("ok").find("." + errorClass).removeClass("success");
            if(!$(element).parent().find("b").length){
                $(element).parent().append("<b></b>")
            }
        },
        errorPlacement:function(error, element) {
            //element.parent().next(".reg-help").remove();
            error.appendTo(element.parent());
        }
    });

    //登录按钮
    $("#login-btn").click(function(){
        $("#login-form").form()
        if($("#login-form").valid()){
            var _this=$(this)
            _this.btn("loading")
            $.post("/login",$("#login-form").form()).success(function(result){
                if(result.code=="200"){
                    dialog.error("提示","登录成功，下一步?")
                }else{
                    showError(result.msg)
                }
                _this.btn("reset")
            })
        }
    })

    //验证码刷新
    $(".reg-code-img,.code-text span").click(function () {
        changeCode()
    })
    function changeCode(){
        $(".reg-code-img").attr("src","/validateCode?"+new Date().getTime())
    }


})
