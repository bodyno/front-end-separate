$(function(){

    if(getQueryString("more")){
        $(".card-con").show()
        $(".withdraw-con").hide()
    }else{
        $(".withdraw-con").show()
    }


    $(document).on("click","#pass-set",function(){
        var pass=[]
        $(".pass-set select").each(function(){
            pass.push($(this).val())
        })
        $.post("/sidCustInfo/savPayPassword",{
            payPassWord:pass.join("")
        },function(result){
            resultHandle(result,function(){
                dialog.info("提款密码设置成功",function(){
                    location.reload()
                });
            })
        })
    })

    if($("#card-form").length){
        $("#card-form").validate($.extend({},validBase,{
            rules: {
                bankNo: {
                    required: true
                },
                custBankacctNo:{
                    required: true,
                    number:true
                },
                bankProvince:{
                    required: true
                },
                bankCity:{
                    required: true
                },
                bankAddr:{
                    required: true
                }
            },
            messages:{
                custBankacctNo:{
                    number:"请输入正确的银行账号"
                }
            }
        }));
    }

    $(document).on("click","#bind-card",function(){
        $(this).commit($("#card-form"),"/sidCustInfo/bindBank",function(){
            dialog.info("绑定银行卡成功",function(){
                location.reload()
            })
        })
    })


    //验证码刷新
    $(document).on("click",".code",function(){
        $(this).attr("src","/static/images/temp_code2.jpg?"+new Date().getTime())
    })

    $(document).on("click","#withdraw-btn",function(){
        $(this).commit($("#withdraw-form"),"/cashier/withdraw",function(){
            dialog.info("提款成功",function(){
                location.reload()
            })
        },null,function(result){
            return $.extend({},result,{
                custBankacctId:"1231231"
            })
        })
    })

    if($("#withdraw-form").length){
        $("#withdraw-form").validate($.extend({},validBase,{
            rules: {
                ammount: {
                    required: true,
                    number:true
                },
                payPassword:{
                    required: true,
                    number:true
                },
                validCode:{
                    required: true,
                    number:true
                }
            },
            messages:{
                ammount:{
                    number:"请输入正确的提款金额"
                },
                payPassword:{
                    number:"请输入正确的提款密码"
                },
                validCode:{
                    number:"请输入正确的认证码"
                },
            }
        }));
    }


})