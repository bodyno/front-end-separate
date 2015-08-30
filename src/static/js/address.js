$(function(){

    $.validator.addMethod("receiver", function(value, element) {
        return this.optional(element) || /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value);
    }, "请输入正确的收货人");

    $.validator.addMethod("phone", function(value, element) {
        return this.optional(element) || /^0{0,1}(13\d|14\d|15\d|17\d|18\d)\d{8}$/.test(value);
    }, "请输入正确的手机");

    $("#realinfo-form").validate($.extend({},validBase,{
        rules: {
            province:{
                required: true
            },
            city:{
                required: true
            },
            county:{
                required: true
            },
            address: {
                required: true
            },
            receiverBy:{
                required: true,
                receiver:true
            },
            receiverPhone:{
                required: true,
                phone:true
            }
        }
    }));


    $("#btn-realinfo").click(function(){
        $(this).commit($("#realinfo-form"),"/message/saveCrmMessage",function(){
            dialog.info("修改成功",function(){
                location.reload()
            })
        },null,function(data){
            return $.fn.extend({},data,{
                birthDate:data.BirthYear+"-"+data.BirthMonth+"-"+data.BirthDay
            })
        })
    })
})