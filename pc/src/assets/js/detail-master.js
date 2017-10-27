var upload={
    template:function (type,url) {//0是视频  1是图片 url上传的地址
        var _name='';
        _name=(type==1)?'mypic':'video';
        var _parent='<form class="upload" action="'+url+'" method="post" enctype="multipart/form-data">'+
            '<input class="_token" type="hidden" name="_token" value="">'+
            '<div class="progress"><em class="bar"></em><em class="percent"></em></div>' +
            '<input class="file" type="file" name="mypic">'+
            '</form>'+
            '<img class="preview" src="" />';
        return _parent;
    },
    submit:function (obj,type,url,callback) {
        var _this=this;
        $(obj).append(this.template(type,url));
        $(document).on('change','.file',function () {
            var parent=$(this).parents('.file_up');
            var preview=parent.find('.preview');
            var _form = $(this).parents('.upload');
            var progress=_form.find('.progress');
            var bar=progress.find('.bar');
            var percent=progress.find('.percent');
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
                    if(callback || callback!='undefinied'){
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
    }
};


//传承人详情页 ok
var inheritorlPage = {
    init: function () {
        this.call();
    },
    call:function () {//调用外部
        Detail.productsTab(); //产品分页tab
        Detail.scrollFloor(); //楼层导航效果
        Detail.widget.init('.detail'); //分享/点赞/doi二维码
        Detail.topPic(); //题图
        Detail.modal.init();
        Detail.computeBaseInfo();//基本信息左右
        Detail.judgeDom(); //判断doi和非遗中国是否存在
        Detail.code_arr(); //替换资源数据
        Detail.catgary(); //查询分类
    }
};


//编辑功能
var editDetail={
    init:function () {
        var _this=this;
        var card=$('.card');
        var header=card.find('header');
        //1.创建编辑按钮
        card.each(function () {
            if($(this).attr('data-type')){
                $(this).find('header').append(_this.handleTpl());
            }
        });

        //2.操作
        header.on('click','.handle span',function () {
            var parent=$(this).parents('.card');
            var type=parent.attr('data-type');
            $(this).hide().siblings('span').show();

            if($(this).hasClass('edit')){
                if(type==='text'){
                    _this.text.edit(parent);
                }else if(type==='imageText') {
                    _this.imageText.edit(parent);
                    _this.uploadImage(parent);
                }
            }else {
                if(type==='text'){
                    _this.text.save(parent);
                }else if(type==='imageText') {
                    _this.imageText.save(parent);
                }
            }

        });


    },
    handleTpl:function () {
        return '<div class="handle"><span class="edit"><i></i>编辑</span><span class="save" style="display: none;"><i></i>保存</span></div>';
    },
    text: {//纯文本
        mainTpl:function (val) {
            return '<article class="edit0"><textarea class="scrollbar" name="" id="">'+val+'</textarea></article>';
        },
        edit:function (parent) {
            var _oldArticles=parent.find('article');
            var _newArticles=parent.find('article.edit0');
            _oldArticles.hide();
            if(_newArticles.length==0){
                parent.append(this.mainTpl(_oldArticles.text()));
            }

        },
        save:function (parent) {
            var _oldArticles=parent.find('article');
            var _newArticles=parent.find('article.edit0');
            _oldArticles.text(_newArticles.find('textarea').val()).show();
            _newArticles.hide().remove();
        }
    },
    imageText: {//图文
        mainTpl:function (val) {
            var str='<article class="edit1">' +
                '                    <form action="">' +
                '                        <div class="text"><textarea name="" id="" cols="30" rows="10">'+val+'</textarea> </div>' +
                '                        <div class="images" id="images">' +
                '<div class="item">' +
                '<img src="assets/uploads/exp3.png" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '</div>'+
                '<div class="item">' +
                '<img src="assets/uploads/exp3.png" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '</div>'+
                '<div class="item">' +
                '<img src="assets/uploads/exp3.png" alt="">' +
                '<input type="text" name="text" placeholder="请输入标题">' +
                '</div>'+
                '                            <div class="handle">' +
                '                                <input type="hidden" id="_token" name="token" value="{{csrf_token()}}">' +
                '                                <div class="add add_image">' +
                '                                    <span class="icon"><i></i></span>' +
                '                                    <span>添加图片</span>' +
                '                                </div>' +
                '                                <div class="add add_video">' +
                '                                    <span class="icon"><i></i></span>' +
                '                                    <span>添加视频</span>' +
                '                                </div>' +
                '                            </div>' +
                '                        </div>' +
                '                    </form>' +
                '                </article>';
            return str;
        },
        edit:function (parent) {
            var _oldArticles=parent.find('article');
            var _newArticles=parent.find('article.edit1');
            _oldArticles.hide();

            if(_newArticles.length==0){
                parent.append(this.mainTpl(_oldArticles.text()));
            }
        },
        save:function (parent) {
            var _oldArticles=parent.find('article');
            var _newArticles=parent.find('article.edit1');
            _oldArticles.text(_newArticles.find('textarea').val()).show();
            _newArticles.hide().remove();
        }

    },
    uploadImage:function (parent) {
            var _images=$('#images');
            //
            var el=parent.find('.images .handle .file_up .icon');
            upload.submit(el,1,'user/uploadFile',function (data) {
                _images.find('.handle').before(templateItem(data));
                isItemStatus();
            });
            //赋值token  有用则留无用则删除
            $('._token').val($('meta[name=token]').attr('content'));

            //模版
            function templateItem(str) {
                var templ='<div class="item">' +
                    '<img src="'+str+'" alt="">' +
                    '<input type="text" name="text" placeholder="请输入标题">' +
                    '</div>';
                return templ;
            }

            isItemStatus();
            //判断上传图片的状态
            function isItemStatus() {
                var _item=_images.find('.item');
                if(_item.length>=3){
                    _images.addClass('active');
                }
                _images.find('.item:even').css('margin-right','10px');
            }
    }
};



$(function () {
    inheritorlPage.init();
    //纯文本
    editDetail.init();

});







