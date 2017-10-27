var data = {
    //昆曲项目
    kqProject: ['项目简介', '代表性作品', '表演方式', '演奏乐器', '场景', '唱腔', '舞台道具'],
    //昆曲传承人 //TODO
    kqMaser: ['', '', '', '', '', '', '', '', '',],
    //苏绣项目
    sxProject: ['项目简介', '传承谱系', '代表性作品', '历史渊源', '基本内容', '项目特征', '主要价值', '频危状况'],
    //苏绣传承人
    sxMaster: ['传承人简介', '传承人谱系', '代表性作品', '技能特点', '领域活动', '荣誉称号'],
    //中医项目
    tcmProject: ['项目简介', '传承谱系', '历史渊源', '基本内容', '项目特征', '主要价值', '濒危状况']
};

var utils = {
    pad: function (num, length) { //个位数补零
        if (!length) {
            length = 10;
        }
        return ("0" + num).substr(-length);
    },
    scroll: function () { //楼层
        var _ul = $('.side_fixed ul'); //导航
        var _floor = $('section.floor'); //楼层
        var _nav = $('.card header h4'); //楼层标题
        var arr = []; //把pros对应的几个位置标示出来

        //获取所有楼层标题
        _nav.each(function (i) { //给右侧悬浮添加标题
            _ul.append('<li><span>' + $(this).text() + '</span><strong>0' + (i + 1) + '</strong></li>');
        });
        var _li = _ul.find('li');


        //滚动
        _floor.each(function () { //标记所有楼层导航的高度
            var offsettop = $(this).offset().top;
            arr.push(parseInt(offsettop)); //火狐有半个像素的情况，故取整
        });

        $(window).scroll(function () {
            var d = parseInt($(document).scrollTop());
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] >= d) {
                    break;
                }
            }
            _li.removeClass('active');
            if (i == arr.length) {
                i--;
            }
            if (i > 0) {
                _li.eq(i - 1).addClass('active');
            }
        });

        //点击回到当前楼层
        _ul.on('click', 'li', function () {
            var _index = $(this).index();
            var _top = _floor.eq(_index).offset().top;
            $(this).addClass('active').siblings('li').removeClass('active');
            $('html,body').stop(true).animate({'scrollTop': _top + 'px'}, 500);
        });

    },
    //隐藏文字 点击展开
    lgTextShow: function () {
        var obj = $('div[data-type="lgText"]');

        obj.each(function () {
            var el = $(this).find('.text_more');
            var text = $(this).find('.text');
            var totalNum = text.html().length; //总字数
            var limit = $(this).attr('data-number');

            if (totalNum > limit) {
                var oldText = text.html(); //原始文本
                var oldHeight = text.height();
                var showText = oldText.substring(0, limit); //最终显示的文本

                text.html(showText + '...');
                var showHeight = text.height(); //截取后的高度
                text.css('height', showHeight);

                el.on('click', function () {
                    var _this = $(this);

                    if (_this.hasClass('active')) {
                        _this.removeClass('active');
                        text.html(showText).animate({height: showHeight}, 200);
                    } else {
                        $('.row_img li .lbox').css('height', oldHeight);

                        _this.addClass('active');
                        text.html(oldText).animate({height: oldHeight}, 200);
                    }
                });
            }
            // var _height=text.css('height');
            // var el=$(this).find('.text_more');

        });


    }
};
/*--//End 公共的效果--*/

