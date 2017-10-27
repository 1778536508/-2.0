//上传图片
var upload = {
    template: function (type, url) {//0是视频  1是图片 url上传的地址
        var _name = '';
        _name = (type == 1) ? 'mypic' : 'video';
        var _parent = '<form class="upload" action="' + url + '" method="post" enctype="multipart/form-data">' +
            '<input class="_token" type="hidden" name="_token" value="">' +
            '<div class="progress">' +
            '<div class="ui loader"></div>' +
            '<div class="font">正在加载</div>' +
            '</div>' +
            '<input class="file" type="file" name="mypic">' +
            '</form>' +
            '<img class="preview" src="" />';
        return _parent;
    },
    submit: function (obj, type, url, callback) {
        var _this = this;
        $(obj).append(this.template(type, url));
        $(document).on('change', '.file', function () {
            var parent = $(this).parents('.file_up');
            var preview = parent.find('.preview');
            var _form = $(this).parents('.upload');
            var progress = _form.find('.progress');
            var bar = progress.find('.bar');
            var percent = progress.find('.percent');
            _form.ajaxSubmit({
                dataType: 'json',
                beforeSend: function () {
                    var percentVal = '0%';
                    progress.show();
                    bar.width(percentVal);
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal);
                },
                success: function (data) {
                    if (callback || callback != 'undefinied') {
                        callback(data);
                        bar.width('');
                        parent.addClass('active');
                        progress.hide();
                    }
                },
                error: function (xhr) {
                    //todo
                }
            });
        });
    },
    remove: function (callback) {
        $('#images').on('click', '.remove i', function () {
            $(this).parents('.item').remove();
            if (callback && callback != 'undefined') {
                callback();
            }
        });
    }
};

