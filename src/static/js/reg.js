$(function(){

    var tempRule={
        custCode: {
            remote: "/checkCustCode",
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
        custCode:{
            "remote": "对不起,用户名已经被使用",
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

        //国家
        var tempEle=$("#country")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('country','请选择国家')
            }
        }
        //邮箱
        tempEle=$("#emailAddress")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('emailAddress','请输入邮箱')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['emailAddress']['email']=true;
                    tempMessage['emailAddress']['email']='请输入正确的邮箱';
                }
            }
        }
        //介绍人
        tempEle=$("#affiliateId")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('affiliateId','请输入介绍人')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['affiliateId']['minlength']=2;
                    tempRule['affiliateId']['maxlength']=50;
                    tempMessage['affiliateId']['minlength']='介绍人最少2个字符';
                    tempMessage['affiliateId']['maxlength']='介绍人最多50个字符';
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
        tempEle=$("#firstName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('firstName','姓不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['firstName']['minlength']=2;
                    tempRule['firstName']['maxlength']=30;
                    tempRule['firstName']['zh']=true;

                    tempMessage['firstName']['minlength']='最少2位';
                    tempMessage['firstName']['maxlength']='最多30位';
                }
            }
        }
        //名
        tempEle=$("#lastName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('lastName','名不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['lastName']['minlength']=2;
                    tempRule['lastName']['maxlength']=30;
                    tempRule['lastName']['zh']=true;

                    tempMessage['lastName']['minlength']='最少2位';
                    tempMessage['lastName']['maxlength']='最多30位';
                }
            }
        }
        //昵称
        tempEle=$("#nickName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('nickName','昵称不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['nickName']['minlength']=2;
                    tempRule['nickName']['maxlength']=30;
                    tempRule['nickName']['chinese']=true;

                    tempMessage['nickName']['minlength']='最少2位';
                    tempMessage['nickName']['maxlength']='最多30位';
                }
            }
        }
        //英文姓名
        tempEle=$("#enName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('enName','英文姓名不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['enName']['minlength']=2;
                    tempRule['enName']['maxlength']=30;
                    tempRule['enName']['en']=true;

                    tempMessage['enName']['minlength']='最少2位';
                    tempMessage['enName']['maxlength']='最多30位';
                }
            }
        }
        //生日
        tempEle=$("#birthDate")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('birthDate','生日不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['birthDate']['date']=true;
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
        tempEle=$("#drawPwd")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('drawPwd','取款密码不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['drawPwd']['maxlength']=16;
                    tempMessage['drawPwd']['maxlength']='最多16位';
                }
            }
        }
        //手机
        tempEle=$("#mobileNumber")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('mobileNumber','手机不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['mobileNumber']['phone']=true;
                }
            }
        }
        //证件类型
        tempEle=$("#certificateType")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('certificateType','证件类型不能为空')
            }
        }
        //证件
        tempEle=$("#certificate")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('certificate','证件不能为空')
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['certificate']['cardno']=true;
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
    $("#reg-form").validate($.extend({},validBase,{
        rules: tempRule,
        messages:tempMessage
    }));

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
        $(this).commit($("#reg-form"),"/register",function(){
            location.href="/profile"
        },function(){

        })
    })

    //验证码刷新
    $(".reg-code-img").click(function () {
        changeCode()
    })
    function changeCode(){
        $(".reg-code-img").attr("src","/validateCode?"+new Date().getTime())
    }

    function refHandle() {
        var refId = getQueryString("affiliateId");
        if (refId) {
            var date = new Date();
            date.setMinutes(new Date().getMinutes() + 30)
            $.cookie("refId", refId, {
                expires: date
            })
        } else {
            refId = $.cookie("refId")
        }
        if(refId){
            setref(refId)
        }
    }
    refHandle()

    function setref(refId){
        $("#affiliateId").val(refId)
        $("#affiliateId-hidden").val(refId)
    }


})
