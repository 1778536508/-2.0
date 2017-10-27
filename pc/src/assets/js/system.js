var renderHhtml = {
    uri: 'http://diich.efeiyi.com',
    init: function () {
        this.header();
        this.footer();
    },
    header: function () { //导航
        var language = getLang();

        var htmlStr = '<div class="content">' +
            '<a class="logo" href="' + renderHhtml.uri + '/code/content.html"></a>' +
            '<div class="nav">' +
            '<ul>' +
            '<li class="active"><a href="' + renderHhtml.uri + '/code/content.html" id="home">首页</a></li>' +
            '<li><a href="#" id="ich_directory">非遗名录</a></li>' +
            '<li><a href="' + renderHhtml.uri + '/code/masters.html?lang=' + language + '\" id=\"ich_master\">代表性传承人</a></li>' +
            '<li><a href="' + renderHhtml.uri + '/code/selected_content.html?lang=' + language + '\" id=\"selected_content\">精选内容</a></li>' +
            '<li><a href="' + renderHhtml.uri + '/code/information.html?lang=' + language + '\" id=\"information\">非遗资讯</a></li>' +
            '<li><a href="' + renderHhtml.uri + '/code/official_service.html?lang=' + language + '\" id=\"official_service\">官方服务</a></li>' +
            '<li><a href="' + renderHhtml.uri + '/code/declare.html" id="project_declare">我要申报</a></li>' +
            '<li><a href="' + renderHhtml.uri + '/code/declare.html" id="project_declare">个人中心</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="info">' +
            '<ul>' +
            '<li class="logined">' +
            '   <div class="main">' +
            '      <div class="item user">' +
            '          <a href=""><img src="/assets/uploads/inheritor_01.png" alt=""></a><span>管理员管理员</span>' +
            '      </div>' +
            '      <div class="item account"><a href="">账户管理</a></div>' +
            '      <div class="item logout"><a href="">退出</a></div>' +
            '   </div>'+
            '</li>'+
            '<li class="login"><a class="active" href="javascript:;"><i class="icon"></i><em id="sign_in">登录</em></a></li>' +
            '<li class="language">' +
            '<a class="zh active" href="javascript:switchLanguage(\'zh-CN\');"><em>中文</em></a>' +
            '<a class="en" href="javascript:switchLanguage(\'en\');"><em>EN</em></a>' +
            '</li>' +
            '<li class="search"><i class="icon"></i></li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<!--//End content-->' +
            '<div class="drop_menu" id="drop_menu">' +
            '<div class="content">' +
            '<div class="item">' +
            '<dl>' +
            '<dt ><a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A" data-id="A" id="legend">口头传说和表述</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A01" data-id="A01" id="language" >语言</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A02" data-id="A02" id="text">文字</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A03" data-id="A03" id="oral">口述</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A04" data-id="A04" id="other_oral">其他口头传统<br>及表述</a>' +
            '</dd>' +
            ' </dl>' +
            '</div>' +
            '<!--//End-->' +
            '<div class="item">' +
            '<dl>' +
            '<dt ><a id="perform" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B" data-id="B">表演艺术</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B01" data-id="B01"  id="music" >音乐演奏</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B02" data-id="B02" id="dance">舞蹈</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B03" data-id="B03" id="folk_song">民歌</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B04" data-id="B04" id="traditional_drama">传统戏剧</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B05" data-id="B05"  id="quyi">曲艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B06" data-id="B06" id="sport">传统体育、游艺与杂技</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B99" data-id="B99" id="other_perform">其他表演艺术</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +
            '<div class="item">' +
            '<dl>' +
            '<dt ><a id="custom_etiquette" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C" data-id="C">社会风俗<br>礼仪、节庆</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C01" data-id="C01" id="business_custom">生产商贸习俗</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C02" data-id="C02" id="life_customs">生活习俗</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C03" data-id="C03" id="life_ritual">人生仪式</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C04" data-id="C04" id="festival_celebration">节日庆典</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C99" data-id="C99" id="other_celebration">其他仪式及庆典</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +

            '<div class="item">' +
            '<dl>' +
            '<dt><a  id="practice_nature" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D" data-id="D">有关自然界和<br>宇宙的知识和实践</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D01" data-id="D01" id="df_fishery">农林牧畜渔</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D02" data-id="D02" id="clothing">服装</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D03" data-id="D03" id="food">食品</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D04" data-id="D04" id="h_construction">住房与建筑</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D05" data-id="D05" id="traffic">交通,旅行</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D06" data-id="D06" id="medicine">医、药</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D07" data-id="D07" id="military">军事防御</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D08" data-id="D08" id="business">商贸</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D09" data-id="D09" id="farm">工业、工程</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D10" data-id="D10" id="ag_irrigation">天文、地理、水文等</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D99" data-id="D99" id="on_knowledge">其他自然知识和实践</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +
            '<div class="item">' +
            '<dl>' +
            '<dt ><a id="tt_handmade" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E" data-id="E">传统手工艺技能</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E01" data-id="E01"  id="tm_manufacture">工具及机械制作</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E02" data-id="E02" id="p_techniques">髹饰工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E03" data-id="E03" id="daa_products">家畜农林产品加工</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E04" data-id="E04" id="d_process">织染工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E05" data-id="E05" id="p_paperhanging">造纸、印刷机装裱</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E06" data-id="E06" id="k_techniques">编扎工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E07" data-id="E07" id="cp_craft">字画工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E08" data-id="E08" id="s_techniques">锻冶工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E09" data-id="E09" id="pc_technics">剪刻工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E10" data-id="E10" id="sc_techniques">雕塑工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E11" data-id="E11" id="b_technics">烧造工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E12" data-id="E12" id="w_techniques">木作工艺</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E99" data-id="E99" id="o_kind">其他类</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div id="drop_menu_en" class="drop_menu drop_menu_en">' +
            '<div class="content">' +
            '<div class="item" style="width:320px;">' +
            '<dl>' +
            '<dt><a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A" data-id="A" id="legend">legend</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A01" data-id="A01" id="language">language</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A02" data-id="A02" id="text">written language</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A03" data-id="A03" id="oral">oral account</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=A04" data-id="A04" id="other_oral">other oral account</a>' +
            '</dd>' +
            '</dl>' +
            '<dl>' +
            '<dt><a id="custom_etiquette" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C" data-id="C">custom and etiquette</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C01" data-id="C01" id="business_custom">business custom</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C02" data-id="C02" id="life_customs">Life customs</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C03" data-id="C03" id="life_ritual">Life ritual</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C04" data-id="C04" id="festival_celebration">Festival celebration</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=C99" data-id="C99" id="other_celebration">other celebration</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +
            '<div class="item" style="width: 350px;">' +
            '<dl>' +
            '<dt><a id="practice_nature" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D" data-id="D">The practice of nature and universe</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D01" data-id="D01" id="df_fishery">Dense forest and fishery</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D02" data-id="D02" id="clothing">clothing</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D03" data-id="D03" id="food">Food</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D04" data-id="D04" id="h_construction">Housing and construction</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D05" data-id="D05" id="traffic">Traffic</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D06" data-id="D06" id="medicine">Medicine</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D07" data-id="D07" id="military">Military</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D08" data-id="D08" id="business">business</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D09" data-id="D09" id="farm">Project</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D10" data-id="D10" id="ag_irrigation">astronomy  geography  irrigation</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=D99" data-id="D99" id="on_knowledge">Other natural knowledge</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +
            '<div class="item" style="width:360px;">' +
            '<dl>' +
            '<dt><a id="tt_handmade" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E" data-id="E">the technical of tradition handmade</a>' +
            '</dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E01" data-id="E01" id="tm_manufacture">tool and mechanical manufacture</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E02" data-id="E02" id="p_techniques">Painting techniques</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E03" data-id="E03"  id="daa_products">domestic animal agriculture and forestry products</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E04" data-id="E04" id="d_process">Dyeing process</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E05" data-id="E05" id="p_paperhanging">Paper printing and paperhanging</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E06" data-id="E06" id="k_techniques">knit  techniques</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E07" data-id="E07" id="cp_craft">Calligraphy and painting craft</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E08" data-id="E08" id="s_techniques">smithing  techniques</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E09" data-id="E09" id="pc_technics">paper-cut and carve technics</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E10" data-id="E10" id="sc_techniques">sculpture  techniques</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E11" data-id="E11" id="b_technics">barbecue technics</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E12" data-id="E12" id="w_techniques">wooden  techniques</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=E99" data-id="E99" id="o_kind">other kind</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +
            '<div class="item" style="width:170px;">' +
            '<dl>' +
            '<dt><a id="perform" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B" data-id="B">perform</a></dt>' +
            '<dd>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B01" data-id="B01" id="music">music</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B02" data-id="B02" id="dance">dance</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B03" data-id="B03" id="folk_song">folk song</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B04" data-id="B04" id="traditional_drama">Traditional drama</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B05" data-id="B05" id="quyi">Chinese folk art forms</a>' +
            '<a style="height: 51px;" href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B06" data-id="B06" id="sport">Traditional sports,<br>entertainment and<br>acrobatics</a>' +
            '<a href="' + renderHhtml.uri + '/code/search.html?gb_category_code=B99" data-id="B99" id="other_perform">other   perform</a>' +
            '</dd>' +
            '</dl>' +
            '</div>' +
            '<!--//End-->' +
            '</div>' +
            '</div>';
        this.base('.header', htmlStr);
    },
    footer: function () { //底部
        var htmlStr = '<div class="diich">' +
            '<div class="hd">' +
            '<div class="logo"><a href="http://diich.efeiyi.com/code/content.html"></a></div>' +
            '</div>' +
            '</div>' +
            '<div class="main">' +
            '<div class="hd">' +
            '<div class="lbox">' +
            '<div><em>TEL：400-876-8766</em></div>' +
            '<div><em>EMAIL：efeiyi@efeiyi.com</em></div>' +
            '<div><em>地址：北京市东城区前门大街72&74号二层</em></div>' +
            '<div><em>ADD：2Floor，72&74,Qian Men ST.Dongcheng District,Beijing,China</em></div>' +
            '</div>' +
            '<div class="rbox">' +
            '<div class="share">' +
            '<!-- <a href="" class="facebook" title="facebook"></a>' +
            '<a href="" class="twitter" title="twitter"></a>' +
            '<a href="" class="instagram" title="instagram"></a>' +
            '<a href="" class="linkedin" title="linkedin"></a>-->' +
            '<span class="pages"><img src="' + renderHhtml.uri + '/assets/images/footer_code.png" alt=""></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        this.base('.footer', htmlStr);
    },
    base: function (obj, html) {
        var _el = $(obj);
        _el.html(html);
    }
};


