//引入其他js 文件
//document.write("<script type=\"text/javascript\" src=\"../../data/error_message.js\"></script>");
//document.write("<script type=\"text/javascript\" src=\"../../js/util.js\"></script>");

//登录注册
var loginPage = {
    init: function () {
        //去除表单最后一组的下边距
        this.show();
    },
    showLoginWindow:function (url) {

        var _this = this;
        var lang = getLang();
        if(lang == 'zh-CN'){
            _this.template();
            var $box_layer=$('.box_layer');
            $box_layer.removeClass('box_layer_en');
        }else{
            _this.templateEn();
            var $box_layer=$('.box_layer');
            $box_layer.addClass('box_layer_en');
        }
        _this.close();
        _this.code();
        _this.tabItem();
        $("#backurl").val(url);
    },
    show: function () {//点击展示
        var _this = this;
        var el = $('.header .content .info li.login');
        el.on('click', function () {
            _this.showLoginWindow("");
        });
    },
    code: function () { //验证码
        var _form = $('.form_area');
        var _span = _form.find('.pages span');

        var time = 60;
        _span.on('click', function () {
            var _this = $(this);
            var lang =  getLang();
            var _oldSpan = _this.text();

            var phone = _this.parent().parent().parent().prev().find('input');

            if(!(/^1[34578]\d{9}$/.test(jQuery.trim(phone.val())))){
                _this.parent().parent().parent().prev().addClass("error");
                if(lang=='zh-CN'){
                    phone.next().text("手机号格式错误！");
                }else{
                    phone.next().text("Cell phone number format error!");
                }
                return false;
            } else{
                phone.parent().parent().removeClass("error");
                _this.text(_oldSpan);
                phone.next().text("");
            }
            //判断是注册还是 找回密码
            var type = _this.attr("data-type");
            $.ajax({
                cache: true,
                type: "POST",
                url: "/user/getVerifycode",
                data: {phone:phone.val(),type:type},
                dataType: "json",
                async: false,
                error: function(request) {

                },
                success: function(res) {
                    var code= res.code;
                    if(res.code!=0){
                        _this.parent().parent().parent().prev().addClass("error");
                        phone.next().text(getMsgByCode(code,lang));
                    }else{
                        //去掉错误提示
                        _this.parent().parent().parent().prev().removeClass("error");
                        phone.next().text("");

                        if (!_this.hasClass('active')) {
                            _this.addClass('active').text(time + 's后重新发送');
                            var timer = setInterval(function () {
                                time--;
                                _this.text(time + 's后重新发送');

                                if (time == 0) {
                                    clearInterval(timer);
                                    time = 60;
                                    _this.removeClass('active');
                                    _this.text('重新发送');
                                }
                            }, 1000);
                        }
                    }
                }
            });
        });
    },
    close: function () {//移出弹层
        var boxLayer = $('.box_layer');
        boxLayer.on('click', '.close, .overbg0', function () {
            boxLayer.fadeOut(100).remove();
        });
    },
    tabItem: function () {
        var boxLayer = $('.box_layer');
        var item = boxLayer.find('.item');
        var login = boxLayer.find('.login');
        var register = boxLayer.find('.register');
        var reset = boxLayer.find('.reset');
        $('.js-to-reset').on('click', function () {
            item.hide();
            reset.show();
        });
        $('.js-to-login').on('click', function () {
            item.hide();
            login.show();
        });
        $('.js-to-register').on('click', function () {
            item.hide();
            register.show();
        });
    },
    template: function () {
        var html = '<style>'+
            '.form_area .title {text-indent:86px}'+
            '.form_area .group .name {width: 16%}'+
            '.form_area .group .name span {width: 100%}'+
            '.form_area .group .area {width: 80%;float: right}'+
            '.form_area .group .ipt {width: 90%;padding:0 5%;}'+
            '.form_area .group .ipt::-webkit-input-placeholder {color:#ccc}'+
            '</style>'+
            '<div class="box_layer">'+
            '    <div class="item login" style="display: block;">'+
            '        <form class="form_area" id="loginForm" action="" onkeydown="if(event.keyCode==13)return false;" >'+
            '            <input type="hidden" id="backurl" value="" >'+
            '            <div class="title" >登录<span class="close"></span></div>'+
            '            <div class="group">'+
            '                <div class="name"><span id="nickname">登录名</span></div>'+
            '                <div class="area">'+
            '                    <input class="ipt"  name="loginName" type="text" placeholder="用户名/手机号">'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span>密&nbsp;&nbsp;码</span></div>'+
            '                <div class="area">'+
            '                    <input class="ipt"  type="password" name="password" placeholder="请输入密码">'+
            '                    <a class="forget js-to-reset" href="javascript:;">忘记登录密码</a>'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <input class="btn" type="button" value="登录" onclick="login()">'+
            '                    <a class="arrow_right js-to-register" href="javascript:;">去注册</a>'+
            '                </div>'+
            '            </div>'+
            '        </form>'+
            '    </div>'+
            '    <!--//End 登录-->'+
            '    <div class="item register" style="display: none;">'+
            '        <form action="" class="form_area" id="registForm" onkeydown="if(event.keyCode==13)return false;" >'+
            '            <div class="title">注册<span class="close"></span></div>'+
            '            <div class="group">'+
            '                <div class="name"><span>用户名</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" name="loginName"  value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span>手机号</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt"  name="phone" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span>验证码</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" value=""  name="pages" maxlength="10">'+
            '                    <div class="pages">'+
            '                        <span style="cursor: pointer;" data-type="0">获取验证码</span>'+
            '                    </div>'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span>密码</span></div>'+
            '                <div class="area">'+
            '                    <input type="password"  name="password" class="ipt" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group policy">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <label for="policy"><input id="policy" type="checkbox" checked>我已仔细阅读并同意《法律声明及隐私权政策》</label>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group" style="margin-bottom: 0">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <input class="btn" type="button" value="注册" name="regbtn" onclick="registForm()" />'+
            '                    <a class="arrow_right js-to-login" href="javascript:;">已有账号，去登录</a>'+
            '                </div>'+
            '            </div>'+
            '        </form>'+
            '    </div>'+
            '    <!--//End 注册-->'+
            '    <div class="item reset" style="display: none;" >'+
            '        <form action="" class="form_area" id="resetForm" onkeydown="if(event.keyCode==13)return false;" >'+
            '            <div class="title">重置密码<span class="close"></span></div>'+
            '            <div class="group">'+
            '                <div class="name"><span>手机号</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" name="phone" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span>验证码</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" name="pages" value="" maxlength="10">'+
            '                    <div class="pages">'+
            '                        <span data-type="1">获取验证码</span>'+
            '                    </div>'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span>新密码</span></div>'+
            '                <div class="area">'+
            '                    <input type="password" class="ipt" name="password" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group" style="margin-bottom: 0;">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <input class="btn" type="button" onclick="resetPass()" value="确认">'+
            '                    <a class="arrow_right js-to-login" href="javascript:;">去登录</a>'+
            '                </div>'+
            '            </div>'+
            '        </form>'+
            '    </div>'+
            '    <!--//End 重置密码-->'+
            '    <div class="overbg0" style="z-index:11;"></div>'+
            '</div>';

        $('body').append(html);
    },
    templateEn:function () {
        var html = '<div class="box_layer">'+
            '    <div class="item login" style="display: block;">'+
            '        <form class="form_area" id="loginForm" action="" onkeydown="if(event.keyCode==13)return false;" >'+
            '            <input type="hidden" id="backurl" value="" >'+
            '            <div class="title">Sign in<span class="close"></span></div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Name</span></div>'+
            '                <div class="area">'+
            '                    <input class="ipt" name="loginName" id="loginName" type="text" placeholder="name/mobile">'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Password</span></div>'+
            '                <div class="area">'+
            '                    <input class="ipt" type="password" name="password" placeholder="Please input a password">'+
            '                    <a class="forget js-to-reset" href="javascript:;">Forgot login password</a>'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <input class="btn" type="button" value="Sign in" onclick="login()">'+
            '                    <a class="arrow_right js-to-register" href="javascript:;">No account to register</a>'+
            '                </div>'+
            '            </div>'+
            '        </form>'+
            '    </div>'+
            '    <!--//End 登录-->'+
            '    <div class="item register" style="display: none;">'+
            '        <form action="" class="form_area" id="registForm" onkeydown="if(event.keyCode==13)return false;" >'+
            '            <div class="title">register<span class="close"></span></div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Name</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" name="loginName" id="loginName" value="">'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Mobile</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" id="phone" name="phone" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Verification</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" value="" id="pages" name="pages" maxlength="10">'+
            '                    <div class="pages">'+
            '                        <span style="font-size:14px;cursor: pointer" data-type="0">Get validation pages</span>'+
            '                    </div>'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Password</span></div>'+
            '                <div class="area">'+
            '                    <input type="password" class="ipt" id="password" name="password" value="">'+
            '                </div>'+
            '                <div class="error_txt"></div>'+
            '            </div>'+
            '            <div class="group policy">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <label for="policy"><input id="policy" type="checkbox" checked>I have read and agreed to the legal declaration and privacy policy</label>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group" style="margin-bottom: 0">'+
            '                <div class="name">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <input class="btn" type="submit" value="register"  onclick="registForm()">'+
            '                    <a class="arrow_right js-to-login" href="javascript:;" style="font-size:16px;">login</a>'+
            '                </div>'+
            '            </div>'+
            '        </form>'+
            '    </div>'+
            '    <!--//End 注册-->'+
            '    <div class="item reset" style="display: none;">'+
            '        <form action="" class="form_area" id="resetForm"  onkeydown="if(event.keyCode==13)return false;" >'+
            '            <div class="title">reset password<span class="close"></span></div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Mobile</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" name="Mobile" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Verification</span></div>'+
            '                <div class="area">'+
            '                    <input type="text" class="ipt" value="" name="pages" maxlength="10">'+
            '                    <div class="pages">'+
            '                        <span style="font-size:16px;cursor: pointer;" data-type="1">Get validation pages</span>'+
            '                        <div class="error_txt"></div>'+
            '                    </div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group">'+
            '                <div class="name"><span style="font-size:16px;">Password</span></div>'+
            '                <div class="area">'+
            '                    <input type="password" class="ipt" name="password" value="">'+
            '                    <div class="error_txt"></div>'+
            '                </div>'+
            '            </div>'+
            '            <div class="group" style="margin-top:50px;margin-bottom: 0;">'+
            '                <div class="name" style="font-size:16px;">&nbsp;</div>'+
            '                <div class="area">'+
            '                    <input class="btn" type="submit" value="confirm">'+
            '                    <a class="arrow_right js-to-login" href="javascript:;">Log in</a>'+
            '                </div>'+
            '            </div>'+
            '        </form>'+
            '    </div>'+
            '    <!--//End 重置密码-->'+
            '    <div class="overbg0" style="z-index:11;"></div>'+
            '</div>';
        $('body').append(html);
    }
};


