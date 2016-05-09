module.exports = {
    index:{
        src: [
            '<%=yo.app%>/static/images/index/sprite/*.png'
        ],
        dest: '<%=yo.app%>/static/images/index/sprite.png',
        destCss: '<%=yo.app%>/static/styles/sprite/_index_sprite.scss',
        imgPath: '/static/images/index/sprite.png',
        cssFormat: 'scss'
    }
};