//公共
var common = {
    init: function () {
        this.input();
        this.top();
        header.init();
    },
    top: function () { //返回顶部
        $('.gotop').click(function () {
            $("html,body").animate({scrollTop: 0}, 500);
        });
    },
    input: function () {
        //输入框特效
        var _form = $('.form');
        var _input = _form.find('input.ipt');
        _input.each(function () {
            var _this = $(this);

            //初始化val值
            var oldVal = _this.val();

            //获取焦点
            /*_this.focus(function() {
             // clearInterval(timer);
             //$(this).val('');
             });*/

            //失去焦点
            // _this.blur(function () {
            //     // clearInterval(timer);
            //
            //     var newVal = $(this).val();
            //     if (newVal == '') {
            //         $(this).val(oldVal);
            //     }
            //
            //     // timer = setInterval(slider, speed);
            // });

        });
    },
    pad: function (num, length) { //个位数补零
        if (!length) {
            length = 10;
        }
        return ("0" + num).substr(-length);
    },
    slide: function () { //轮播图
        var parent = $('.slider');
        var imgLi = parent.find('ul.img li');
        var imgLen = imgLi.length;
        var numLi = parent.find('ul.num li');
        var form = parent.find('.form');
        var ipt = form.find('input.ipt');
        var textP = form.find('div.text p');
        var cur = 0;
        var speed = 5000;
        var timer = null;
        var _value = ['苏州刺绣技艺', 'Tango', 'Yoga', 'Equitation'];
        var _value_en = ['Embroidery', 'Tango', 'Yoga', 'Equitation'];

        numLi.mousedown(function () {
            clearInterval(timer);
            cur = $(this).index();
            $(this).addClass('active').siblings('li').removeClass('active');
            imgLi.eq(cur).stop(true).fadeIn().siblings('li').fadeOut();
            textP.eq(cur).stop(true).fadeIn().siblings('p').fadeOut();
            var language = localStorage.getItem("language") ? localStorage.getItem("language") : 'zh-CN';
            if(language == 'zh-CN'){
                ipt.attr('placeholder', _value[cur]);
            }else if(language == 'en'){
                ipt.attr('placeholder', _value_en[cur]);
            }

        });

        numLi.mouseup(function () {
            timer = setInterval(slider, speed);
        });

        //轮播
        timer = setInterval(slider, speed);

        function slider() {
            if (cur < imgLen - 1) {
                cur++;
            } else {
                cur = 0;
            }
            numLi.eq(cur).addClass('active').siblings('li').removeClass('active');
            imgLi.eq(cur).stop(true).fadeIn().siblings('li').fadeOut();
            textP.eq(cur).stop(true).fadeIn().siblings('p').fadeOut();

            var language = localStorage.getItem("language") ? localStorage.getItem("language") : 'zh-CN';
            if(language == 'zh-CN'){
                ipt.attr('placeholder', _value[cur]);
            }else if(language == 'en'){
                ipt.attr('placeholder', _value_en[cur]);
            }
        }


    }
};

