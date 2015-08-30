$(function(){
    $(".mcj_c li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".m-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    })


    $.get("/message/listInbox",function(result){
        resultHandle(result,function(){
            if(result.data.length){
                var tmpl = doT.template($("#message-tmpl").html())(result.data)
                $(".m-item.active .mcj_g").html(tmpl);
                $(".m-item.active .mcj_l").show();
            }else{
                $(".m-item.active .mcj_g").html('<h3 class="message-no">您还未有任何信息哦~</h3>');
            }
        })
    })

    //发件箱
    $(document).on("click","#tab1",function(){
        if(!$(".m-item.active li").length){
            $.get("/message/listOutbox",function(result){
                resultHandle(result,function(){
                    if(result.data.length){
                        var tmpl = doT.template($("#message-tmpl").html())(result.data)
                        $(".m-item.active .mcj_g").html(tmpl);
                        $(".m-item.active .mcj_l").show();
                    }else{
                        $(".m-item.active .mcj_g").html('<h3 class="message-no">您还未有任何信息哦~</h3>');
                    }
                })
            })
        }
    })

    $(document).on("click",".mcj_j",function(){


        if($(this).parents("li").hasClass("unread")){
            $(this).parents("li").removeClass("unread")
            $.post("/message/saveCrmMessage",{
                custMessageId:$(this).data("id")
            },function(result){
                resultHandle(result)
            })
        }



        var _this=$(this).children();
        var tmpl = doT.template($("#message-detail").html())({
            subject:_this.data("subject"),
            time:_this.data("time"),
            content:_this.data("content")
        })
        $(".msgpop-main").html(tmpl);

        $("body").css("overflow-y","hidden");
        $("#fix-messagepopup").css("overflow-y","scroll").fadeIn()
        return false;
    })



    //关闭
    $(document).on("click","#btn-close,#message-box .close",function(){
        $(".msgpop-main").html("");
        $("body").css("overflow-y","auto");
        $("#fix-messagepopup").css("overflow-y","hidden").fadeOut()
        return false;
    })


    //全选
    $(document).on("click",".all",function(){
        if($(this).is(":checked")){
            $(".m-item.active .mcj_g").find(":checkbox").prop("checked","checked");
        }else{
            $(".m-item.active .mcj_g").find(":checkbox").removeAttr("checked");
        }
    })

    //删除
    $(document).on("click","#del-receivemsg",function(){
        var tempCk=$(".m-item.active .mcj_g").find(":checkbox:checked");
        if(!tempCk.length){
            dialog.info("沒有要刪除的消息")
            return false;
        }

        var data=[];
        tempCk.each(function(){
            data.push($(this).val())
        })

        $.post("/message/deleteCrms",{
            custMessageId:data.join(",")
        },function(result){
            resultHandle(result,function(){
                tempCk.parents("li").slideUp(function(){
                    $(this).remove();
                })
            })
        })
    })

    //发件
    $(document).on("click","#btn-send",function(){
        var title=$("#title").val()
        var message=$("#message").val()
        if(!title.length||!message.length){
            dialog.info("标题或消息内容不能为空");
            return false;
        }
        if(title.length<2||message.length<5){
            dialog.info("请输入至少2个字符的标题和5个字符的内容");
            return false;
        }
        $.post("/message/saveCrmMessage",{
            messageTo:$("#sendto").val(),
            subject:title,
            content:message
        },function(result){
            var msgarr = ['<p><img src="/static/images/plane.jpg"></p><p><br/>已收到您的消息，我们将尽快回复。谢谢！</p>'];
            var button={
                "确定":function(){
                    dialog.close()
                }
            }
            resultHandle(result,function(){
                dialog.custom("消息", msgarr.join(""),button);
            })
            $("#inbox .mcj_g").html("")
        })
        return false;
    })

})