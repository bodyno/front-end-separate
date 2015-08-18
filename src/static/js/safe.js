$(function(){
    $("#btn-passw").click(function(){
        $(this).commit($("#safe-form"),"/sidCustInfo/savePassword",function(){
            dialog.info("修改成功",function(){
                location.reload()
            })
        })
    });

    //注册验证
    $("#safe-form").validate($.extend({},validBase,{
        rules: {
            oldPassword: {
                required: true,
                rangelength: [2, 15]
            },
            newPassword:{
                required: true,
                rangelength: [2, 15],
                notEqual:"#oldPassword"
            },
            newPassword2:{
                required: true,
                equalTo:'#newPassword'
            }
        },
        messages:{
            oldPassword: {
                required: "当前密码不能为空",
                rangelength: "当前密码长度为2-15位"
            },
            newPassword:{
                required: "新密码不能为空",
                rangelength: "新密码长度为2-15位"
            },
            newPassword2:{
                required: "确认密码不能为空",
                rangelength: "确认密码长度为2-15位"
            }
        }
    }));
})