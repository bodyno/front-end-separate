'use strict';

module.exports = {
    nb88:{
        src: [
            '<%=yo.app%>/static/imgs/icon/*.png'
        ],
        dest: '<%=yo.app%>/static/imgs/sprite/sprite.png',
        destCss: '<%=yo.app%>/static/css/sprite.less',
        imgPath: '/static/imgs/sprite/sprite.png',
        cssFormat: 'less'
    }
};
