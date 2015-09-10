function afterTran(){
    $(document).on("focus","#amount",function(){
        $(this).prev().hide()
    })

    $(document).on("blur","#amount",function(){
        if(!$(this).val()){
            $(this).prev().show()
        }
    })

    $("#transfer-form").validate($.extend({},validBase,{
        rules: {
            fromType: {
                required:true
            },
            toType: {
                required:true,
                notEqual:"#source-transfer"
            },
            ammount: {
                required:true,
                number:true,
                digits:true,
                min:1
            }
        },
        messages:{
            toType: {
                notEqual: $.t("valid.tran.1")
            },
            ammount: {
                required:$.t("valid.tran.2"),
                number:$.t("valid.tran.3"),
                digits:$.t("valid.tran.4"),
                min:$.t("valid.tran.5")
            }
        }
    }))

    $("#transfer-btn").click(function(){
        $(this).commit($("#transfer-form"),"/cashier/transfer",function(){
            dialog.info($.t("valid.tran.ok"),function(){
                location.reload()
            });
        })
    })

    $(".s-d-exchange").click(function(){
        var temp=$("#source-transfer").html();
        var tempVal=$("#source-transfer").val()
        $("#source-transfer").html($("#desc-transfer").html()).val($("#desc-transfer").val())
        $("#desc-transfer").html(temp).val(tempVal);
    })
}