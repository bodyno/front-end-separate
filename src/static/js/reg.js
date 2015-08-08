$(function(){

    var tempRule={
        operator: {
            remote: "/checkOperate",
            required:true,
            rangelength:[2,15]
        },
        passwd: {
            required:true,
            minlength:5
        },
        repasswd: {
            required:true,
            equalTo:'#passwd'
        }
    }
    var tempMessage={
        operator:{
            "remote": "对不起，用户名已经被使用",
            "required":"用户名必须填写",
            "rangelength":"用户名长度为2-15位"
        },
        passwd:{
            "required":"密码必须填写",
            "minlength":"密码最少5位"
        },
        repasswd: {
            "required":"请输入确认密码",
            "equalTo":"两次密码必须相同"
        }
    }

    !function(){

        $.validator.addMethod("chinese", function(value, element) {
            return this.optional(element) || /^[A-Za-z0-9\u4E00-\u9FA5]+$/.test(value);
        }, "只能包括中文字、英文字母、数字");

        $.validator.addMethod("string", function(value, element) {
            return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
        }, "只能包括英文字母、数字");

        $.validator.addMethod("zh", function(value, element) {
            return this.optional(element) || /^[A-Za-z\u4E00-\u9FA5]+$/.test(value);
        }, "只能包括英文字母、中文");

        $.validator.addMethod("en", function(value, element) {
            return this.optional(element) || /^[A-Za-z]+$/.test(value);
        }, "只能包括英文字母");

        $.validator.addMethod("date", function(value, element) {
            return this.optional(element) || /^\d{4}-\d{2}-\d{2}$/.test(value);
        }, "请选择正确的日期");

        $.validator.addMethod("qq", function(value, element) {
            return this.optional(element) || /^\d{5,12}$/.test(value);
        }, "请输入正确的QQ");

        $.validator.addMethod("phone", function(value, element) {
            return this.optional(element) || /^\d{7,11}$/.test(value);
        }, "请输入正确的手机号");

        $.validator.addMethod("cardno", function(value, element) {
            return this.optional(element) || /^\S{9,18}$/.test(value);
        }, "请输入正确的证件");

        //国家
        var tempEle=$("#country")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('country','请选择国家')
            }
        }
        //邮箱
        tempEle=$("#email")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('email','请输入邮箱')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['email']['email']=true;
                    tempMessage['email']['email']='请输入正确的邮箱';
                }
            }
        }
        //介绍人
        tempEle=$("#introduce")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('introduce','请输入介绍人')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['introduce']['minlength']=2;
                    tempRule['introduce']['maxlength']=50;
                    tempMessage['introduce']['minlength']='介绍人最少2个字符';
                    tempMessage['introduce']['maxlength']='介绍人最多50个字符';
                }
            }
        }
        //验证码
        tempEle=$("#validateCode")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('validateCode','验证码不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['validateCode']['remote']='/checkValidateCode';
                    tempRule['validateCode']['minlength']=4;
                    tempRule['validateCode']['maxlength']=4;

                    tempMessage['validateCode']['remote']='验证码错误';
                    tempMessage['validateCode']['minlength']='请输入4位验证码';
                    tempMessage['validateCode']['maxlength']='请输入4位验证码';
                }
            }
        }
        //姓
        tempEle=$("#surname")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('surname','姓不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['surname']['minlength']=2;
                    tempRule['surname']['maxlength']=30;
                    tempRule['surname']['zh']=true;

                    tempMessage['surname']['minlength']='最少2位';
                    tempMessage['surname']['maxlength']='最多30位';
                }
            }
        }
        //名
        tempEle=$("#name")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('name','名不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['name']['minlength']=2;
                    tempRule['name']['maxlength']=30;
                    tempRule['name']['zh']=true;

                    tempMessage['name']['minlength']='最少2位';
                    tempMessage['name']['maxlength']='最多30位';
                }
            }
        }
        //昵称
        tempEle=$("#realname")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('realname','昵称不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['realname']['minlength']=2;
                    tempRule['realname']['maxlength']=30;
                    tempRule['realname']['chinese']=true;

                    tempMessage['realname']['minlength']='最少2位';
                    tempMessage['realname']['maxlength']='最多30位';
                }
            }
        }
        //英文姓名
        tempEle=$("#enname")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('enname','英文姓名不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['enname']['minlength']=2;
                    tempRule['enname']['maxlength']=30;
                    tempRule['enname']['en']=true;

                    tempMessage['enname']['minlength']='最少2位';
                    tempMessage['enname']['maxlength']='最多30位';
                }
            }
        }
        //生日
        tempEle=$("#birthday")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('birthday','生日不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['birthday']['date']=true;
                }
            }
        }
        //QQ
        tempEle=$("#qq")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('qq','QQ不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['qq']['qq']=true;
                }
            }
        }
        //取款密码
        tempEle=$("#moneypassword")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('moneypassword','取款密码不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['moneypassword']['maxlength']=16;
                    tempMessage['moneypassword']['maxlength']='最多16位';
                }
            }
        }
        //手机
        tempEle=$("#phone")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('phone','手机不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['phone']['phone']=true;
                }
            }
        }
        //证件类型
        tempEle=$("#card")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('card','证件类型不能为空')
            }
        }
        //证件
        tempEle=$("#cardno")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('cardno','证件不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['cardno']['cardno']=true;
                }
            }
        }


    }()

    function initRequire(filed,txt){
        tempRule[filed]={};
        tempMessage[filed]={};
        tempRule[filed]['required']=true;
        tempMessage[filed]['required']=txt;
    }

    //注册验证
    $("#reg-form").validate({
        rules: tempRule,
        messages:tempMessage,
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

    //邮箱自动完成
    $("#email").mailAutoComplete();
    $("#birthday").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: "1960:"+new Date().getFullYear(),
        onSelect:function(date,ele){
            $(ele.input).trigger("blur");
        }
    });

    //注册按钮
    $("#reg-btn").click(function(){
        if($("#reg-form").valid()){
            var _this=$(this)
            _this.btn("loading")
            $.post("/register",$("#reg-form").form()).success(function(result){
                if(result.code=="200"){
                    dialog.error("提示","注册成功，下一步?")
                }else{
                    showError(result.msg)
                }
                _this.btn("reset")
            })
        }
    })

    //验证码刷新
    $(".reg-code-img").click(function () {
        changeCode()
    })
    function changeCode(){
        $(".reg-code-img").attr("src","/validateCode?"+new Date().getTime())
    }


})

/*
function afterTran(){
    $("#country,#card").customSelect();
}*/
