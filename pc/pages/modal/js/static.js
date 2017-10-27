$(function() {
    //初始化
    // projectPage.init();
    header.init();
    //reset 视频 data-id
    $("#imgs img").each(function() {
        //alert($(this).attr("src")+"---"+$(this).attr("data-id"));
        var obj = $(this);
        if ($(".mainbg img")) {
            if ($(this).attr("src") == $(".mainbg img").attr("src")) {
                $(".mainbg img").attr("data-id", $(this).attr("data-id"));
                $(".mainbg img").attr("data-type", $(this).attr("data-type"));
            }

        };
        //section 代码块寻找
        $("section[name='tuwen']").each(function(index, item) {
            $(this).find("img").each(function() {
                if (obj.attr("src") == $(this).attr("src")) {
                    $(this).attr("data-id", obj.attr("data-id"));
                    $(this).attr("data-type", obj.attr("data-type"));
                }
            });
        });
    });
    //reset 视频 data-id
    $("#videos video").each(function() {
        //alert($(this).attr("src")+"---"+$(this).attr("data-id"));
        var obj = $(this);
        if ($(".mainbg video")) {
            if ($(this).attr("src") == $(".mainbg video").attr("src")) {
                $(".mainbg video").attr("data-id", $(this).attr("data-id"));
                $(".mainbg video").attr("data-type", $(this).attr("data-type"));
            }
        };
        //section 代码块寻找

        $("section[name='tuwen']").each(function(index, item) {
            $(this).find("video").each(function() {
                if (obj.attr("src") == $(this).attr("src")) {

                    $(this).attr("data-id", obj.attr("data-id"));
                    $(this).attr("data-type", obj.attr("data-type"));
                }
            });
        });
    });

    //控制header中英文显示
    $(".language").hide();
    $(".login").hide();

    var mainCategory = $('#mainCategory');

    //初始化分类数据
    $.each(category_all, function(index, content) {
        mainCategory.append("<li data-id=\"" + content.gbCategory + "\" >" + content.name + "</li>");
    });

    mainCategory.find('li').on('click', function() {
        $("#attr_text").text($(this).html());
        $("#gb_category_code").val($(this).attr("data-id"));
        $("#item_1").hide();

        //searchData_();
    });

    var searchPage = {
        init: function() {
            //$('.header_detail .content .info li.search').hide();
            $('.header_detail .content .info li.login').addClass('line');

            this.search();
        },

        search: function() {
            var filter = $('.filter_search'); //下拉搜索
            var filterFixed = $('.filter_search_fixed');
            var ipt = filter.find('.ipt');
            var iptVal = ipt.val();
            var filterAll = filter.find('.attr span'); //筛选项
            var filterItem = filter.find('.item'); //筛选下来框
            var suggest = filter.find('.suggest');
            var body = $('body');
            //获取焦点
            ipt.focus(function() {
                $(this).val('');
                body.append('<div class="overbg" style="z-index:1;"></div>');
            });

            //失去焦点如果为空则显示原始值
            ipt.blur(function() {
                var _val = $(this).val();
                if (_val == '') {
                    $(this).val(iptVal);
                }
                $('.overbg').remove();
            });

            //2.点击筛选
            filterAll.on('click', function() {
                var _this = $(this);
                var _index = _this.index();
                filterItem.eq(_index)
                    .css('left', parseInt(_this.position().left) + 'px')
                    .show()
                    .siblings('.item')
                    .hide();
            });

            filterItem.each(function() {
                var _this = $(this);
                var level = $(this).find('.level');
                var level2 = $(this).find('.level2');
                var _li = level.find('li'); //分类

                _li.hover(function() {
                    $(this).addClass('active').siblings('li').removeClass('active');

                    $("#catecontent").empty();
                    $("#citycontent").empty();

                    if (typeof(category_all[$(this).index()].children) != "undefined") {
                        $.each(category_all[$(this).index()].children, function(index, content) {
                            $("#catecontent").append("<li data-id=\"" + content.gbCategory + "\" >" + content.name + "</li>");
                        });

                        //点击二级分类
                        $("#catecontent").find('li').on('click', function() {
                            filterAll.eq(0).text($(this).html());
                            _this.hide();
                            $("#gb_category_code").val($(this).attr("data-id"));
                            //searchData_();
                        });
                    }

                    if (typeof(dic_arr) != "undefined") {
                        $.each(dic_arr, function(index, content) {
                            $("#citycontent").append("<li data-id=\"" + content.code + "\"  >" + content.name + "</li>");
                        });

                        //国家级
                        $("#country").find('li').on('click', function() {
                            filterAll.eq(1).text($(this).html());
                            _this.hide();
                            $("#area_code").val("");
                            // searchData_();
                        });

                        //一级城市
                        $("#citycontent").find('li').on('click', function() {
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
            filter.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
            });

            //4.点击自身之外的地方关闭下拉框
            $(document).on("click", function() {
                filterItem.hide();
                filterFixed.slideUp('fast');
            });
            //自动提示
            body.find('.overbg').on('click', function() {
                filterItem.hide();
                filterFixed.slideUp('fast');
                suggest.hide();
                $(this).remove();
                body.css('overflow', '');
            });

        },
    };
    searchPage.init();

    //替换底部的图片
    $('.footer .main .rbox .pages img').attr('src','http://diich.efeiyi.com/assets/images/footer_code.png');

});

function submit() {
    $(".form").ajaxSubmit();
}