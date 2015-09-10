function afterTran(){
    getInbox()

    function inboxPage(page){
        if(page>10&&$(".page-inbox").is(":hidden")){
            $(".page-inbox").show().pagination({
                items: page,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                onPageClick:function(number){
                    getInbox(number)
                }
            });
        }
        if(page<=10){
            $(".page-inbox").hide()
        }
    }

    function getInbox(page){
        $.get("/message/listInbox",{
            per_page:10,
            page:page?page:1
        },function(result){
            resultHandle(result,function(){
                if(result.obj.content&&result.obj.content.length){
                    var tmpl = doT.template($("#message-tmpl").html())(result.obj.content)
                    $(".m-item.active .mcj_g").html(tmpl).i18n();
                    $(".m-item.active .mcj_l").show();
                }else{
                    $(".m-item.active .mcj_g").html('<h3 class="message-no" data-i18n="msg.no"></h3>').i18n();
                    $(".m-item.active .mcj_l").hide();
                }
                inboxPage(result.obj.total)
                setUnreadCount(result.obj.unRead)
            })
        })
    }

    function setUnreadCount(number){
        if(number!=undefined){
            if(number==0){
                $("#receive-newcounts,#r-read").text("")
            }else{
                $("#receive-newcounts,#r-read").text(number)
            }
        }else{
            $("#receive-newcounts,#r-read").text(function(){
                return Number($(this).text())-1
            })
        }
    }

    function getOutbox(page){
        $.get("/message/listOutbox",{
            per_page:10,
            page:page?page:1
        },function(result){
            resultHandle(result,function(){
                if(result.obj.content&&result.obj.content.length){
                    var tempData=result.obj.content;
                    for(var i=0;i<tempData.length;i++){
                        tempData[i].status=""
                    }
                    var tmpl = doT.template($("#message-tmpl").html())(tempData)
                    $(".m-item.active .mcj_g").html(tmpl).i18n();
                    $(".m-item.active .mcj_l").show();
                }else{
                    $(".m-item.active .mcj_g").html('<h3 class="message-no" data-i18n="msg.no"></h3>').i18n();
                    $(".m-item.active .mcj_l").hide();
                }
                outboxPage(result.obj.total)
            })
        })
    }

    function outboxPage(page){
        if(page>10&&$(".page-outbox").is(":hidden")){
            $(".page-outbox").show().pagination({
                items: page,
                itemsOnPage: 10,
                cssStyle: 'light-theme',
                onPageClick:function(number){
                    getInbox(number)
                }
            });
        }
        if(page<=10){
            $(".page-outbox").hide()
        }
    }


    $(".mcj_c li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        $(".m-item").eq($(this).index()).addClass("active").siblings().removeClass("active");
    })

    //发件箱
    $(document).on("click","#tab1",function(){
        if(!$(".m-item.active .mcj_g li").length){
            getOutbox()
        }
    })

    var nowDetail;

    $(document).on("click",".mcj_j",function(){

        nowDetail=$(this).parents("li");

        if($(this).parents("li").hasClass("unread")){
            $(this).parents("li").removeClass("unread")
            $.post("/message/saveCrmMessage",{
                custMessageId:$(this).data("id")
            },function(result){
                resultHandle(result)
                setUnreadCount()
            })
        }



        var _this=$(this).children();
        var tmpl = doT.template($("#message-detail").html())({
            subject:_this.data("subject"),
            time:_this.data("time"),
            content:_this.data("content")
        })
        $(".msgpop-main").html(tmpl).i18n();

        $("body").css("overflow-y","hidden");
        $("#fix-messagepopup").css("overflow-y","scroll").fadeIn()
        return false;
    })

    $(document).on("click",".m-detail",function(){
        $(this).parents("li").find('.mcj_j').trigger("click")
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
            dialog.info($.t("valid.msg.1"))
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

    $(document).on("click",".delete-inner",function(){
        $(this).parents("#fix-messagepopup").find(".close").trigger("click");
        $.post("/message/deleteCrms",{
            custMessageId:nowDetail.find(".mcj_j").data("id")
        },function(result){
            resultHandle(result,function(){
                nowDetail.slideUp(function(){
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
            dialog.info($.t("valid.msg.2"));
            return false;
        }
        if(title.length<2||message.length<5){
            dialog.info($.t("valid.msg.3"));
            return false;
        }
        $.post("/message/saveCrmMessage",{
            messageTo:$("#sendto").val(),
            subject:title,
            content:message
        },function(result){
            var msgarr = ['<p><div class="msg-plan"></div></p><p data-i18n="[append]valid.msg.5"><br/></p>'];
            var button={}
            button[$.t("valid.msg.4")]=function(){
                dialog.close()
            }
            resultHandle(result,function(){
                dialog.custom($.t("valid.msg.6"), msgarr.join(""),button);
                $(".ui-dialog").i18n();
            })
            $("#inbox .mcj_g").html("")
            $(".mc-content")[0].reset();
        })
        return false;
    })
}