$(function () {
    loginPage.init();
    //判断当前用户是否登录
    //console.log(localStorage.getItem("pid"));
    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/userinfo",
        data: {params:localStorage.getItem("pid")}, // 你的formid
        dataType: "json",
        async: true,
        error: function(request) {
            //alert("Connection error");
        },
        success: function(data) {
            var lang = getLang();
            console.log(data);
            //隐藏 显示数据
            var url  = window.location.href;
            var path = url.substring(url.lastIndexOf("/"));
            if(typeof (data.data)!='undefined' && data.code==0){
                $(".login").hide();
                $(".logined").show().html(loginedTemplate(data.data));
                //根据当前 语言环境判断
                if(path.indexOf("/userinfoAdd.html") != -1){
                    //用户信息 回填 显示
                    $("#name").val(data.data.name);
                    $("#phone").val(data.data.phone);
                    $("#mail").val(data.data.mail);
                }
            }else{
                $(".login").show();
                $(".logined").hide();
            }
            //通过url 地址判断是否弹出登录框
            if(data.code==3){
                //获取url 地址 进行过滤
                if(url.indexOf("?") != -1){
                    url = url.substring(0,url.indexOf("?"));
                }
                $.grep(filterpage, function(val, key) {
                    if (path.indexOf(filterpage[key]) != -1) {
                        $('.header .content .info li.login').click();
                        return false;
                    }
                });
            }
        }
    });
    //window.sessionStorage.setItem();
});
/*var callbakc = function () {

}*/
function login(){
    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/login",
        data: $('#loginForm').serialize(), // 你的formid
        dataType: "json",
        async: true,
        error: function(request) {
            //alert("Connection error");
        },
        success: function(data) {
            var lang = getLang();
            console.log(data);
            if(data.code!=0){
                $('.box_layer .login').find('.group').addClass('error');
                $('.box_layer .login').find('.error_txt').text(getMsgByCode(data.code,lang));
            }else{
                localStorage.setItem("pid",data.data.id);
                $('.box_layer').hide();
                $(".login").hide();
                //根据当前 语言环境判断   默认显示英文

                $(".logined").show().html(loginedTemplate(data.data));
                // if(lang=='zh-CN'){
                //     $(".logined").find('a').text("你好，"+ data.data.loginName);
                // }else{
                //     $(".logined").find('a').text("hello，"+data.data.loginName);
                // }
                //登录后续操作
                //获取当前url 访问地址
                var path = window.location.href;
                if(path.indexOf("/ichProForm.html") != -1){
                    //初始化 后续 操作
                    var  pid = $.getUrlParam("pid");
                    if(pid == null || typeof(pid) == "undefined"){
                        localStorage.setItem("action","add");
                    }else{

                    }
                    var ich = getIchProByID(pid);
                    localStorage.setItem("ichProject",JSON.stringify(ich));
                    initProjectData();
                    initProjectView(ich);
                }
                //用户信息回填
                if(path.indexOf("/userinfoAdd.html") != -1){
                    //用户信息 回填 显示
                    $("#name").val(data.data.name);
                    $("#phone").val(data.data.phone);
                    $("#mail").val(data.data.mail);
                }

                if($("#backurl").val().trim() != ""){

                    if($("#backurl").val().trim()=="userinfoAdd.html"){
                        //判断该用户是否 已经选择了  机构 或者 传承人
                        if(data.data.type==1){
                            location.href=$("#backurl").val().trim();
                        }else{
                            location.href="ichpro.html";
                        }
                    }

                }
            }
        }
    });
}

