'use strict';

module.exports = {
    build1:{
        src: [
            '<%=yo.app%>/static/images/icon/*.png'
        ],
        dest: '<%=yo.app%>/static/images/sprite/sprite.png',
        destCss: '<%=yo.app%>/static/css/sprite.less',
        imgPath: '/static/images/sprite/sprite.png',
        cssFormat: 'less'
    },
    build2:{
        src: [
            '<%=yo.app%>/static/images/account/*.png'
        ],
        dest: '<%=yo.app%>/static/images/sprite/sprite_account.png',
        destCss: '<%=yo.app%>/static/css/sprite_account.less',
        imgPath: '/static/images/sprite/sprite_account.png',
        cssFormat: 'less'
    },
    build3:{
        src: [
            '<%=yo.app%>/static/images/bank/*.png'
        ],
        dest: '<%=yo.app%>/static/images/sprite/bank.png',
        destCss: '<%=yo.app%>/static/css/sprite_bank.less',
        imgPath: '/static/images/sprite/bank.png',
        cssFormat: 'less'
    }
};
