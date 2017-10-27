var imgUrl = 'http://diich-resource.oss-cn-beijing.aliyuncs.com/html/masters/images/';

$(function () {
    $('.header .content .nav li').eq(2).addClass('active').siblings('li').removeClass('active');
    mastersPage.init();
});

var mastersPage = {
    init: function () {
        var _this = this;
        _this.create();
        _this.staticSerach();
        $(window).resize(function () {
            _this.getScreen();
        });
    },
    templateMaster: function () {
        var tpl = '';
        for (var i = 0; i < mastersData.length; i++) {
            tpl += '<li>' +
                '<img src="' + imgUrl + mastersData[i].photo + '" alt="">' +
                '<div class="mask">' +
                '<h4>' + mastersData[i].name + '</h4>' +
                '<p>' + mastersData[i].title + '</p>' +
                '</div>' +
                '</li>';
        }
        return tpl;
    },
    create: function () {//创建大师列表
        var _this = this;
        var target = $('.master_avatar');
        target.append(_this.templateMaster());

        //计算图片高度等
        _this.getScreen();
        _this.selectMaster();
    },
    getScreen: function () { //获取浏览器分辨率
        var headerHeight = $('.header').outerHeight(true); //导航高度
        var clientWidth = $(window).width(); //浏览器宽度
        var clientHeight = $(window).height(); //浏览器宽度
        var mainHeight = clientHeight - headerHeight; //内容的高度

        var parent = $('.master_page');
        var lbox = parent.find('.lbox');
        var rbox = parent.find('.rbox');
        var rboxDefaultContextP = rbox.find('.context p');
        var li = lbox.find('li');
        var liHeight = parseInt(mainHeight / 4) < 150 ? 150 : parseInt(mainHeight / 4); //单个li的高度,最小宽度为150px;

        var lboxWidth = liHeight * 5; //左侧宽度
        var lboxHeight = liHeight * 4; //左侧高度
        var rboxWidth = clientWidth - lboxWidth; //右侧宽度

        if (clientWidth < 1200) {
            clientWidth = 1200;
        }


        //左侧
        lbox.css('width', lboxWidth + 'px'); //左侧赋值
        li.css({'width': liHeight + 'px', 'height': liHeight + 'px'});

        //右侧
        rbox.css({'width': rboxWidth + 'px', 'height': lboxHeight + 'px'});

        if (mainHeight <= 760) {
            $('#context-p').css('height', '70px');
            $('.master_page .rbox .more').css('bottom', '110px')
        } else {
            rboxDefaultContextP.css('height', '');
            $('.master_page .rbox .more').css('bottom', '110px')
        }


    },
    selectMaster: function () { //选中大师
        var _this = this;
        var parent = $('.master_page');
        var _li = parent.find('.master_avatar li');
        var rbox = parent.find('.rbox');
        var _default = rbox.find('.default');
        var _item = rbox.find('.item');

        //
        _li.hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });

        //
        _li.on('click', function () {
            var index = $(this).index();
            _default.hide();
            _item.show();
            $(this).addClass('active').siblings('li').removeClass('active');
            $(this).find('.mask').show();

            _this.getScreen();

            //大师对应的数据
            var itemData = mastersData[index];
            _item.find('.title h1').text(itemData.name);
            _item.find('.title .cate').text(itemData.skill);
            _item.find('.title h4').text(itemData.title);
            _item.find('.context p').html(itemData.outline);

            //大师对应的作品
            var imgs = '';
            for (var i = 0; i < 3; i++) {
                imgs += '<a href=""><img src="' + imgUrl + itemData.worksPic.split(',')[i] + '?x-oss-process=style/masters-works-img" /></a>';
            }
            _item.find('.imgs').html(imgs);

            //弹出框
            _this.media(itemData);
        });
    },
    media: function (data) {//图片弹出框
        var target = $('.master_page .imgs a');
        var parent = $('.media_layer');
        var prev = parent.find('.prev');
        var next = parent.find('.next');
        var num = parent.find('.num');
        var cur = 0;
        var imgs = $('#imgs');
        var domLi = '';
        for (var i = 0; i < 3; i++) {
            domLi += '<li style="display: none;"><img src="' + imgUrl + data.worksPic.split(',')[i] + '" /></li>';
        }

        //点击作品缩略图
        target.on('click', function () {
            cur = $(this).index();
            imgs.html(domLi);
            imgs.find('li').eq(cur).show().siblings('li').hide();
            num.find('li.active').text(common.pad(cur + 1));
            if (cur == 0) {
                prev.addClass('active');
            }
            if (cur == 2) {
                next.addClass('active');
            }

            parent.fadeIn(200);
            return false;
        });

        //下一页
        next.on('click', function () {
            prev.removeClass('active');
            if (cur < 2) {
                cur++;
            }
            if (cur == 2) {
                $(this).addClass('active');
            }
            num.find('li.active').text(common.pad(cur + 1));
            imgs.find('li').eq(cur).show().siblings('li').hide();
        });

        //上一页
        prev.on('click', function () {
            next.removeClass('active');
            if (cur > 0) {
                cur--;
            }
            if (cur == 0) {
                $(this).addClass('active');
            }
            num.find('.active').text(common.pad(cur + 1));
            imgs.find('li').eq(cur).show().siblings('li').hide();
        });

        //关闭弹层
        parent.on('click', '.icon_close', function () {
            parent.fadeOut();
            prev.removeClass('active');
            next.removeClass('active');
            return false;
        });


    },
    staticSerach: function () {
        //控制header中英文显示
        $(".language").hide();
        $(".login").hide();

        var mainCategory = $('#mainCategory');

        //初始化分类数据
        $.each(category_all, function (index, content) {
            mainCategory.append("<li data-id=\"" + content.gbCategory + "\" >" + content.name + "</li>");
        });

        mainCategory.find('li').on('click', function () {
            $("#attr_text").text($(this).html());
            $("#gb_category_code").val($(this).attr("data-id"));
            $("#item_1").hide();

            //searchData_();
        });

        var searchPage = {
            init: function () {
                //$('.header_detail .content .info li.search').hide();
                $('.header_detail .content .info li.login').addClass('line');
                this.filterBar();
                this.search();
            },
            filterBar: function () {
                var obj = $('.filter_bar');
                var linkTab = obj.find('a');
                var iconTab = obj.find('.icon_tab');
                var proColumn = $('.pro_column3'); //搜索列表

                //筛选
                linkTab.on('click', function () {
                    $(this).addClass('active').siblings('a').removeClass('active');

                    //刷新搜索结果页

                    if ($(this).index() == 0) {
                        $("#type").val("");
                    }
                    if ($(this).index() == 1) {
                        $("#type").val("0");
                    }
                    if ($(this).index() == 2) {
                        $("#type").val("1");
                    }
                    if ($(this).index() == 3) {
                        $("#type").val("2");
                    }

                    searchData_();

                    return false;
                });

                //切换图标
                iconTab.on('click', function () {
                    if ($(this).hasClass('active')) { //九宫格
                        $(this).removeClass('active');
                        proColumn.removeClass('active');
                    } else { //横排
                        $(this).addClass('active');
                        proColumn.addClass('active');
                    }
                });
            },
            search: function () {
                var filter = $('.filter_search'); //下拉搜索
                var filterFixed = $('.filter_search_fixed');
                var ipt = filter.find('.ipt');
                var iptVal = ipt.val();
                var filterAll = filter.find('.attr span'); //筛选项
                var filterItem = filter.find('.item'); //筛选下来框
                var suggest = filter.find('.suggest');
                var body = $('body');
                //获取焦点
                ipt.focus(function () {
                    $(this).val('');
                    body.append('<div class="overbg" style="z-index:1;"></div>');
                });

                //失去焦点如果为空则显示原始值
                ipt.blur(function () {
                    var _val = $(this).val();
                    if (_val == '') {
                        $(this).val(iptVal);
                    }
                    $('.overbg').remove();
                });

                //2.点击筛选
                filterAll.on('click', function () {
                    var _this = $(this);
                    var _index = _this.index();
                    filterItem.eq(_index)
                        .css('left', parseInt(_this.position().left) + 'px')
                        .show()
                        .siblings('.item')
                        .hide();
                });

                filterItem.each(function () {
                    var _this = $(this);
                    var level = $(this).find('.level');
                    var level2 = $(this).find('.level2');
                    var _li = level.find('li'); //分类

                    _li.hover(function () {
                        $(this).addClass('active').siblings('li').removeClass('active');

                        $("#catecontent").empty();
                        $("#citycontent").empty();

                        if (typeof(category_all[$(this).index()].children) != "undefined") {
                            $.each(category_all[$(this).index()].children, function (index, content) {
                                $("#catecontent").append("<li data-id=\"" + content.gbCategory + "\" >" + content.name + "</li>");
                            });

                            //点击二级分类
                            $("#catecontent").find('li').on('click', function () {
                                filterAll.eq(0).text($(this).html());
                                _this.hide();
                                $("#gb_category_code").val($(this).attr("data-id"));
                                //searchData_();
                            });
                        }

                        if (typeof(dic_arr) != "undefined") {
                            $.each(dic_arr, function (index, content) {
                                $("#citycontent").append("<li data-id=\"" + content.code + "\"  >" + content.name + "</li>");
                            });

                            //国家级
                            $("#country").find('li').on('click', function () {
                                filterAll.eq(1).text($(this).html());
                                _this.hide();
                                $("#area_code").val("");
                                // searchData_();
                            });

                            //一级城市
                            $("#citycontent").find('li').on('click', function () {
                                filterAll.eq(1).text($(this).html());
                                _this.hide();
                                $("#area_code").val($(this).attr("data-id"));
                                //searchData_();
                            });
                        }
                        level2.show();
                    });
                });


                //点击一级类别

                //3.阻止点击自身关闭
                filter.on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                //4.点击自身之外的地方关闭下拉框
                $(document).on("click", function () {
                    filterItem.hide();
                    filterFixed.slideUp('fast');
                });
                //自动提示
                body.find('.overbg').on('click', function () {
                    filterItem.hide();
                    filterFixed.slideUp('fast');
                    suggest.hide();
                    $(this).remove();
                    body.css('overflow', '');
                });

            },
        };
        searchPage.init();
    }
};