//通用
var common = {
    init: function () {
        this.mainBg();
        this.share();
        this.praise();
        this.productsTab();
        this.productsHover();
        this.history();
        this.playVideoModal();
        utils.lgTextShow();
        $('.header .content .info li.login').show();
        if($('.logined').text()==''){
            $('.logined').hide();
        }else{
            $('.logined').show();
        }
    },
    mainBg: function () { //首屏图片 视频

        var _img = $('.img_bg');
        _img.each(function () {
            var imgW = $(this).width();
            var imgH = $(this).height();
            $(this).css({
                'margin-top': -parseInt(imgH / 2) + 'px',
                'margin-left': -parseInt(imgW / 2) + 'px',
            });
        });


    },
    share: function () { //分享
        var _share = $('.js-share');
        var _shareBox = $('.js-share_box');
        //弹出框
        _share.on('click', function () {
            _shareBox.stop(true).fadeIn();
            return false;
        });

        _shareBox.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });

        $(document).on("click", function () {
            _shareBox.fadeOut();
        });
    },
    praise: function () { //点赞功能
        var praise = $('.praise1');
        praise.on('click', function () {
            var _this = $(this);
            //创建动画数字
            if (_this.hasClass('active1')) { //取消点赞
                _this.removeClass('active1')
                _this.append('<div class="add1"><b>-1</b></div>');
               animateNum('.add1');
            } else { //点赞
                _this.addClass('active1')
                _this.append('<div class="add1"><b>+1</b></div>');
                animateNum('.add1');
            }

            function animateNum(obj) {
                $(obj).css({
                    'position': 'absolute',
                    'z-index': '1',
                    'color': '#C30',
                    'left': '5px',
                    'top': '-15px'
                }).animate({
                    left: 15,
                    top: -30
                }, 'slow', function () {
                    $(this).fadeIn('fast').remove();
                });
            }

        });

    },
    productsTab: function () { //作品分页
        var _products = $('.product');
        _products.each(function () {
            //分页相关属性
            var _page = $(this).find('.code'); //分页显示容器
            var _sShow = _page.find('span.show'); //当前页数
            var _sToal = _page.find('span.total'); //当前页数
            var _sPrev = _page.find('span.prev');
            var _sNext = _page.find('span.next');
            //列表相关属性
            var _ul = $(this).find('ul'); //获取列表ul
            var _li = _ul.find('li'); //获取列表li
            var liLen = _li.length; //获取列表的length
            var cur = 0;

            var currentNum = 3; //当前页显示个数
            var total = Math.ceil(liLen / currentNum); //分页总数
            _sToal.html(utils.pad(total));
            _sShow.html(utils.pad(1));
            _sPrev.addClass('active');

            // console.log(_li)


            //下一页
            _sNext.on('click', function () {
                _sPrev.removeClass('active');
                if (cur < total - 1) {
                    cur++
                }

                if (cur == total - 1) {
                    $(this).addClass('active');
                }

                $(this).parents('.code').siblings('ul').animate({'margin-left': -cur * 1200 + 'px'}, 300);
                _sShow.html(utils.pad(cur + 1));

            });


            //上一页
            _sPrev.on('click', function () {
                _sNext.removeClass('active');
                if (cur > 0) {
                    cur--;
                }

                if (cur == 0) {
                    $(this).addClass('active');
                }

                $(this).parents('.code').siblings('ul').animate({'margin-left': -cur * 1200 + 'px'}, 300);
                _sShow.html(utils.pad(cur + 1));
            });


        });
    },
    scroll: function (data) {
        var model = $('.model_fixed');
        var obj = model.find('ul');
        var floor = $('section.floor');
        var arr = []; //把pros对应的几个位置标示出来

        //获取所有楼层标题
        obj.each(function () {
            for (var i = 0; i < data.length; i++) {
                obj.append('<li><i></i><span class="active">' + data[i] + '0' + (i + 1) + '</span><span class="default">' + data[i] + '</span></li>');
            }
        });
        var _li = obj.find('li');
        //滚动
        floor.each(function () { //标记所有楼层导航的高度
            var offsettop = $(this).offset().top;
            arr.push(parseInt(offsettop)); //火狐有半个像素的情况，故取整
        });

        $(window).scroll(function () {
            var d = parseInt($(document).scrollTop());
            if (d > 800) {
                model.fadeIn(100);
            } else {
                model.fadeOut(100);
            }

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] > d) {
                    break;
                }
            }

            _li.removeClass('active');
            if (i > 0) {
                _li.eq(i - 1).addClass('active');
            }
            if (i == arr.length) {
                i--;
            }
        });

        //右侧楼层选中效果
        _li.on('click', function () {
            var _index = $(this).index();
            var _top = floor.eq(_index).offset().top;

            $('html,body').stop(true).animate({'scrollTop': _top + 'px'}, 500);
            $(this).addClass('active').siblings('li').removeClass('active');
        });


    },
    //代表性作品hover
    productsHover: function () {
        var parent = $('.product');
        var el = parent.find('li');
        var mask = el.find('.mask');
        if (mask) {
            el.hover(function () {
                $(this).find('.mask').stop(true).fadeIn(100);
            }, function () {
                $(this).find('.mask').stop(true).fadeOut(100);
            })
        }
    },
    //历史渊源
    history: function () {
        var parent = $('.history');
        var tab = parent.find('.tab span');
        var item = parent.find('.context .item');

        tab.on('click', function () {
            var _index = $(this).index();
            $(this).addClass('active').siblings('span').removeClass('active');
            item.eq(_index).show().siblings('.item').hide();
        })

    },
    playVideoModal:function () {
        $('.bg .main .play').on('click',function(){
            $('.modal_video').fadeIn();
            $('#videoId').get(0).play();
        });
        $('.overbg0').on('click',function () {
            $('.modal_video').fadeOut();
            $('#videoId').get(0).pause();
        });

    }
};


//标杆昆曲2.1.1
var kxProject = {
    init: function () {
        common.init();
        common.scroll(data.kqProject)
    }
};

//标杆昆曲2.1.2
var kxMaster = {//TODO
    init: function () {
        common.init();
        // common.scroll(data.kxMaster)
    }
};

//标杆苏绣2.1.1
var sxProject = {
    init: function () {
        common.init();
        common.scroll(data.sxProject);
    }
};

//标杆苏绣2.1.2
var sxMaster = {
    init: function () {
        common.init();
        common.scroll(data.sxMaster);
    }
};

//中医项目
var tcmProject = {
    init: function () {
        // common.init();
        common.scroll(data.tcmProject);
        this.history();
    },
    history: function () {
        var parent = $('#history');
        var more = parent.find('.more');
        var show = more.find('.show');
        var hide = more.find('.hide');
        var ul = parent.find('ul');

        ul.find('li:gt(4)').hide();

        show.on('click', function () {
            parent.css('height', 'auto');
            ul.find('li').removeClass('refer');
            ul.find('li:gt(4)').slideDown(100);
            $(this).hide();
            hide.show();
        });
        hide.on('click', function () {
            parent.css('height', '1013px');
            ul.find('li').eq(4).addClass('refer');
            ul.find('li:gt(4)').slideUp(100);
            $(this).hide();
            show.show();
        });
    }
};