//选择地域
var selectArea = {
    init: function (type, callback) {
        if (type == 0) {
            this.bind(callback);
        } else {
            this.radio(callback);
        }
    },
    template: function (data) {
        var _dom = '';
        if (data.length != 0) {
            for (var i = 0; i < data.length; i++) {
                _dom += '<li data-pages="' + data[i].code + '"><span>' + data[i].name + '</span></li>';
            }
            return '<ul>' + _dom + '</ul>';
        } else {
            return '';
        }
    },
    initDom: function (data) {//获取国家
        var temp = '<div class="tab">' +
            '  <span style="display: block;"><strong>请选择</strong><i class="icon"></i><em class="icon"></em></span>' +
            '  <span><strong>请选择</strong><i class="icon"></i></span>' +
            '  <span style="margin-right:0"><strong>请选择</strong><i class="icon"></i></span>' +
            '<i class="icon_close"></i>' +
            '</div>' +
            '<div class="con">' +
            '  <div class="items scrollbar" data-type="level1"" style="display:block">' + this.template(data) + '</div>' +
            '  <div class="items scrollbar" data-type="level2""></div>' +
            '  <div class="items scrollbar" data-type="level3""></div>' +
            '</div>';
        return temp;
    },
    bind: function (callback) {
        var _this = this;
        var result = [];
        var resultText = [];
        var area = $('#area');
        var select = $('#select');
        var selected = $('#selected');
        var isFirst = true;
        $('div[data-type=selectArea]').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (isFirst) {
                isFirst = false;
                var el = $(this);
                var data2 = [];
                var data3 = [];
                var store = ''; //临时
                var storeText = ''; //临时
                //初始化dom
                select.append(_this.initDom(dic_arr_city)).show();
                area.show();
                var tab = select.find('.tab span');
                var items = select.find('.items');
                var items1 = items.eq(0);
                var items2 = items.eq(1);
                var items3 = items.eq(2);

                //1.点击第一个
                items1.on('click', 'li', function () {
                    var _index = $(this).index();
                    var _text = $(this).text();
                    var _code = $(this).attr('data-pages');
                    data2 = dic_arr_city[_index].children;
                    items.hide().html('');
                    items2.html('').append(_this.template(data2)).show();
                    isTab(data2.length, 0, _text, _code);
                });

                //2.点击第二个
                items2.on('click', 'li', function () {
                    var _index = $(this).index();
                    var _text = $(this).text();
                    var _code = $(this).attr('data-pages');
                    data3 = data2[_index].children;
                    items.hide().html('');
                    items3.html('').append(_this.template(data3)).show();
                    isTab(data3.length, 1, _text, _code);
                });

                //2.点击第三个
                items3.on('click', 'li', function () {
                    var _text = $(this).text();
                    var _code = $(this).attr('data-pages');
                    tab.removeClass('selected');
                    isTab(0, 2, _text, _code);
                });

                //tab标签状态
                function isTab(size, index, text, code) {//a索引  b选中的文字 c是code值
                    tab.removeClass('selected');
                    tab.eq(index).addClass('active selected').find('strong').text(text);
                    tab.eq(index + 1).show();
                    store += code + ',';
                    storeText += text;

                    //当没有子数据的时候赋值给result
                    if (size == 0 && index == 0) {
                        assignValue();
                        isFirst = true;
                    }
                    //当选择区县的时候把数据赋值给result
                    if (index == 2) {
                        assignValue();
                        isFirst = true;
                    }

                    function assignValue() {
                        result.push(store);
                        resultText.push(storeText);
                        result = ArrayUnique(result);
                        resultText = ArrayUnique(resultText);
                        createSelected();
                        select.html('').hide();
                        el.attr('value', result);
                        if (callback && callback != 'undefined') {
                            callback(result);
                        }
                    }

                    //去重数组
                    function ArrayUnique(a) {
                        var hash = {},
                            len = a.length,
                            result = [];

                        for (var i = 0; i < len; i++) {
                            if (!hash[a[i]]) {
                                hash[a[i]] = true;
                                result.push(a[i]);
                            }
                        }
                        return result;
                    }

                    //字符串去重
                    function StringUnique(str) {
                        var newStr = "";
                        for (var i = 0; i < str.length; i++) {
                            if (newStr.indexOf(str[i]) == -1) {
                                newStr += str[i];
                            }
                        }
                        return newStr;
                    }
                }

                //创建选中元素
                function createSelected() {
                    var data = resultText;
                    var str = '';
                    for (var i = 0; i < data.length; i++) {
                        str += '<li><span>' + data[i] + '<i class="icon"></i></span></li>';
                    }
                    selected.html('').append(str);
                }
            }
        });

        //删除选中的数据
        selected.on('click', 'span', function () {
            var _index = $(this).index();
            $(this).parents('li').remove();
            result.splice(_index, 1);
            if (callback && callback != 'undefined') {
                callback(result);
            }
        });

        //关闭
        select.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        $(document).on("click", function () {
            isFirst = true;
            select.hide().html('');
        });
    },
    radio: function (callback) {
        var _this = this;
        var result = [];
        var resultText = [];
        var area = $('#area');
        var select = $('#select');
        var selected = $('#selected');
        var isFirst = true;
        $('div[data-type=selectArea]').on('click', function () {
            if (isFirst) {
                isFirst = false;
                var el = $(this);
                var data2 = [];
                var data3 = [];
                var store = ''; //临时
                var storeText = ''; //临时
                //初始化dom
                select.append(_this.initDom(dic_arr_city)).show();
                area.show();
                var tab = select.find('.tab span');
                var items = select.find('.items');
                var items1 = items.eq(0);
                var items2 = items.eq(1);
                var items3 = items.eq(2);

                //1.点击第一个
                items1.on('click', 'li', function () {
                    var _index = $(this).index();
                    var _text = $(this).text();
                    var _code = $(this).attr('data-pages');
                    data2 = dic_arr_city[_index].children;
                    items.hide().html('');
                    items2.html('').append(_this.template(data2)).show();
                    isTab(data2.length, 0, _text, _code);
                });

                //2.点击第二个
                items2.on('click', 'li', function () {
                    var _index = $(this).index();
                    var _text = $(this).text();
                    var _code = $(this).attr('data-pages');
                    data3 = data2[_index].children;
                    items.hide().html('');
                    items3.html('').append(_this.template(data3)).show();
                    isTab(data3.length, 1, _text, _code);
                });

                //2.点击第三个
                items3.on('click', 'li', function () {
                    var _text = $(this).text();
                    var _code = $(this).attr('data-pages');
                    tab.removeClass('selected');
                    isTab(0, 2, _text, _code);
                });

                //tab标签状态
                function isTab(size, index, text, code) {//a索引  b选中的文字 c是code值
                    tab.removeClass('selected');
                    tab.eq(index).addClass('active selected').find('strong').text(text);
                    tab.eq(index + 1).show();
                    store += code + ',';
                    storeText += text;
                    selected.html('');
                    //当没有子数据的时候赋值给result
                    if (size == 0 && index == 0) {
                        assignValue();
                        isFirst = true;
                    }
                    //当选择区县的时候把数据赋值给result
                    if (index == 2) {
                        assignValue();
                        isFirst = true;
                    }

                    function assignValue() {
                        result = result.splice(1, 1);
                        result.push(store);
                        resultText.push(storeText);
                        createSelected(storeText);
                        select.html('').hide();
                        el.attr('value', result);
                        if (callback && callback != 'undefined') {
                            callback(result);
                        }
                    }
                }

                //创建选中元素
                function createSelected(data) {
                    selected.append('<li><span>' + data + '<i class="icon"></i></span></li>');
                }
            }

        });

        //删除选中的数据
        selected.on('click', 'span', function () {
            var _index = $(this).index();
            $(this).parents('li').remove();
            result.splice(_index, 1);
            if (callback && callback != 'undefined') {
                callback(result);
            }
        });
    }
};

