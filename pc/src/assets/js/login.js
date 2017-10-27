//登录注册
var loginPage = {
    init: function () {
        //去除表单最后一组的下边距
        this.show();
    },
    show: function () {//点击展示
        var _this = this;
        var el = $('.header .content .info li.login');
        el.on('click', function () {
            _this.template();
            _this.close();
            _this.code();
            _this.tabItem();
        });
    },
    code: function () { //验证码
        var _form = $('.form_area');
        var _span = _form.find('.pages span');
        var _oldSpan = _span.text();
        var time = 60;
        _span.on('click', function () {
            var _this = $(this);

            if (!_this.hasClass('active')) {
                _this.addClass('active').text(time + 's后重新发送');
                var timer = setInterval(function () {
                    time--;
                    _this.text(time + 's后重新发送');

                    if (time == 0) {
                        clearInterval(timer);
                        time = 60;
                        _this.removeClass('active').text(_oldSpan);
                    }
                }, 1000);
            }

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
        var html = `<div class="box_layer">
                    <div class="item login" style="display: block;">
                        <form class="form_area" action="">
                            <div class="title">登录<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>昵&nbsp;&nbsp;称</span></div>
                                <div class="area">
                                    <input class="ipt" name="loginName" type="text" placeholder="请输入昵称">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>密&nbsp;&nbsp;码</span></div>
                                <div class="area">
                                    <input class="ipt" type="text" name="password" placeholder="请输入密码">
                                    <a class="forget js-to-reset" href="javascript:;">忘记登录密码</a>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="button" value="登录" onclick="login()">
                                    <a class="arrow_right js-to-register" href="javascript:;">暂无账号，去注册</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 登录-->
                    <div class="item register" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">注册<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>昵称</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>手机号</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>验证码</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span>获取验证码</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>密码</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                
                            <div class="group policy">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <label for="policy"><input id="policy" type="checkbox">我已仔细阅读并同意《法律声明及隐私权政策》</label>
                                </div>
                            </div>
                            <div class="group" style="margin-bottom: 0">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="注册">
                                    <a class="arrow_right js-to-login" href="javascript:;">已有账号，去登录</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 注册-->
                    <div class="item reset" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">重置密码<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>手机号</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>验证码</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span>获取验证码</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>新密码</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group" style="margin-top:50px;margin-bottom: 0;">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="确认">
                                    <a class="arrow_right js-to-login" href="javascript:;">去登录</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 重置密码-->
                
                
                    <div class="overbg0" style="z-index:11;"></div>
                </div>`;
        $('body').append(html);
    },
    templateEn:function () {
        var html = `<div class="box_layer">
                    <div class="item login" style="display: block;">
                        <form class="form_area" action="">
                            <div class="title">Sign in<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>nickname</span></div>
                                <div class="area">
                                    <input class="ipt" name="loginName" type="text" placeholder="Please enter your nickname">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>Password</span></div>
                                <div class="area">
                                    <input class="ipt" type="text" name="password" placeholder="Please input a password">
                                    <a class="forget js-to-reset" href="javascript:;">Forgot login password</a>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="button" value="Sign in" onclick="login()">
                                    <a class="arrow_right js-to-register" href="javascript:;">No account to register</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 登录-->
                    <div class="item register" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">register<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>nickname</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>Cell-phone number</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>Verification Code</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span>Get validation code</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>Password</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                
                            <div class="group policy">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <label for="policy"><input id="policy" type="checkbox">I have read and agreed to the legal declaration and privacy policy</label>
                                </div>
                            </div>
                            <div class="group" style="margin-bottom: 0">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="register">
                                    <a class="arrow_right js-to-login" href="javascript:;">Have an account to log on</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 注册-->
                    <div class="item reset" style="display: none;">
                        <form action="" class="form_area">
                            <div class="title">reset password<span class="close"></span></div>
                            <div class="group">
                                <div class="name"><span>Cell-phone number</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>Verification Code</span></div>
                                <div class="area">
                                    <input type="text" class="ipt" value="" maxlength="10">
                                    <div class="code">
                                        <span>Get validation code</span>
                                    </div>
                                </div>
                            </div>
                            <div class="group">
                                <div class="name"><span>New password</span></div>
                                <div class="area">
                                    <input type="password" class="ipt" value="">
                                </div>
                            </div>
                            <div class="group" style="margin-top:50px;margin-bottom: 0;">
                                <div class="name">&nbsp;</div>
                                <div class="area">
                                    <input class="btn" type="submit" value="confirm">
                                    <a class="arrow_right js-to-login" href="javascript:;">Log in</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <!--//End 重置密码-->
                
                
                    <div class="overbg0" style="z-index:11;"></div>
                </div>`;
        $('body').append(html);
    }
};


$(function () {
    loginPage.init();
});