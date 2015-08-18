$(function(){

    $("#transfer-form").validate($.extend({},validBase,{
        rules: {
            fromType: {
                required:true
            },
            toType: {
                required:true,
                notEqual:"#fromType"
            },
            ammount: {
                required:true,
                number:true,
                digits:true,
                min:1
            }
        },
        messages:{
            fromType: {
                toType:"转入转出不能相同"
            },
            ammount: {
                required:"请输入转账金额",
                number:"请输入正确的转账金额",
                digits:"请输入正确的转账金额",
                min:"最小转账金额为1"
            }
        }
    }))


    $("#transfer-btn").click(function(){
        $(this).commit($("#transfer-form"),"/sidCustInfo/transFunds",function(){
            dialog.info("转账成功",function(){
                location.reload()
            });
        })
    })

})