//项目表单
var projectPage = {
    init: function () {
        var _this = this;
        $('#tpl').load('/code/inputs/Tpl/proBaseInfo.html', function () {//加载基本信息页面
            _this.bind();
            _this.uploadImgage();
        });
        this.slideBar.init(); //左侧菜单
    },
    bind: function () {
        var _data = [
            {value: 1, name: '口头传说和表述'},
            {value: 11, name: '表演艺术'},
            {value: 28, name: '传统的手艺技能'},
            {value: 55, name: '社会风俗、利益、节庆'},
            {value: 77, name: '有关自然界和宇宙的只是和实践'}
        ];
        this.selectCate.init('div[data-type=selectCate]', _data); //选择分类
        this.declare();  //是否为自己申报传承人
        selectArea.init(0, function (data) {//选择地址 0是选择地址的类型 0是多选 1是单选
            // console.log(data);
        });


    },
    slideBar: {//左侧菜单
        init: function () {
            this.effect();
        },
        effect: function () {
            var _this = this;
            var slide = $('.ipt_base .slide');
            var dt = slide.find('.dt');
            var dd = slide.find('.dd');
            dd.find('li:last-child').css('margin-bottom', '0');
            //点击dt 展开收起
            dt.on('click', function () {
                var _dd = $(this).siblings('.dd');
                var _dateType = $(this).attr('data-type');
                if (_dd.length > 0) {
                    _dd.slideToggle(100);
                }
                $('#tpl').load('/code/inputs/Tpl/' + _dateType + '.html', function () {
                    projectPage.bind();
                    projectPage.uploadImgage(); //上传题图
                    if (_dateType === 'longFieldCustom') {
                        projectPage.radioImage(); //上传题图
                    }
                });
                projectPage.selectCate.init();
            });

            //点击子分类
            dd.on('click', 'li', function () {
                var _dateType = $(this).attr('data-type');
                $(this).addClass('active').siblings('li').removeClass('active');
                if (_dateType === 'longField') {
                    $('#tpl').load('/inputs/Tpl/longField.html', function () {
                        projectPage.bind();
                        projectPage.radioImage(); //上传题图
                    });
                }
            });
        }
    },
    selectCate: {//选择一级分类
        init: function (obj, data) {
            var _this = this;
            if (data) {
                $(document).on('click', obj, function () {
                    var $this = $(this);
                    var index = $(this).attr('data-index');
                    _this.bind(index, data, function (response) {//value 选中ID data数据
                        $this.attr('value', response.value);
                        $this.attr('data-index', response.index);
                        $this.text(response.name);
                    });
                });
            }
        },
        template: function (data) {
            var str = '';
            for (var i = 0; i < data.length; i++) {
                str += '<li value="' + data[i].value + '"><span class="radio"><i></i></span>' + data[i].name + '</li>';
            }
            var temp = '<div class="cate_layer" style="display: block;">' +
                '<div class="content">' +
                '<div class="title">选择项目类别</div>' +
                '<div class="items">' + str + '</div>' +
                '<div class="confirm">' +
                '<a href="javascript:;" class="btn">确认</a>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="overbg"></div>';
            return temp;
        },
        bind: function (index, data, callback) {//操作弹出框
            var body = $('body');
            var _text = body.find('div[data-type=selectCate]').text();
            body.find('.cate_layer').remove();
            body.find('.overbg').remove();
            body.append(this.template(data));
            var parent = $('.cate_layer');
            var _li = parent.find('li');
            var _btn = parent.find('.btn');
            var callData = {};

            for (var i = 0; i < data.length; i++) {
                if (_text == data[i].name) {
                    console.log(i);
                    _btn.addClass('active');
                    _li.eq(i).addClass('active');
                }
            }

            //选择
            _li.on('click', function () {
                _btn.addClass('active');
                $(this).addClass('active').siblings('li').removeClass('active');

                //填充数据
                return callData = {
                    value: $(this).attr('value'),
                    name: $(this).text(),
                    index: $(this).index()
                };

            });


            //选中
            _btn.on('click', function () {
                parent.remove();
                $('.overbg').remove();
                if (callback || callback != 'undefinied') {
                    callback(callData);
                }
            });

        }
    },
    declare: function () {//是否为自己申报传承人
        $('.horizontal .group').on('click', '.radio', function () {
            var index = $(this).index();
            var drop = $(this).parents('.group').siblings('div[data-type=group-drop]');
            $(this).addClass('active').siblings('.radio').removeClass('active');
            if (index == 0) {
                drop.slideDown('fast');
                $(this).siblings('span').find('input').removeAttr("checked");
                $(this).find('input').attr("checked", "true");

                //时间
                $("#ECalendar_date").ECalendar({
                    type: "date",
                    skin: 2,
                    offset: [0, 2]
                    // type:"time",   //模式，time: 带时间选择; date: 不带时间选择;
                    // stamp : false,   //是否转成时间戳，默认true;
                    // offset:[0,2],   //弹框手动偏移量;
                    // format:"yyyy-mm-dd",   //时间格式 默认 yyyy-mm-dd hh:ii;
                    // skin:3,   //皮肤颜色，默认随机，可选值：0-8,或者直接标注颜色值;
                    // step:10,   //选择时间分钟的精确度;
                    // callback:function(v,e){} //回调函数
                });

            } else {
                drop.slideUp('fast');
                $(this).siblings('span').find('input').removeAttr("checked");
                $(this).find('input').attr("checked", "true");
            }
        });
    },
    uploadImgage: function () {//上传图片
        var el = $('.horizontal .group .control .file_up');
        upload.submit(el, 1, 'user/uploadFile', function (data) {
            $('.preview').attr('src', data).show();
        });
        $('._token').val($('meta[name=token]').attr('content'));
    },
    radioImage: function () {
        var _images = $('#images');
        //
        var el = $('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el, 1, 'user/uploadFile', function (data) {
            _images.find('.handle').before(templateItem(data));
            isItemStatus();
        });
        //赋值token  有用则留无用则删除
        $('._token').val($('meta[name=token]').attr('content'));

        //模版
        function templateItem(str) {
            var templ = '<div class="item">' +
                '<img src="' + str + '" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '<span class="remove"><i></i></span>' +
                '</div>';
            return templ;
        }

        isItemStatus();

        //判断上传图片的状态
        function isItemStatus() {
            var _item = _images.find('.item');
            if (_item.length >= 3) {
                _images.addClass('active');
            }
            _images.find('.item:even').css('margin-right', '10px');
        }

        upload.remove(function () {
            //todo
        });
    }
};

