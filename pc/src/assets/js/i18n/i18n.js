$(function(){
	loadProperties(getCurrentLanguage());//中文->zh-CN   英文->en
});

function switchLanguage(language) {
	localStorage.setItem('language', language);
	window.location.reload();
}

function getCurrentLanguage() {
	var language = getQueryString('lang');

	if(language == null) {
		language = localStorage.getItem("language") != null ? localStorage.getItem("language") : getBrowserLanguage();
	} else {
		localStorage.setItem('language', language);
	}

	return language;
}

function getBrowserLanguage() {
	var _default = $.i18n.browserLang();
	if(_default.indexOf('zh') > -1) {
		_default = 'zh-CN';
	} else if(_default.indexOf('en') > -1) {
		_default = 'en';
	}
	return _default;
}

function loadProperties(language){
	var propName = 'strings';
	if(language == 'zh-CN') {
		propName = 'strings_zh-CN';
	}

	jQuery.i18n.properties({//加载资浏览器语言对应的资源文件
		name:propName, //资源文件名称
		path:'/i18n/', //资源文件路径
		mode:'map', //用Map的方式使用资源文件中的值
		language:language,//中文->zh-CN   英文->en
		callback: function() {//加载成功后设置显示内容
			$('#home').text($.i18n.prop('home'));
			$('#ich_directory').text($.i18n.prop('ich_directory'));
			$('#ich_master').text($.i18n.prop('ich_master'));
			$('#selected_content').text($.i18n.prop('selected_content'));
			$('#information').text($.i18n.prop('information'));
			$('#official_service').text($.i18n.prop('official_service'));
			$('#project_declare').text($.i18n.prop('project_declare'));
			$('#sign_in').text($.i18n.prop('sign_in'));

            //分类
			$('#legend').text($.i18n.prop('legend'));
			$('#language').text($.i18n.prop('language'));
			$('#text').text($.i18n.prop('text'));
			$('#oral').text($.i18n.prop('oral'));
			$('#other_oral').text($.i18n.prop('other_oral'));
			$('#perform').text($.i18n.prop('perform'));
			$('#music').text($.i18n.prop('music'));
			$('#dance').text($.i18n.prop('dance'));
			$('#folk_song').text($.i18n.prop('folk_song'));
			$('#traditional_drama').text($.i18n.prop('traditional_drama'));
			$('#quyi').text($.i18n.prop('quyi'));
			$('#sport').text($.i18n.prop('sport'));
			$('#other_perform').text($.i18n.prop('other_perform'));
			$('#custom_etiquette').text($.i18n.prop('custom_etiquette'));
			$('#business_custom').text($.i18n.prop('business_custom'));
			$('#life_customs').text($.i18n.prop('life_customs'));
			$('#life_ritual').text($.i18n.prop('life_ritual'));
			$('#festival_celebration').text($.i18n.prop('festival_celebration'));
			$('#other_celebration').text($.i18n.prop('other_celebration'));
			$('#practice_nature').text($.i18n.prop('practice_nature'));
			$('#df_fishery').text($.i18n.prop('df_fishery'));
			$('#clothing').text($.i18n.prop('clothing'));
			$('#food').text($.i18n.prop('food'));
			$('#h_construction').text($.i18n.prop('h_construction'));
			$('#traffic').text($.i18n.prop('traffic'));
			$('#medicine').text($.i18n.prop('medicine'));
			$('#military').text($.i18n.prop('military'));
			$('#business').text($.i18n.prop('business'));
			$('#farm').text($.i18n.prop('project'));
			$('#ag_irrigation').text($.i18n.prop('ag_irrigation'));
			$('#on_knowledge').text($.i18n.prop('on_knowledge'));
			$('#tt_handmade').text($.i18n.prop('tt_handmade'));
			$('#tm_manufacture').text($.i18n.prop('tm_manufacture'));
			$('#p_techniques').text($.i18n.prop('p_techniques'));
			$('#daa_products').text($.i18n.prop('daa_products'));
			$('#d_process').text($.i18n.prop('d_process'));
			$('#p_paperhanging').text($.i18n.prop('p_paperhanging'));
			$('#k_techniques').text($.i18n.prop('k_techniques'));
			$('#cp_craft').text($.i18n.prop('cp_craft'));
			$('#s_techniques').text($.i18n.prop('s_techniques'));
			$('#pc_technics').text($.i18n.prop('pc_technics'));
			$('#sc_techniques').text($.i18n.prop('sc_techniques'));
			$('#b_technics').text($.i18n.prop('b_technics'));
			$('#w_techniques').text($.i18n.prop('w_techniques'));
			$('#o_kind').text($.i18n.prop('o_kind'));

			//首页轮播
			$('#b_opera').text($.i18n.prop('b_opera'));

            //非遗在全球
			$('#t_total').text($.i18n.prop('t_total'));
			$('#ic_pro').text($.i18n.prop('ic_pro'));
			$('#ic_world').text($.i18n.prop('ic_world'));
			$('#s_world').text($.i18n.prop('s_world'));
			$('#r_pro').text($.i18n.prop('r_pro'));

			$('#lhref1_id').attr('href',$.i18n.prop('lhref1_id'));
			$('#src_id').attr('src',$.i18n.prop('src_id'));
			$('#tg_id').text($.i18n.prop('tg_id'));
            $('#lhref2_id').attr('href',$.i18n.prop('lhref2_id'));
			$('#china_id').text($.i18n.prop('china_id'));
			$('#k_id').text($.i18n.prop('k_id'));
			$('#ko_id').text($.i18n.prop('ko_id'));
			$('#zhou_id').text($.i18n.prop('zhou_id'));
            $('#lhref3_id').attr('href',$.i18n.prop('lhref3_id'));
			$('#zsrc_id').attr('src',$.i18n.prop('zsrc_id'));
			$('#In_id').text($.i18n.prop('In_id'));
            $('#lhref_id1').attr('href',$.i18n.prop('lhref_id1'));
			$('#india_id').text($.i18n.prop('india_id'));
			$('#su_id').text($.i18n.prop('su_id'));
            $('#lhref_id2').attr('href',$.i18n.prop('lhref_id2'));
			$('#suxiu_id').text($.i18n.prop('suxiu_id'));
			/*$('#yao_id').text($.i18n.prop('yao_id'));*/
			$('#ya_id').text($.i18n.prop('ya_id'));
			$('#yao_id').attr('src',$.i18n.prop('yao_id'));
            $('#lhref_id3').attr('href',$.i18n.prop('lhref_id3'));
			$('#ysrc_id').attr('src',$.i18n.prop('ysrc_id'));


            //非遗资讯
            $('#info_1').text($.i18n.prop('info_1'));
            $('#href1_id').attr('href',$.i18n.prop('href1_id'));
            $('#info_1_time').text($.i18n.prop('info_1_time'));
			$('#img_1').attr("src",$.i18n.prop('img_1'));
            $('#href2_id').attr('href',$.i18n.prop('href2_id'));
            $('#info_2').text($.i18n.prop('info_2'));
            $('#info_2_time').text($.i18n.prop('info_2_time'));
			$('#img_2').attr("src",$.i18n.prop('img_2'));
            $('#href3_id').attr('href',$.i18n.prop('href3_id'));
            $('#info_3').text($.i18n.prop('info_3'));
            $('#info_3_time').text($.i18n.prop('info_1_time'));
			$('#img_3').attr("src",$.i18n.prop('img_3'));
            $('#zixun_title').text($.i18n.prop('zixun_title'));


            $('#d_id').text($.i18n.prop('d_id'));
            $('#apply_id').text($.i18n.prop('apply_id'));

			//搜索页面
			$('#attr_text').text($.i18n.prop('attr_text'));
			$('#area_text').text($.i18n.prop('area_text'));
			$('#first_category').text($.i18n.prop('first_category'));
			$('#second_category').text($.i18n.prop('second_category'));
			$('#search_position').text($.i18n.prop('search_position'));
			$('#alphabetical_order').text($.i18n.prop('alphabetical_order'));
			$('#search_count').text($.i18n.prop('search_count'));
			$('#search_all').text($.i18n.prop('search_all'));
			$('#search_project').text($.i18n.prop('search_project'));
			$('#search_master').text($.i18n.prop('search_master'));
			$('#search_works').text($.i18n.prop('search_works'));


            //渲染地图
            homePage.map(language);


        }
	});
}