//导航部分
var header = {
    init: function () {
        this.scroll();
        this.drop("zh");
    },
    scroll: function () { //页面滚动导航悬浮
        var _header = $('#home-header');
        var _top = $('.gotop');
        var _dropMenu=$('.drop_menu');
        var _filter = $('.filter_search_fixed');

        if (_header) {
            $(window).scroll(function () {
                if ($(window).scrollTop() > 630) {
                    _header.addClass('active');
                    _top.css('opacity', '1');
                    _dropMenu.addClass('active');
                } else {
                    _header.removeClass('active');
                    _top.css('opacity', '0');
                    _filter.slideUp('fast');
                    _dropMenu.removeClass('active');
                }
            });
        }

    },
    drop: function (language) { //非遗名录 二级导航
        var drop = $('#drop_menu');
        var dropEn = $('#drop_menu_en');
        var item = drop.find('.item');
        var _header = $('.header');
        var _houer = _header.find('.nav li').eq(1);
        var timer = null;
        var speed = 200;

        //中文
        if (language || language == 'zh') {
            //去掉dd的左边距
            item.eq(0).css('width', '86px');
            item.eq(1).css('width', '143px');
            item.eq(2).css('width', '100px');
            item.eq(3).css('width', '240px');
            item.eq(3).find('dd a:even').css('width', '72px');
            item.eq(3).find('dd a:odd').css({'width': '129px', 'margin-left': '24px'});
            item.eq(4).css('width', '210px');
            item.eq(4).find('dd a:even').css('width', '115px');
            item.eq(4).find('dd a:odd').css({'width': '66px', 'margin-left': '24px'});
        }

        //滑过非遗名录
        _houer.hover(
            function () {
                clearInterval(timer);
                var _height = _header.outerHeight(true);
                if ($(this).text() == 'ICH Directory') {
                    dropEn.css('top', _height + 'px').slideDown('fast');
                } else {
                    drop.css('top', _height + 'px').slideDown('fast');
                }
                stopWheel();
            },
            function () {
                timer = setInterval(function () {
                    dropEn.slideUp();
                    drop.slideUp();
                }, speed);
                $(document).off('wheel');
            }
        );

        //非遗名录下拉菜单
        drop.hover(//中文
            function () {
                clearInterval(timer);
                stopWheel();
            },
            function () {
                timer = setInterval(function () {
                    drop.slideUp();
                }, speed);
                $(document).off('wheel');
            }
        );
        dropEn.hover(//英文
            function () {
                clearInterval(timer);
                stopWheel();
            },
            function () {
                timer = setInterval(function () {
                    dropEn.slideUp();
                }, speed);
                $(document).off('wheel');
            }
        );

        //阻止鼠标滚动
        function stopWheel() {
            $(document).on('wheel',function () {
                return false;
            });
        };
    }
};