//传承人认证
var inheritorPage = {
    init: function () { //el元素   url 上传地址
        var _this = this;
        $('#tpl').load('/code/inputs/Tpl/masterBaseStep1.html', function () {//加载基本信息页面
            _this.bind();
            projectPage.uploadImgage(); //上传题图
        });
        this.slideBar.init(); //左侧菜单
    },
    bind: function () {
        selectArea.init(1, function (data) {
            console.log(data);
        });
        this.declare();
    },
    slideBar: {//左侧菜单
        init: function () {
            this.effect();
        },
        effect: function () {
            var _this = this;
            var slide = $('.ipt_base .slide');
            var dt = slide.find('.dt');
            var dd = slide.find('.dd');
            dd.find('li:last-child').css('margin-bottom', '0');
            //点击dt 展开收起
            dt.on('click', function () {
                var _dd = $(this).siblings('.dd');
                var _dateType = $(this).attr('data-type');
                if (_dd.length > 0) {
                    _dd.slideToggle(100);
                }
                $('#tpl').load('/code/inputs/Tpl/' + _dateType + '.html', function () {
                    projectPage.bind();
                    projectPage.uploadImgage(); //上传题图
                    if (_dateType === 'longFieldCustom') {
                        projectPage.radioImage(); //上传题图
                    }
                });
                projectPage.selectCate.init();
            });

            //点击子分类
            dd.on('click', 'li', function () {
                var _dateType = $(this).attr('data-type');
                $(this).addClass('active').siblings('li').removeClass('active');
                $('#tpl').load('/code/inputs/Tpl/' + _dateType + '.html', function () {
                    projectPage.bind();
                    projectPage.radioImage(); //上传题图
                });
            });
        }
    },
    template: function () {
        var str = `<div class="edit">
                    <form action="">
                        <div class="text">
                            <textarea name="" id="" cols="30" rows="10"></textarea>
                        </div>
                        <div class="images" id="images">
                            <div class="handle">
                                <div class="add file_up">
                                    <span class="icon"><i></i></span>
                                    <span>添加图片</span>
                                </div>
                                <div class="add file_up" style="margin-right:0;">
                                    <span class="icon icon2"><i></i></span>
                                    <span>添加视频</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <!--//edit End-->
                <div class="buttons">
                    <a href="">删除此项</a>
                    <a class="next" href="">下一步</a>
                    <a href="">跳过此项</a>
                </div>`;
        return str;
    },
    create: function () {
        var temp = $('#temp');
        temp.html('').append(this.template());
    },
    declare: function () {//是否为自己申报传承人
        $('.horizontal .group').on('click', '.radio', function () {
            $(this).addClass('active').siblings('.radio').removeClass('active');
        });
    },
    uploadImgage: function () {//上传图片
        var el = $('.horizontal .group .control .file_up');
        upload.submit(el, 1, 'user/uploadFile', function (data) {
            $('.preview').attr('src', data).show();
        });
        $('._token').val($('meta[name=token]').attr('content'));
    },
    radioImage: function () {
        var _images = $('#images');
        //
        var el = $('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el, 1, 'user/uploadFile', function (data) {
            _images.find('.handle').before(templateItem(data));
            isItemStatus();
        });
        //赋值token  有用则留无用则删除
        $('._token').val($('meta[name=token]').attr('content'));

        //模版
        function templateItem(str) {
            var templ = '<div class="item">' +
                '<img src="' + str + '" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '</div>';
            return templ;
        }

        isItemStatus();

        //判断上传图片的状态
        function isItemStatus() {
            var _item = _images.find('.item');
            if (_item.length >= 3) {
                _images.addClass('active');
            }
            _images.find('.item:even').css('margin-right', '10px');
        }
    }
};

