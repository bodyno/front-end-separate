$(function(){

    $("#realinfo-form").validate($.extend({},validBase,{
        rules: {
            firstName: {
                required: true,
                maxlength:5,
                chinese:true
            },
            lastName:{
                required: true,
                maxlength:15,
                chinese:true
            },
            custGender:{
                required: true
            },
            BirthMonth:{
                required: true
            },
            BirthDay:{
                required: true
            }
        },
        messages:{
            firstName: {
                required: "请输入真实姓名"
            },
            lastName:{
                required: "请输入真实姓名"
            },
            custGender:{
                required: "请选择性别"
            },
            BirthMonth:{
                required: "请选择出生年月"
            },
            BirthDay:{
                required: "请选择出生年月"
            }
        }
    }));


    $("#btn-realinfo").click(function(){
        $(this).commit($("#realinfo-form"),"/sidCustInfo/savePersonInfo",function(){
            dialog.info("修改成功",function(){
                location.reload()
            })
        },null,function(data){
            return $.fn.extend({},data,{
                birthDate:data.BirthYear+"-"+data.BirthMonth+"-"+data.BirthDay
            })
        })
    })

    $(document).on("click", "#btn-passw", function () {
        $(this).commit($("#pass-form"), "/sidCustInfo/savePassword", function () {
            dialog.info("修改成功", function () {
                location.reload()
            })
        })
    });


    //修改密码
    $(document).on("show",".pass-show",function(){
        $("#pass-form").validate($.extend({},validBase,{
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
                    required: "密码不能为空",
                    rangelength: "密码为2-15位"
                },
                newPassword:{
                    required: "新密码不能为空",
                    rangelength: "新密码为2-15位"
                },
                newPassword2:{
                    required: "确认密码不能为空",
                    rangelength: "确认密码为2-15位"
                }
            }
        }));
    })
})