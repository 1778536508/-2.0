/*--//End 左侧菜单--*/
var baseUrl='';
var centerPage = {
    url: {//获取链接地址
        project: baseUrl + '/ichProject/getIchProjectByUserId',
        master: baseUrl + '/ichMaster/getIchMasterByUserId'
    },
    init: function () {
        this.slide();
        var options = {
            name: 'accountSettingTpl'
        };
        this.loadTpl(options);
    },
    slide: function () {//点击展开收起
        var _this = this;
        var slide = $('#slide');
        var nav = slide.find('.nav');

        //1.左侧菜单底部marginBottom
        nav.find('li div.dd a:last-child, li:last-child').css('margin-bottom', '0');
        nav.find('li').append('<i class="line"></i>');

        //3.点击菜单
        nav.on('click', 'li a', function () {
            var $this = $(this);
            var name = $this.attr('data-type');
            $this.parents('li').addClass('selected').siblings('li').removeClass('selected');

            //1.点击一级
            if ($this.hasClass('dt')) {
                nav.find('.dd').stop(true).slideUp(200);
                $this.siblings('.dd').stop(true).slideToggle(200);
            }

            //2.点击二级
            if ($this.hasClass('link')) {
                $this.addClass('selected').siblings('a').removeClass('selected');
            }

            //加载模版
            var options = {
                name: name,
                params: {
                    status: 0
                }
            };
            _this.loadTpl(options);

            return false;
        });


    },
    tabs: function (callback) {
        var parent = $('#content');
        parent.off('click').on('click', '.tabs span', function () {
            var options = {
                status: $(this).attr('data-id')
            };
            $(this).addClass('selected').siblings('span').removeClass('selected');
            callback(options);
        });
    },
    ajax: function (url, params, callback) {
        var content=$('#content');
        $.ajax({
            type: "POST",
            url: url,
            data: {params: JSON.stringify(params)},
            dataType: "json",
            async: true,
            beforeSend:function () {
                content.find('.box').append('<div class="loading"><img src="../../assets/images/loading.gif" alt=""></div>');
            },
            success: function (data) {
                if (data.code == 0) {
                    $('#content').find('.loading').remove();
                    if (callback || callback != 'undefinied') {
                        callback(data.data);
                    }
                    //数据为空
                    if(data.data.length==0){
                        $('#table').html('<div style="line-height: 51px;text-align: center;font-size:20px;background: #fff;">暂无数据</div>');
                    }
                }
            }
        });
    },
    loadTpl: function (options) {
        var _this = this;
        var url = '';
        var content = $('#content');

        content.load('Tpl/' + options.name + '.html', function () {
            if (options.name === 'masterDeclareTpl') {//传承人列表
                url = centerPage.url.master;
                _this.tabs(function (status) {//选择tab标签传当前的status值
                    _this.ajax(url, status, function (data) {
                        var _html = _this.template.master(status.status, data);
                        $('#table').html(_html);
                    });
                });
                content.find('.tabs span').eq(0).trigger('click');

                content.on('click','a[data-type=masterDelete]',function () {
                    _this.masterDelete($(this).attr('data-id'));
                });

            } else if (options.name === 'projectDeclareTpl') {//项目列表
                url = centerPage.url.project;
                _this.tabs(function (status) {//选择tab标签传当前的status值
                    _this.ajax(url, status, function (data) {
                        var _html = _this.template.project(status.status, data);
                        $('#table').html(_html);
                    });
                });
                content.find('.tabs span').eq(0).trigger('click');
                content.on('click','a[data-type=projectDelete]',function () {
                    _this.projectDelete($(this).attr('data-id'));
                });
            }else if(options.name==='safetyTpl'){//安全设置
                var content=$('#content');
                var oldPwd=$('#old-password');//原密码
                var newPwd=$('#new-password');//新密码
                var affirmPwd=$('#affirm-password');//密码确认


                $('#save').on('click',function () {
                    //原密码校验
                    verifyInput({
                        obj:oldPwd,
                        value:oldPwd.val(),
                        errorsText:'密码由6-16个字符组成，采用字母和数字的组合'
                    });

                    //新密码校验
                    verifyInput({
                        obj:newPwd,
                        value:newPwd.val(),
                        errorsText:'密码由6-16个字符组成，采用字母和数字的组合'
                    });

                    //密码确认
                    if(newPwd.val()!==affirmPwd.val()){
                        alert('密码确认失败')
                    }

                    //todo

                    return false;
                });

                
                //校验输入是否正确
                function verifyInput(params) {
                    var reg=/^([a-zA-Z0-9]|[._]){6,16}$/;
                    var errors=params.obj.siblings('.errors');
                    errors.remove();
                    if(!reg.test(params.value)){
                        params.obj.before('<div class="errors">'+params.errorsText+'</div>');
                        console.log('密码必须为6-18位字母、数字');
                    }
                }
                

            }


        });
    },
    template: {
        master:function (status, data) {//传承人片段
            var _this=this;
            var thead = [// 0->已通过 | 1->草稿 | 2->待审核 | 3->未通过
                '<tr><th width="50">序号</th><th>名称</th><th width="140">最后修改时间</th> <th width="140">提交审核时间</th><th width="140">审核通过时间</th><th width="120">操作</th></tr>',
                '<tr><th width="50">序号</th><th>名称</th><th width="170">最后修改时间</th><th width="120">操作</th></tr>',
                '<tr><th width="50">序号</th><th>名称</th><th width="170">最后修改时间</th><th width="170">提交审核时间</th><th width="120">操作</th></tr>',
                '<thead><tr><th width="50">序号</th><th>名称</th><th width="140">最后修改时间</th><th width="140">提交审核时间</th><th width="140">未通过原因</th><th width="80">操作</th></tr></thead>'
            ];
            var tbody = ''; //内容
            var _index = ''; //thead的索引

            if (status == 0) {//已通过
                _index=0;
                hasPassed(data);
            } else if (status == 2) {//草稿
                _index=1;
                draftBox(data);
            } else if (status == 3) {//待审核
                _index=2;
                checkPending(data);
            } else if (status == 4) {//未通过
                _index=3;
                noPassed(data);
            }

            //已通过
            function hasPassed(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>1</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>'+data[i].lastEditDate+'</td>' +
                        '       <td>'+data[i].lastEditDate+'</td>' +
                        '       <td>'+data[i].lastEditDate+'</td>' +
                        '       <td class="handle"><a href="javascript:masterPreview(\''+data[i].id +'\')">查看</a><a href="../../code/ichMasterForm.html?mid=' + data[i].id + '&pname=' + _this.getFragmentName(data[i]) + '">编辑</a></td>' +
                        '     </tr>';
                }
            }

            //草稿箱
            function draftBox(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>' + (i + 1) + '</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td class="handle"><a href="../../code/ichMasterForm.html?mid=' + data[i].id + '&pname=' + _this.getFragmentName(data[i]) + '">编辑</a><a data-type="masterDelete" data-id="'+data[i].id+'">删除</a></td>' +
                        '     </tr>';
                }





            }

            //待审核
            function checkPending(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>' + (i + 1) + '</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td class="handle"><a href="javascript:masterPreview(\''+data[i].id +'\')" target="_blank">查看</a><a href target="_blank"></a></td>' +
                        '     </tr>';
                }

            }

            //未通过
            function noPassed(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>' + (i + 1) + '</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>未通过原因</td>' +
                        '       <td class="handle"><a href="../../code/ichMasterForm.html?mid=' + data[i].id + '">编辑</a></td>' +
                        '     </tr>';
                }
            }

            return '<table><thead>' + thead[_index] + '</thead>' + '<tbody>' + tbody + '</tbody></table>';
        },
        project:function (status, data) {//项目片段
            var _this=this;
            var thead = [// 0->已通过 | 1->草稿 | 2->待审核 | 3->未通过
                '<tr><th width="50">序号</th><th>名称</th><th width="140">最后修改时间</th> <th width="140">提交审核时间</th><th width="140">审核通过时间</th><th width="120">操作</th></tr>',
                '<tr><th width="50">序号</th><th>名称</th><th width="170">最后修改时间</th><th width="120">操作</th></tr>',
                '<tr><th width="50">序号</th><th>名称</th><th width="170">最后修改时间</th><th width="170">提交审核时间</th><th width="120">操作</th></tr>',
                '<thead><tr><th width="50">序号</th><th>名称</th><th width="140">最后修改时间</th><th width="140">提交审核时间</th><th width="140">未通过原因</th><th width="80">操作</th></tr></thead>'
            ];
            var tbody = ''; //内容
            var _index = ''; //thead的索引

            if (status == 0) {//已通过
                _index=0;
                hasPassed(data);
            } else if (status == 2) {//草稿
                _index=1;
                draftBox(data);
            } else if (status == 3) {//待审核
                _index=2;
                checkPending(data);
            } else if (status == 4) {//未通过
                _index=3;
                noPassed(data);
            }

            //已通过
            function hasPassed(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>1</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>'+data[i].lastEditDate+'</td>' +
                        '       <td>'+data[i].lastEditDate+'</td>' +
                        '       <td>'+data[i].lastEditDate+'</td>' +
                        '       <td class="handle"><a href="javascript:projectPreview(\''+data[i].id +'\')">查看</a><a href="../../code/ichProForm.html?pid=' + data[i].id + '">编辑</a></td>' +
                        '     </tr>';
                }
            }

            //草稿箱
            function draftBox(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>' + (i + 1) + '</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td class="handle"><a href="../../code/ichProForm.html?pid=' +data[i].id + '">编辑</a><a data-type="projectDelete" data-id="'+data[i].id+'">删除</a></td>' +
                        '     </tr>';
                }
            }

            //待审核
            function checkPending(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>' + (i + 1) + '</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td class="handle"><a href="javascript:projectPreview(\''+data[i].id+'\')" target="_blank">查看</a><a href="" target="_blank"></a></td>' +
                        '     </tr>';
                }

            }

            //未通过
            function noPassed(data) {
                for (var i = 0; i < data.length; i++) {
                    tbody += '<tr>' +
                        '       <td>' + (i + 1) + '</td>' +
                        '       <td class="text">' + _this.getFragmentName(data[i]) + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>未通过原因</td>' +
                        '       <td class="handle"><a href="../../code/ichProForm.html?pid=' + data[i].id + '">编辑</a></td>' +
                        '     </tr>';
                }
            }

            return '<table><thead>' + thead[_index] + '</thead>' + '<tbody>' + tbody + '</tbody></table>';
        },
        getFragmentName:function (data) {//获取传承人、项目名称
            var name = data.contentFragmentList;
            for (var i = 0; i < name.length; i++) {
                if (name[i].attributeId && (name[i].attributeId == 13 || name[i].attributeId == 4)) {
                    return name[i].content;
                }
            }
        }
    },
    masterDelete:function (id) {
        centerPage.modal.confirm({
            buttons:true,
            title:'确定删除吗？',
            text:'',
            callback:function () {
                masterDelete(id);
            }
        });
    },
    projectDelete:function (id) {
        centerPage.modal.confirm({
            buttons:true,
            title:'确定删除吗？',
            text:'',
            callback:function () {
                projectDelete(id);
            }
        });
    },
    modal: {
        confirm:function (options) {
            //操作按钮
            var _handle,_confirm='';
            _handle = options.buttons?'<div class="handle"><a class="cancel">取消</a><a class="sure">确定</a></div>':'';
            _confirm='<div class="confirm">' +
                '    <div class="head">'+options.title+'<span class="close"></span></div>' +
                '    <div class="content"><div class="text scrollbar">'+options.text+'</div></div>' +
                _handle +
                '</div>';
            $('body').append(_confirm);
            var confirm=$('.confirm');
            confirm.fadeIn('fast');
            //点击确定
            confirm.on('click','.sure',function () {
                if(options.callback || options.callback!='undefinied'){
                    options.callback(true);
                    confirm.remove();
                }
            });
            //点击取消
            confirm.on('click','.cancel,.close',function () {
                confirm.remove();
            });
        }
    }
};
/*--//End center--*/

