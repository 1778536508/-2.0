//作品详情页
var productPage = {
    init: function () {
        $('.card .plain_text li:last-child').css('margin-right', 0);
        this.thumbTab();
        this.paly();
        this.call();
    },
    thumbTab: function () { //视频相册轮播
        var parent = $('.media_box');
        var item = parent.find('.pic .item'); //主内容
        var _play = item.find('.play_big');
        var prev = parent.find('.prev'); //上一页
        var next = parent.find('.next'); //下一页
        var num = parent.find('.num');
        var em = num.find('em');

        var _ul = parent.find('.thumb ul'); //缩略图父级
        var _li = _ul.find('li'); //缩略图li
        var _liWidth = _li.outerWidth(true); //缩略图占用的宽度
        var _liLen = _li.length; //缩略图数量
        var _ulWidth = _liLen * _liWidth; //动态计算缩略图父级宽度
        var cur = 0; //设置初始值


        //1.初始化状态
        _ul.css('width', _ulWidth + 'px'); //给缩略图父级动态添加宽度
        item.eq(0).show(); //显示主内容第一个
        _li.eq(0).addClass('active'); //缩略图第一个加激活状态
        em.eq(0).text(common.pad(cur + 1));
        em.eq(2).text(common.pad(_liLen));
        //如果数量小于等于6个就隐藏
        if (_liLen <= 6) {
            prev.hide();
            next.hide();
        }

        //点击缩略图
        _li.on('click', function () {
            cur = $(this).index();
            item.eq(cur).show().siblings('.item').hide();
            $(this).addClass('active').siblings('li').removeClass('active');
            em.eq(0).text(common.pad(cur + 1));

            var type = $(this).attr('data-type');
            videoPlay(type, cur);
        });

        //2.点击下一页
        next.on('click', function () {
            if (cur < _liLen - 1) {
                cur++;
                if (cur > 4 && cur < _liLen - 1) {
                    _ul.animate({'margin-left': -(cur - 4) * _liWidth + 'px'}, 300)
                }
            }
            item.eq(cur).show().siblings('.item').hide();
            _li.eq(cur).addClass('active').siblings('li').removeClass('active');
            em.eq(0).text(common.pad(cur + 1));
        });

        //3.点击上一页
        prev.on('click', function () {
            if (cur > 0) {
                cur--;
                if (cur > 4 && cur < _liLen - 1) {
                    _ul.animate({'margin-left': -(cur - 5) * _liWidth + 'px'}, 300)
                }
            }
            item.eq(cur).show().siblings('.item').hide();
            _li.eq(cur).addClass('active').siblings('li').removeClass('active');
            em.eq(0).text(common.pad(cur + 1));

        });

        //视频播放
        function videoPlay(type, val) {
            var video = item.find('video').get(0);
            if (video) {
                video.pause();
                if (video.paused) {
                    _play.show();
                }
            }
        }

    },
    paly: function () {
        var play = $('.play_big');
        var video = play.siblings('video');
        play.on('click', function () {
            $(this).hide();
            video.get(0).play();
            video.attr('controls', 'controls')
        });
    },
    call:function () {//调用外部函数
        Detail.scrollFloor();
        Detail.computeBaseInfo();//基本信息左右
    }
};

$(function () {
    productPage.init();
});