//首页 ok
var homePage = {
    init: function () {
        common.slide(); //轮播图

    },
    data: function () {
        var dataMap = [
            {
                name: '克罗地亚',
                en: 'Croatia',
                style: 'top:120px;left:512px;',
                count: '共计14项非遗项目',
                desc: '克罗地亚北部的姜饼制作技艺、奥耶康卲演唱方式、锡尼斯卡圆环骑士竞赛',
                present: '具有代表性项目有：'
            },
            {
                name: '希腊',
                en: 'Greece',
                style: 'top:162px;left:490px;',
                count: '共计3项非遗项目',
                desc: '希俄斯岛玛蒂脂制作工艺、提尼安岛大理石工艺',
                present: '具有代表性项目有：'
            },
            {
                name: '墨西哥',
                en: 'Mexico',
                count: '共计9项非遗项目',
                style: 'top: 206px;left: 158px',
                desc: '土著亡灵节、飞人典礼',
                present: '具有代表性项目有：'
            },
            {
                name: '巴西',
                en: 'Brazil',
                style: 'top: 322px;left: 302px',
                count: '共计8项非遗项目',
                desc: '巴亥瑞康卡乌的圆圈桑巴舞、瓦雅皮人的口头和图画表达形式',
                present: '具有代表性项目有：'
            },
            {
                name: '阿根廷',
                en: 'Argentina',
                style: 'top: 390px;left: 256px',
                count: '共计1项非遗项目',
                desc: '布宜诺斯艾利斯的传统装饰画绘画技巧',
                present: '具有代表性项目有：'
            },
            {
                name: '比利时',
                en: 'Belgium',
                style: 'top:76px;left:472px',
                count: '共计11项非遗项目',
                desc: '比利时啤酒文化、东戴恩克尔克骑马捕虾、班什狂欢节',
                present: '具有代表性项目有：'
            },
            {
                name: '匈牙利',
                en: 'Hungary',
                style: 'top: 102px;left: 502px;',
                count: '共计4项非遗项目',
                desc: '莫哈奇的冬末面具狂欢节、保护传统民俗音乐的柯达伊概念',
                present: '具有代表性项目有：'
            },
            {
                name: '法国',
                en: 'France',
                style: 'top: 102px;left: 459px;',
                count: '共计14项非遗项目',
                desc: '法国美食大餐、法国传统马术、奥布松挂毯',
                present: '具有代表性项目有：'
            },
            {
                name: '德国',
                en: 'Germany',
                style: 'top:82px;left:484px;',
                count: '共计1项非遗项目',
                desc: '合作社组织共同分享利益的理念和方法',
                present: '具有代表性项目有：'
            },
            {
                name: '意大利',
                en: 'Italy',
                style: 'top: 119px;left: 471px;',
                count: '共计5项非遗项目',
                desc: '克雷莫纳的传统小提琴工艺、西西里木偶剧',
                present: '具有代表性项目有：'
            },
            {
                name: '土耳其',
                en: 'Turkey',
                style: 'top: 179px;left: 513px;',
                count: '共计13项非遗项目',
                desc: '土耳其咖啡、土耳其水拓画、科萨克传统仪式',
                present: '具有代表性项目有：'
            },
            {
                name: '沙特阿拉伯',
                en: 'Saudi Arabia',
                style: 'top: 222px;left: 552px;',
                count: '共计2项非遗项目',
                desc: 'Almezmar,应和鼓点节奏的棍舞、Alardah Alnajdiyah,沙特阿拉伯的舞蹈、鼓乐和诗歌',
                present: '具有代表性项目有：'
            },
            {
                name: '印度',
                en: 'India',
                style: 'top: 224px;left: 640px;',
                count: '共计11项非遗项目',
                desc: '瑜伽、拉达克的佛经诵读，在印度查谟和克什米尔地区跨喜马拉雅的拉达克诵读神圣的佛教经文',
                present: '具有代表性项目有：'
            },
            {
                name: '蒙古',
                en: 'Mongolia',
                style: 'top: 124px;left: 666px;',
                count: '共计11项非遗项目',
                desc: '马头琴传统音乐、蒙古传统艺术呼麦、那达慕大会',
                present: '具有代表性项目有：'
            },
            {
                name: '中国',
                en: 'China',
                style: 'top: 177px;left: 734px;',
                count: '共计39项非遗项目',
                desc: '京剧、中国书法、中医针灸、端午节',
                present: '具有代表性项目有：'

            },
            {
                name: '日本',
                en: 'Japan',
                style: 'top: 188px;left: 798px;',
                count: '共计21项非遗项目',
                desc: '歌舞伎、和食，日本的传统饮食文化，常见于新年庆祝活动、和纸，日本的传统手工造纸工艺',
                present: '具有代表性项目有：'
            },
            {
                name: '韩国',
                en: 'Korea',
                style: 'top: 189px;left: 769px',
                count: '共计17项非遗项目',
                desc: '韩国传统泡菜制作工艺、江陵端午祭',
                present: '具有代表性项目有：'
            },
            {
                name: '印度尼西亚',
                en: 'Indonesia',
                style: 'top: 298px;left: 744px',
                count: '共计8项非遗项目',
                desc: '哇扬皮影偶戏、印度尼西亚的蜡染印花工艺',
                present: '具有代表性项目有：'
            },
            {
                name: '西班牙',
                en: 'Spain',
                style: 'top: 183px;left: 426px',
                count: '共计13项非遗项目',
                desc: '弗拉明戈、叠人塔',
                present: '具有代表性项目有：'
            },
            {
                name: '越南',
                en: 'Vietnam',
                style: 'top: 246px;left: 709px',
                count: '共计11项非遗项目',
                desc: '歌筹、雅乐——越南宫廷音乐',
                present: '具有代表性项目有：'
            }

        ];
        return dataMap;
    },
    endata: function () {
        var dataMap = [
            {
                name: '克罗地亚',
                en: 'Croatia',
                style: 'top:120px;left:512px;',
                count: 'A total of 9 projects',
                desc: 'Northern Gingerbread Production Techniques, Oyekan Kung Concert Mode, Sini Card Rings Knights Competition',
                present: 'Represent projects：'
            },
            {
                name: '希腊',
                en: 'Greece',
                style: 'top:162px;left:490px;',
                count: 'A total of 3 projects',
                desc: 'Chios Island Marti Fat Making Craft, Tienan Island Marble Crafts',
                present: 'Represent projects：'
            },
            {
                name: '墨西哥',
                en: 'Mexico',
                count: 'A total of 9 projects',
                style: 'top: 206px;left: 158px',
                desc: 'Aboriginal Scourge, Flying',
                present: 'Represent projects：'
            },
            {
                name: '巴西',
                en: 'Brazil',
                style: 'top: 322px;left: 302px',
                count: 'A total of 8 projects',
                desc: 'Baji Rikangkawu\'s Circle Samba, Ouya Pei\'s oral and pictorial forms of expression',
                present: 'Represent projects：'
            },
            {
                name: '阿根廷',
                en: 'Argentina',
                style: 'top: 390px;left: 256px',
                count: '1 farm',
                desc: 'Buenos Aires\'s traditional decorative painting techniques',
                present: 'Represent projects：'
            },
            {
                name: '比利时',
                en: 'Belgium',
                style: 'top:76px;left:472px',
                count: 'A total of 11 projects',
                desc: 'Belgian Beer Culture, East Dyke Kirk Riding Shrimp, Bans Carnival',
                present: 'Represent projects：'
            },
            {
                name: '匈牙利',
                en: 'Hungary',
                style: 'top: 102px;left: 502px;',
                count: 'A total of 4 projects',
                desc: 'Mohach\'s Winter Carnival, Carnival to Protect Traditional Folk Music',
                present: 'Represent projects：'
            },
            {
                name: '法国',
                en: 'France',
                style: 'top: 102px;left: 459px;',
                count: 'A total of 14 projects',
                desc: 'French cuisine, French traditional equestrian, Aubuxong tapestry',
                present: 'Represent projects：'
            },
            {
                name: '德国',
                en: 'Germany',
                style: 'top:82px;left:484px;',
                count: 'A total of 9 projects',
                desc: 'Cooperative organization to share the interests of the concept and method',
                present: 'Represent projects：'
            },
            {
                name: '意大利',
                en: 'Italy',
                style: 'top: 119px;left: 471px;',
                count: 'A total of 9 projects',
                desc: 'Cremona\'s traditional violin craft, Sicilian puppet show',
                present: 'Represent projects：'
            },
            {
                name: '土耳其',
                en: 'Turkey',
                style: 'top: 179px;left: 513px;',
                count: 'A total of 9 projects',
                desc: 'Turkish coffee, Turkish water painting, Korsak traditional ceremony',
                present: 'Represent projects：'
            },
            {
                name: '沙特阿拉伯',
                en: 'Saudi Arabia',
                style: 'top: 222px;left: 552px;',
                count: 'A total of 9 projects',
                desc: 'Almezmar, should dance with rhythm of the drums, Alardah Alnajdiyah, Saudi Arabia\'s dance, drums and poetry',
                present: 'Represent projects：'
            },
            {
                name: '印度',
                en: 'India',
                style: 'top: 224px;left: 640px;',
                count: 'A total of 9 projects',
                desc: 'Yoga, Ladakh\'s Buddhist scriptures, recitation of the holy Buddhist scriptures across the Himalayan Ladakh in the Jammu and Kashmir regions of India',
                present: 'Represent projects：'
            },
            {
                name: '蒙古',
                en: 'Mongolia',
                style: 'top: 124px;left: 666px;',
                count: 'A total of 9 projects',
                desc: 'Ma Touqin traditional music, Mongolian traditional art call wheat, that Dammam meeting',
                present: 'Represent projects：'
            },
            {
                name: '中国',
                en: 'China',
                style: 'top: 177px;left: 734px;',
                count: 'A total of 39 projects',
                desc: 'Peking Opera, Chinese calligraphy, Chinese acupuncture, Dragon Boat Festival',
                present: 'Represent projects：'
            },
            {
                name: '日本',
                en: 'Japan',
                style: 'top: 188px;left: 798px;',
                count: 'A total of 21 projects',
                desc: 'Kabuki, and food, the traditional Japanese food culture, common in the New Year celebration, and paper, Japan\'s traditional handmade papermaking craft',
                present: 'Represent projects：'
            },
            {
                name: '韩国',
                en: 'Korea',
                style: 'top: 189px;left: 769px',
                count: 'A total of 17 projects',
                desc: 'Korean traditional kimchi making process, Jiangling Dragon Boat Festival',
                present: 'Represent projects：'
            },
            {
                name: '印度尼西亚',
                en: 'Indonesia',
                style: 'top: 298px;left: 744px',
                count: 'A total of 8 projects',
                desc: 'Wo yang puppet show, Indonesian batik printing process',
                present: 'Represent projects：'
            },
            {
                name: '西班牙',
                en: 'Spain',
                style: 'top: 183px;left: 426px',
                count: 'A total of 18 projects',
                desc: 'Flamingo, stacked tower',
                present: 'Represent projects：'
            },
            {
                name: '越南',
                en: 'Vietnam',
                style: 'top: 246px;left: 709px',
                count: 'A total of 11 projects',
                desc: 'Song music, music - Vietnamese court music',
                present: 'Represent projects：'
            }

        ];
        return dataMap;
    },


    map: function (lang) {//地图

        if(!$('div').hasClass('map')){
            return;
        }

        lang = localStorage.getItem("language");
        if (lang == 'en') {
            var data = this.endata();
        } else {
            var data = this.data();
        }

        var map = $('#map');
        map.find('span').remove();
        var broWidth = document.documentElement.clientWidth;  //浏览器可视宽度
        var modal = map.find('.modal');
        var zh = modal.find('.zh');
        var en = modal.find('.en');
        var count = modal.find('.count');
        var name = modal.find('.name');
        var txt = modal.find('.content .txt');
        var more = modal.find('.content .more');
        var str = '';
        var active = '';
        for (var i = 0; i < data.length; i++) {
            if (i == 14) {
                active = ' active';
            } else {
                active = '';
            }
            str += '<span class="breathe item' + (i + 1) + active + '" style="' + data[i].style + '" title="' + data[i].name + '"></span>';
        }
        map.append(str);


        getData(14);
        var _span = map.find('span');

        //初始化计算
        var leftOffset = _span.eq(14).offset().left + 380 + 31;


        if (broWidth - leftOffset < 10) {
            modal.addClass('less');
            modal.css({top: 150, left: 334}).fadeIn(100);
        } else {
            modal.removeClass('less');
            modal.css({top: 150, left: 765}).fadeIn(100);
        }


        // computeScreen();
        _span.hover(function () {
            var index = $(this).index() - 1;
            //位置
            var _top = $(this).position().top;
            var _left = $(this).position().left;
            var _leftOffset = $(this).offset().left + 380 + 31;
            //数据
            getData(index);

            //判断浮层距离右侧间距

            if (broWidth - _leftOffset < 10) {
                modal.addClass('less');
                modal.css({top: _top - 27, left: _left - 400}).fadeIn(100);
            } else {
                modal.removeClass('less');
                modal.css({top: _top - 27, left: _left + 31}).fadeIn(100);
            }


            $(this).addClass('active').siblings('span').removeClass('active');
        });

        //动态获取数据
        function getData(index) {
            zh.text(data[index].name);
            en.text(data[index].en);
            txt.text(data[index].desc);
            count.text(data[index].count);
            name.text(data[index].present);
            //var isLink = data[index].link;
            // if(isLink){
            //     more.show().html('<a href="'+data[index].link+'" title="查看全部" target="_blank">查看全部</a>');
            // }else {
            //     more.hide();
            // }

        }

    }
};