//手动提交表单
function registForm(){

    var lang = getLang();
    //密码长度限制
    var pass = $("#registForm input[name=password]").val();
    var password=$("#registForm input[name=password]");
    if(pass.length<6){
        password.parent().parent().addClass("error");
        if(lang=='zh-CN'){
            password.next().text("密码长度不少于6位！");
        }else{
            password.next().text("Password length no less than 6 !");
        }
        return false;
    }else {
        password.parent().parent().removeClass("error");
        password.next().text("");
    }
    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/register",
        data: $('#registForm').serialize(),
        dataType: "json",
        async: true,
        scriptCharset: 'utf-8',
        error: function(ajaxobj) {

        },
        success: function(res) {
            var lang = getLang();
            var code = res.code;
            if(code==0){
                //注册成功
                $('.box_layer').fadeOut(100).remove();
            }else {
                $("#registForm input[name=pages]").next().next().text(getMsgByCode(code,lang));
                /* if(lang=='zh-CN'){
                    $("#registForm input[name=pages]").next().next().text(res.msg);
                }else{
                    $("#registForm input[name=pages]").next().next().text(res.enMsg);
                }*/
            }
        }
    });
}
//重置密码
function  resetPass(){
    var lang = getLang();
    //密码长度限制
    var pass = $("#resetForm input[name=password]").val();
    var password=$("#resetForm input[name=password]");
    if(pass.length<6){
        password.parent().parent().addClass("error");
        if(lang=='zh-CN'){
            password.next().text("密码长度不少于6位！");
        }else{
            password.next().text("Password length no less than 6 !");
        }
        return false;
    }else {
        password.parent().parent().removeClass("error");
        password.next().text("");
    }

    $.ajax({
        cache: true,
        type: "POST",
        url: "/user/resetPassword",
        data: $('#resetForm').serialize(),
        dataType: "json",
        async: true,
       /* scriptCharset: 'utf-8',*/
        error: function(ajaxobj) {
        },
        success: function(res) {
            var lang = getLang();
            var code = res.code;
            if(code==0){
                //重置密码成功
                $('.box_layer').fadeOut(100).remove();
            }else{
                $("#resetForm input[name=pages]").parent().parent().addClass("error");
                $("#resetForm input[name=pages]").next().next().text(getMsgByCode(code,lang));

            }
        }

    });
}
//系统过滤页面  这些页面 未登录 需要弹出登录窗口
var filterpage= ['/ichpro.html','/ichProForm.html','/ichProContent.html',
    '/ichMasterForm.html','/center.html','/userinfoAdd.html',
    '/createMastorSelect.html'
    ,'/organization.html'];

//登录后显示
function loginedTemplate(data) {
    var str='<div class="main">' +
        '      <div class="item user">' +
        '          <a href="javascript:void(0)"><img src="http://resource.efeiyi.com/image/uploads/head.png" alt=""></a><span>'+data.loginName+'</span>' +
        '      </div>' +
        // '      <div class="item account"><a href="">账户管理</a></div>' +
        '      <div class="item logout"><a href="javascript:void(0)">退出</a></div>' +
        '   </div>';

    $(".logined").html(str);

    //鼠标滑过
    $(".logined").hover(function () {
        $(this).addClass('active');
    },function () {
        $(this).removeClass('active');
    });

    //推出
    $(".logined").on('click','.logout',function () {
        $.ajax({
            cache: true,
            type: "POST",
            url: "/user/logoff",
            data: {params:localStorage.getItem("pid")}, // 你的formid
            dataType: "json",
            async: true,
            success:function (res) {
                if(res.code===0){
                    $(".logined").hide().html('');
                    $(".login").show();
                }
            }
        })
    });

}