var pagination = {
    "pageId":"",
    "data":null,
    "maxshowpageitem":5,//最多显示的页码个数
    "pagelistcount":10,//每一页显示的内容条数
    "init":function(listCount,currentPage,options){
        this.data=options.data,
            this.pageId=options.id,
            this.maxshowpageitem=options.maxshowpageitem,//最多显示的页码个数
            this.pagelistcount=options.pagelistcount//每一页显示的内容条数
        page.initPage(listCount,currentPage);
    },
    /**
     * 初始化数据处理
     * @param listCount 列表总量
     * @param currentPage 当前页
     */
    "initPage":function(listCount,currentPage){
        var maxshowpageitem = page.maxshowpageitem;
        if(maxshowpageitem!=null&&maxshowpageitem>0&&maxshowpageitem!=""){
            page.maxshowpageitem = maxshowpageitem;
        }
        var pagelistcount = page.pagelistcount;
        if(pagelistcount!=null&&pagelistcount>0&&pagelistcount!=""){
            page.pagelistcount = pagelistcount;
        }
        page.pagelistcount=pagelistcount;
        if(listCount<0){
            listCount = 0;
        }
        if(currentPage<=0){
            currentPage=1;
        }

        page.setPageListCount(listCount,currentPage);
    },
    /**
     * 初始化分页界面
     * @param listCount 列表总量
     */
    "initWithUl":function(listCount,currentPage){
        var pageCount = 1;
        if(listCount>=0){
            var pageCount = listCount%page.pagelistcount>0?parseInt(listCount/page.pagelistcount)+1:parseInt(listCount/page.pagelistcount);
        }
        var appendStr = page.getPageListModel(pageCount,currentPage);
        $("#"+page.pageId).html(appendStr);
    },
    /**
     * 设置列表总量和当前页码
     * @param listCount 列表总量
     * @param currentPage 当前页码
     */
    "setPageListCount":function(listCount,currentPage){
        listCount = parseInt(listCount);
        currentPage = parseInt(currentPage);
        page.initWithUl(listCount,currentPage);
        page.initPageEvent(listCount);
        page.viewPage(currentPage,listCount,page.pagelistcount,page.data)
//      fun(currentPage);
    },
    //页面显示功能
    "viewPage":function (currentPage,listCount,pagelistcount,data){
        var NUM=listCount%pagelistcount==0?listCount/pagelistcount:parseInt(listCount/pagelistcount)+1;
        if(currentPage==NUM){
            var result=data.slice((currentPage-1)* pagelistcount,data.length);
        }
        else{
            var result=data.slice((currentPage-1)*pagelistcount,(currentPage-1)*pagelistcount+pagelistcount);
        }
        options.callBack(result);
    },
    "initPageEvent":function(listCount){
        $("#"+page.pageId +">li[class='pageItem']").on("click",function(){
            page.setPageListCount(listCount,$(this).attr("code-data"),page.fun);
        });
    },
    "getPageListModel":function(pageCount,currentPage){
        var prePage = currentPage-1;
        var nextPage = currentPage+1;
        var prePageClass ="pageItem";
        var nextPageClass = "pageItem";
        if(prePage<=0){
            prePageClass="pageItemDisable";
        }
        if(nextPage>pageCount){
            nextPageClass="pageItemDisable";
        }
        var appendStr ="";
        appendStr+="<li class='"+prePageClass+"' code-data='1' code-rel='firstpage'>首页</li>";
        appendStr+="<li class='"+prePageClass+"' code-data='"+prePage+"' code-rel='prepage'>&lt;上一页</li>";
        var miniPageNumber = 1;
        if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)<=pageCount){
            miniPageNumber = currentPage-parseInt(page.maxshowpageitem/2);
        }else if(currentPage-parseInt(page.maxshowpageitem/2)>0&&currentPage+parseInt(page.maxshowpageitem/2)>pageCount){
            miniPageNumber = pageCount-page.maxshowpageitem+1;
            if(miniPageNumber<=0){
                miniPageNumber=1;
            }
        }
        var showPageNum = parseInt(page.maxshowpageitem);
        if(pageCount<showPageNum){
            showPageNum = pageCount;
        }
        for(var i=0;i<showPageNum;i++){
            var pageNumber = miniPageNumber++;
            var itemPageClass = "pageItem";
            if(pageNumber==currentPage){
                itemPageClass = "pageItemActive";
            }

            appendStr+="<li class='"+itemPageClass+"' code-data='"+pageNumber+"' code-rel='itempage'>"+pageNumber+"</li>";
        }
        appendStr+="<li class='"+nextPageClass+"' code-data='"+nextPage+"' code-rel='nextpage'>下一页&gt;</li>";
        appendStr+="<li class='"+nextPageClass+"' code-data='"+pageCount+"' code-rel='lastpage'>尾页</li>";
        return appendStr;

    }
};
/*--//End code--*/


