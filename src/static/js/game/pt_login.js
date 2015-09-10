$(document).ready(function () {
    iapiSetCallout('Login', calloutLogin);
    iapiSetCallout('Logout', calloutLogout);

    if(isLogin == "1"){
        //login(result.loginame, result.oldpw, 1);
        login("IG99TEST40", "123456", 1, "en");
        /*$.ajax({
            type: "GET",
            datatype:'json',
            url: "/html/socketJs.html",
            cache: false,
            success:function (result) {
                login(result.loginame, result.oldpw, 1);
            }
        });*/
    }

    $(".leftMenu ul li").click(function () {
        $(".leftMenu ul li").removeClass("currentTab");
        var indexValue = $(".leftMenu ul li").index(this);
        var constantWidth = 770;
        var constResult = indexValue * constantWidth;
        $("ul.sbLists").animate({
            "margin-left": "-" + constResult
        });
        //currentTab
        $(".leftMenu ul li:nth-child(" + (indexValue + 1) + ")").addClass("currentTab");
    });
});

function login(username, password, realMode) {
    iapiLogin("IGG" + username.toUpperCase(), password, realMode, "zh-cn");
}

function logout(allSessions, realMode) {
    iapiLogout(allSessions, realMode);
}
function getGames(gameCode) {
    if(checkGameState(2) && checkLogin()){
        window.open('/html/PTPage.html?gamecode=' + gameCode, 'Games1', 'width=800,height=600,menubar=no,scrollbars=no,toolbar=no,location=no,directories=no,resizable=no');
    }
}
//获取试玩游戏
function getTryGames(gameCode) {
    if(checkGameState(2)){
        window.open('/html/PTPage.html?gametry=1&gamecode=' + gameCode, 'Games1', 'width=800,height=600,menubar=no,scrollbars=no,toolbar=no,location=no,directories=no,resizable=no');
    }
}

function checkGameState(type){
    $.ajaxSetup({
        async: false
    });
    var flag = true;
    $.get("/html/getGameState.do", {"gametype":type,"time":Math.random()}, function(rsp){
        if(!rsp.success){
            flag = false;
            var msg = rsp.data.remark +"<br/><font color=red>"+ rsp.data.beginTime + "</font> - <font color=red>" +rsp.data.endTime + "</font>";
            gameNoPlay(msg);
        }
    },"json");
    return flag;
}

function calloutLogin(response) {
    if (response.errorCode) {
        //alert("Login failed, " + response.errorText);
    }
    else {
        //window.location = "main.html";
    }
}

function calloutLogout(response) {
    if (response.errorCode) {
        //alert("Logout failed, " + response.errorCode);

    }
    else {
        //alert("Logout OK");	
    }
}

function clickHome(url) {
    window.open(url, "_blank");
}

function linkHome(url) {
    window.location = url;
}