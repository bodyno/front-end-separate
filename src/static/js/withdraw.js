function afterTran(){
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
                dialog.info($.t("valid.with.1"),function(){
                    location.reload()
                });
            })
        })
    })

    if($("#card-form").length){
        $("#card-form").validate($.extend({},validBase,{
            rules: {
                bankId: {
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
                    number:$.t("valid.with.2")
                }
            }
        }));

        $.get("/cashier/listProvince",function(result){
            resultHandle(result,function(){
                var html=[];
                result=result.obj;
                for(var i=0;i<result.length;i++){
                    html.push('<option data-id="'+result[i].provinceid+'" value="'+result[i].provincename+'">'+result[i].provincename+'</option>')
                }
                $("#bankProvince option:eq(0)").after(html);
            })
        })

        $("#bankProvince").change(function(){
            $.get("/cashier/listCity",{
                provinceid:$("#bankProvince option:selected").data("id")
            },function(result){
                resultHandle(result,function(){
                    var html=[];
                    result=result.obj;
                    for(var i=0;i<result.length;i++){
                        html.push('<option data-id="'+result[i].cityid+'" value="'+result[i].cityname+'">'+result[i].cityname+'</option>')
                    }
                    $("#bankCity option:not(:eq(0))").remove();
                    $("#bankCity option:eq(0)").after(html);
                })
            })
        })
    }

    $(document).on("click","#bind-card",function(){
        $(this).commit($("#card-form"),"/sidCustInfo/bindBank",function(){
            dialog.info($.t("valid.with.3"),function(){
                location.href="/payment/withdraw"
            })
        })
    })


    //验证码刷新
    $(document).on("click",".code",function(){
        $(this).attr("src","/payCode?"+new Date().getTime())
    })

    $(document).on("click","#withdraw-btn",function(){
        $(this).commit($("#withdraw-form"),"/cashier/withdraw",function(){
            dialog.info($.t("valid.with.4"),function(){
                location.reload()
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
                    remote:"/checkPayCode"
                },
                remarks:{
                    required: true
                }
            },
            messages:{
                ammount:{
                    number:$.t("valid.with.5")
                },
                payPassword:{
                    number:$.t("valid.with.6")
                },
                validCode:{
                    remote:$.t("valid.with.7")
                }
            }
        }));
    }


    $(document).on("click",".card-table tr",function(){
        if($(this).find(":radio").length){
            if(!$(this).find(":checked").length){
                $(".card-table").find(":checked").removeAttr("checked")
                $(this).find(":radio").prop("checked","checked")
            }
        }
        return false;
    })
}