$(function () {
    centerPage.init();
});
function projectPreview(pid){
    $.ajax({
        type: "POST",
        url: "../../ichProject/preview",
        data:{params:pid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                location.href="../../code/tmp/"+pid+".html";
            }
        },
        error: function (result, status) {
        }
    });
}

function projectDelete(pid){
    $.ajax({
        type: "POST",
        url: "../../ichProject/delete",
        data:{params:pid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                var url = centerPage.url.project;
                var _status = {status : 2};
                centerPage.ajax(url, _status, function (data) {

                    var _html = centerPage.template.project(2, data);
                    $('#table').html(_html);
                });
            }
        },
        error: function (result, status) {
        }
    });
}

function masterPreview(mid){
    $.ajax({
        type: "POST",
        url: "../../ichMaster/preview",
        data:{params:mid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                location.href="../../code/tmp/"+mid+".html";
            }
        },
        error: function (result, status) {
        }
    });
}

function masterDelete(mid){
    $.ajax({
        type: "POST",
        url: "../../ichMaster/delete",
        data:{params:mid} ,
        dataType: "json",
        async:false,
        complete: function () { },
        success: function (result) {
            console.log(JSON.stringify(result));
            if(result.code==0){
                var url = centerPage.url.master;
                var _status = {status : 2};
                centerPage.ajax(url, _status, function (data) {

                    var _html = centerPage.template.master(2, data);
                    $('#table').html(_html);
                });
            }
        },
        error: function (result, status) {
        }
    });
}