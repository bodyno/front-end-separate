function afterTran(){
    var tempRule={
        custCode: {
            remote: "/checkCustCode",
            required:true,
            rangelength:[6,12],
            string:true
        },
        passwd: {
            required:true,
            rangelength:[6,12],
            string:true
        },
        repasswd: {
            required:true,
            equalTo:'#passwd',
            rangelength:[6,12],
            string:true
        }
    }
    var tempMessage={
        custCode:{
            "remote": $.t("js.1"),
            "required":$.t("js.2"),
            "rangelength":$.t("js.3")
        },
        passwd:{
            "required":$.t("js.4"),
            "rangelength":$.t("js.5")
        },
        repasswd: {
            "required":$.t("js.6"),
            "equalTo":$.t("js.7")
        }
    }

    !function(){

        //国家
        var tempEle=$("#country")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('country',$.t("js.8"))
            }
        }
        //邮箱
        tempEle=$("#emailAddress")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('emailAddress',$.t("js.9"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['emailAddress']['email']=true;
                    tempMessage['emailAddress']['email']=$.t("js.10");
                }
            }
        }
        //介绍人
        tempEle=$("#affiliateId")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('affiliateId',$.t("js.11"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['affiliateId']['minlength']=2;
                    tempRule['affiliateId']['maxlength']=50;
                    tempMessage['affiliateId']['minlength']=$.t("js.12");
                    tempMessage['affiliateId']['maxlength']=$.t("js.13");
                }
            }
        }
        //验证码
        tempEle=$("#validateCode")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('validateCode',$.t("js.14"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['validateCode']['remote']='/checkValidateCode';
                    tempRule['validateCode']['minlength']=4;
                    tempRule['validateCode']['maxlength']=4;

                    tempMessage['validateCode']['remote']=$.t("js.15");
                    tempMessage['validateCode']['minlength']=$.t("js.16");
                    tempMessage['validateCode']['maxlength']=$.t("js.17");
                }
            }
        }
        //姓
        tempEle=$("#firstName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('firstName',$.t("js.18"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['firstName']['minlength']=2;
                    tempRule['firstName']['maxlength']=6;
                    tempRule['firstName']['zh']=true;

                    tempMessage['firstName']['minlength']=$.t("js.19");
                    tempMessage['firstName']['maxlength']=$.t("js.20");
                }
            }
        }
        //名
        tempEle=$("#lastName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('lastName',$.t("js.21"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['lastName']['minlength']=2;
                    tempRule['lastName']['maxlength']=20;
                    tempRule['lastName']['zh']=true;

                    tempMessage['lastName']['minlength']=$.t("js.22");
                    tempMessage['lastName']['maxlength']=$.t("js.23");
                }
            }
        }
        //昵称
        tempEle=$("#nickName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('nickName',$.t("js.24"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['nickName']['minlength']=2;
                    tempRule['nickName']['maxlength']=30;
                    tempRule['nickName']['chinese']=true;

                    tempMessage['nickName']['minlength']=$.t("js.25");
                    tempMessage['nickName']['maxlength']=$.t("js.26");
                }
            }
        }
        //英文姓名
        tempEle=$("#enName")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('enName',$.t("js.27"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['enName']['minlength']=2;
                    tempRule['enName']['maxlength']=30;
                    tempRule['enName']['en']=true;

                    tempMessage['enName']['minlength']=$.t("js.28");
                    tempMessage['enName']['maxlength']=$.t("js.29");
                }
            }
        }
        //生日
        tempEle=$("#birthDate")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('birthDate',$.t("js.30"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['birthDate']['date']=true;
                }
            }
        }
        //QQ
        tempEle=$("#qq")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('qq',$.t("js.31"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['qq']['qq']=true;
                }
            }
        }
        //取款密码
        tempEle=$("#drawPwd")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('drawPwd',$.t("js.32"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['drawPwd']['maxlength']=16;
                    tempMessage['drawPwd']['maxlength']=$.t("js.33");
                }
            }
        }
        //手机
        tempEle=$("#mobileNumber")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('mobileNumber',$.t("js.34"))
                if(tempEle.parents(".reg-group").data("valid")){
                    tempRule['mobileNumber']['phone']=true;
                }
            }
        }
        //证件类型
        tempEle=$("#certificateType")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('certificateType',$.t("js.35"))
            }
        }
        //证件
        tempEle=$("#certificate")
        if(tempEle.length){
            if(tempEle.parents(".reg-group").data("require")){
                initRequire('certificate',$.t("js.36"))
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
    $("#birthDate").prop("readonly","readonly").datepicker({
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
            location.href="/register_success"
        })
    })

    $("#reg-form").keyup(function(e){
        if(e.keyCode==13){
            $("#reg-btn").trigger("click")
        }
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
}