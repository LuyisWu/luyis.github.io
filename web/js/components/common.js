requirejs.config({
	shim: {
		'bootstrap': ['jquery'],
		'handlebar': ['jquery'],
		'cookie':['jquery'],
		'ajaxfileupload':['jquery']
    },
	paths : {
		'jquery' : '../libs/jquery.min',
		'bootstrap' : '../libs/bootstrap.min',
		'handlebars':'../libs/handlebars-v4.0.5',
		'cookie':'../libs/jquery.cookie',
		'ajaxfileupload':'../libs/ajaxfileupload'
	}
});
define(['jquery','handlebars','bootstrap','ajaxfileupload','cookie'],function($,Handlebars){

	// add the handlebar into the global param -'app'
	app.handlebars= function($ele, data, $wrapper, type) {
        /*
         * @param: $ele - template module - $('tpl')
         * @param: data - JSON data {name:'a',name:'b',name:'c'}
         * @param: $wrapper - place the template - $('wrapper')
         * template modules eg:
         *<script id="tpl" type="text/x-handlebars-template">
         *    <ul id="hp_tab">
         *       {{#each name}}
         *           <li><a href="">{{this}}</a></li>
         *       {{/each}}
         *    </ul>
         *</script>
         *<div id="wrapper"> </div>
         *
         * */
        if ($ele.length) {
            var template = Handlebars.compile($ele.html());
            var html = template(data);
            if(type && type=="append"){
            	$wrapper.append(html);
            }else{
            	$wrapper.html(html);
            }
            return true;
        } else {
            return false;
        }
    }
    Handlebars.registerHelper('ifCond', function(v1, v2, options) {
		if(v1 === v2) {
		return options.fn(this);
		}
		return options.inverse(this);
	});
	/*
	* @param: opt 可选参数传递
	*
	*/
	// 上传插件使用
	app.uploadfile = function(opt){
		var defalut={
			url:'',
			secureuri: false,
			fileElementId: '',
			dataType:"json",
			data:"",
			success: function(data, status){
				alert("success");
			},error: function(data, status, e){
				alert("error");
			}
		};
		var fileOpt =  $.extend({},defalut,opt);
		$.ajaxFileUpload({
            url: fileOpt.url, //用于文件上传的服务器端请求地址
            secureuri: fileOpt.secureuri, //是否需要安全协议，一般设置为false
            fileElementId: fileOpt.fileElementId, //文件上传域的ID
            dataType: fileOpt.dataType, //返回值类型 一般设置为json
            data:fileOpt.data,//携带的参数
            success: function (data, status){
                fileOpt.success(data, status);
            },
            error: function (data, status, e){
                fileOpt.error(data, status,e);
            }
        });
	};
	return app;
});