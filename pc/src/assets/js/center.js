/*--//End 左侧菜单--*/
var baseUrl='http://192.168.1.41:8080/';
var centerPage = {
    url: {//获取链接地址
        project: baseUrl + 'ichProject/getIchProjectByUserId',
        master: baseUrl + 'ichMaster/getIchMasterByUserId'
    },
    init: function () {
        this.slide();
        var options = {
            name: 'masterDeclareTpl'
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
            } else if (options.name === 'projectDeclareTpl') {//项目列表
                url = centerPage.url.project;
                _this.tabs(function (status) {//选择tab标签传当前的status值
                    _this.ajax(url, status, function (data) {
                        var _html = _this.template.project(status.status, data);
                        $('#table').html(_html);
                    });
                });
                content.find('.tabs span').eq(0).trigger('click');
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
                        '       <td class="handle"><a href="">' + data[i].uri + '</a><a href="' + data[i].uri + '">编辑</a></td>' +
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
                        '       <td class="handle"><a href="' + data[i].uri + '">查看</a><a href="' + data[i].uri + '">编辑</a></td>' +
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
                        '       <td class="handle"><a href="' + data[i].uri + '" target="_blank">查看</a><a href="' + data[i].uri + '" target="_blank">编辑</a></td>' +
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
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>未通过原因</td>' +
                        '       <td class="handle"><a href="' + data[i].uri + '">编辑</a></td>' +
                        '     </tr>';
                }
            }

            return '<table><thead>' + thead[_index] + '</thead>' + '<tbody>' + tbody + '</tbody></table>';
        },
        project:function (status, data) {//传承人片段
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
                        '       <td class="handle"><a href="">' + data[i].uri + '</a><a href="' + data[i].uri + '">编辑</a></td>' +
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
                        '       <td class="handle"><a href="' + data[i].uri + '">查看</a><a href="' + data[i].uri + '">编辑</a></td>' +
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
                        '       <td class="handle"><a href="' + data[i].uri + '" target="_blank">查看</a><a href="' + data[i].uri + '" target="_blank">编辑</a></td>' +
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
                        '       <td>' + data[i].lastEditDate + '</td>' +
                        '       <td>未通过原因</td>' +
                        '       <td class="handle"><a href="' + data[i].uri + '">编辑</a></td>' +
                        '     </tr>';
                }
            }

            return '<table><thead>' + thead[_index] + '</thead>' + '<tbody>' + tbody + '</tbody></table>';
        },
        getFragmentName:function (data) {//获取传承人、项目名称
            var name = data.contentFragmentList;
            for (var i = 0; i < name.length; i++) {
                if (name[i].attributeId || name[i].attributeId == 4) {
                    return name[i].content;
                }
            }
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