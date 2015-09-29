'use strict';

module.exports = {
    build1:{
        src: [
            '<%=yo.app%>/static/images/icon/*.png'
        ],
        dest: '<%=yo.app%>/static/images/sprite/sprite.png',
        destCss: '<%=yo.app%>/static/css/sprite.scss',
        imgPath: '/static/images/sprite/sprite.png',
        cssFormat: 'scss'
    },
    build2:{
        src: [
            '<%=yo.app%>/static/images/account/*.png'
        ],
        dest: '<%=yo.app%>/static/images/sprite/sprite_account.png',
        destCss: '<%=yo.app%>/static/css/sprite_account.scss',
        imgPath: '/static/images/sprite/sprite_account.png',
        cssFormat: 'scss'
    },
    build3:{
        src: [
            '<%=yo.app%>/static/images/bank/*.png'
        ],
        dest: '<%=yo.app%>/static/images/sprite/bank.png',
        destCss: '<%=yo.app%>/static/css/sprite_bank.scss',
        imgPath: '/static/images/sprite/bank.png',
        cssFormat: 'scss'
    }
};