//文本处理相关
var textHandle = {
    getLength: function (str) { //获取字符串长度   汉字是2
        var real = 0;
        var len = str.length;
        var charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = str.charCodeAt(i);
            if (charCode >= 0 && charCode <= 128) {
                real += 1;
            } else {
                real += 2;
            }
        }
        return real;
    },
    set: function (el) {
        var _this = this; //存储当前this
        var obj = $(el); //获取目标元素
        obj.each(function () {
            var _text = $(this).text(); //目标元素的内容
            var _len = _this.getLength(_text) / 2; //计算目标元素内容的长度
            if (_len >= 200 && _len <= 1200) {
                $(this).addClass('column3');
            }
        })
    }
};


$(function () {
    renderHhtml.init();
    common.init();
    //隐藏email
    $('.main em').eq(1).hide();
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}

function getLang() {
    var lang = localStorage.getItem("language");
    if(lang==null ||  typeof(lang)=='undefined' ){
        lang = (navigator.systemLanguage?navigator.systemLanguage:navigator.language);
    }
    /*   if(lang=='zh-CN'){
     lang='chi';
     }else{
     lang='eng';
     }*/
    return lang;
}

var cloneObj = function (obj) {
    var newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (var key in obj) {
        var val = obj[key];
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
        newObj[key] = typeof val === 'object' ? cloneObj(val): val;
    }
    return newObj;
};

var tipBox={
    init:function (type,text,speed) {
        this.template(type,text,speed);
    },
    template:function (type,text,speed) {
        var html='<div class="tipbox '+type+'" style="display: none;">' +
            '        <div class="head">提示</div>' +
            '        <div class="content">' +
            '            <i class="icon"></i><span>'+text+'</span>' +
            '        </div>' +
            '    </div>';
        $('body').append(html);
        $('.tipbox').fadeIn(300);
        setTimeout(function () {
            $('.tipbox').fadeOut(300).remove();
        },speed)
    }
};