//成功失败提示框
var tipBox = {
    init: function (type, text, speed) {
        this.template(type, text, speed);
    },
    template: function (type, text, speed) {
        var html = '<div class="tipbox ' + type + '" style="display: none;">' +
            '        <div class="head">提示</div>' +
            '        <div class="content">' +
            '            <i class="icon"></i><span>' + text + '</span>' +
            '        </div>' +
            '    </div>';
        $('body').append(html);
        $('.tipbox').fadeIn(300);
        setTimeout(function () {
            $('.tipbox').fadeOut(300).remove();
        }, speed)
    }
};

//是否为自己申报
var organizationPage = {
    init: function () {
        var _this = this;
        _this.judge();
        $('#tpl').load('/code/inputs/Tpl/organization.html', function () {//加载基本信息页面
            _this.slideBar();
        });
    },
    slideBar: function () {
        var _this = this;
        var slide = $('.ipt_base .slide');
        var dt = slide.find('.dt');
        var dd = slide.find('.dd');
        dd.find('li:last-child').css('margin-bottom', '0');
        //点击dt 展开收起
        dt.on('click', function () {
            var _dd = $(this).siblings('.dd');
            var _dateType = $(this).attr('data-type');
            if (_dd.length > 0) {
                _dd.slideToggle(100);
            }
            $('#tpl').load('/code/inputs/Tpl/' + _dateType + '.html', function () {
                if (_dateType === 'longFieldCustom') {
                    projectPage.radioImage(); //上传题图
                }
            });
            projectPage.selectCate.init();
        });
    },
    radioImage: function () {
        var _images = $('#images');
        //
        var el = $('.ipt_base .content .edit .images .handle .file_up .icon');
        upload.submit(el, 1, 'user/uploadFile', function (data) {
            _images.find('.handle').before(templateItem(data));
            isItemStatus();
        });
        //赋值token  有用则留无用则删除
        $('._token').val($('meta[name=token]').attr('content'));

        //模版
        function templateItem(str) {
            var templ = '<div class="item">' +
                '<img src="' + str + '" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '<span class="remove"><i></i></span>' +
                '</div>';
            return templ;
        }

        isItemStatus();

        //判断上传图片的状态
        function isItemStatus() {
            var _item = _images.find('.item');
            if (_item.length >= 3) {
                _images.addClass('active');
            }
            _images.find('.item:even').css('margin-right', '10px');
        }

        upload.remove(function () {
            //todo
        });
    },
    judge: function () {//是否申报传承人
        var parent = $('.ipt_over');
        var judgeBox=parent.find('.judge_box');
        //1.是否申报传承人
        parent.on('click', '.radio', function () {
            var _index = $(this).index();
            //去掉选中的兄弟(选中效果)
            parent.find('.radio').removeClass('active');
            parent.find('input[type=radio]').removeAttr('checked');
            //当前选中效果
            $(this).addClass('active');
            $(this).find('input[type=radio]').attr('checked', true);
            //如果点击否
            if (_index != 0) {
                judgeBox.fadeIn('fast');
            }
        });

        //2.是否代表机构进行申报
        judgeBox.on('click','.buttons a',function () {
            var _index = $(this).index();
            if(_index==0){
                alert('你点击的是')
            }else {
                judgeBox.fadeOut('fast');
            }
        });

    }
};

//
var modal = {
    loading: function (options) {
        var _speed, _text = '';
        _speed = (!options.speed || options.speed == '') ? 2000 : options.speed;
        _text = (!options.text || options.text == '') ? '加载中，请稍候...' : options.text;
        var _str = '<div class="modal" id="modal">' +
            '        <div class="content">' +
            '            <div class="loading"><img src="assets/images/icon_preview_loading.gif">' + _text + '</div>' +
            '        </div>' +
            '        <div class="bg"></div>' +
            '    </div>';

        $('body').append(_str);
        var modal = $('#modal');
        modal.fadeIn();
        modal.find('.loading').stop(true).animate({'top': '50%'}, 300, function () {
            setTimeout(function () {
                options.success();
                modal.remove();
            }, _speed);
        });
    }
};


$(function () {
    // tipBox.init('success','保存成功','2000');
    // tipBox.init('fail','保存失败');

    // modal.loading({
    //     speed:'', //可选  默认2000
    //     text:'', //可选  默认加载中，请稍候...
    //     success:function () {
    //         //todo
    //     }
    // });
});