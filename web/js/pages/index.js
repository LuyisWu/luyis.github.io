require(['../components/common'],function(){
	config.count = 0;
	config.row = 5;
	$(".js-music-action").on("click",function(e){
		e.preventDefault();
		$(".music").toggleClass("active");
		setTimeout(function(){
			$(".music").removeClass("active");	
		},2000);
	});
	$(document).on('keyup focus', '.js-search-input', function(event) {
		event.preventDefault();
		
		var eType=event.type;
		/* Act on the event */
		$.ajax({
			url: './data/search.json',
			type: 'GET',
			dataType: 'json',
			success: function(data){
				var res;
				var searchValue = $(this).val();
				if(eType=="focusin" && searchValue ===""){
					res = data.recomand;
				}else if(searchValue !=="" && searchValue.indexOf("l") > "-1"){
					
					res = data.l;
				}else if(searchValue !=="" && searchValue.indexOf("h") > "-1"){
					res = data.h;
				}else{
					res =data.news;
				}
				app.handlebars($("#search-content-id"),res,$(".search-content-wrapper"),"html");
				$(".search-content-wrapper").addClass("active");	
				setTimeout(function(){
					$(".search-content-wrapper").removeClass("active");	
				},5000);
			}
		});
	});
	/*
	*	@action: 实现search input 的focus keyup事件 
 	*/
	$(document).on('keyup focus', '.js-search-input', function(event) {
		event.preventDefault();
		var searchValue = $(this).val();
		var eType=event.type;
		/* Act on the event */
		$.ajax({
			url: './data/search.json',
			type: 'GET',
			dataType: 'json',
			data: {searchKey: searchValue},
			success: function(data){
				var res;
				if(eType=="focusin" && searchValue ===""){
					res = data.recomand;
				}else if(searchValue !=="" && searchValue.indexOf("l") > "-1"){
					res = data.luyiswu;
				}else if(searchValue !=="" && searchValue.indexOf("h") > "-1"){
					res = data.h;
				}else{
					res =data.news;
				}
				app.handlebars($("#search-content-id"),res,$(".search-content-wrapper"),"html");
			}
		});
	});
	/*
	*	@action: 实现search搜索按钮事件 
 	*/
 	$(document).on('click', '.js-search-btn', function(event) {
 		event.preventDefault();
 		/* Act on the event */
 		var searchValue = $(".js-search-input").val();
 		$.ajax({
			url: './data/search.json',
			type: 'GET',
			dataType: 'json',
			data: {searchKey: searchValue},
			success: function(data){
				var res;
				if(eType=="focusin" && searchValue ===""){
					res = data.recomand;
				}else if(searchValue !=="" && searchValue.indexOf("l") > "-1"){
					res = data.luyiswu;
				}else if(searchValue !=="" && searchValue.indexOf("h") > "-1"){
					res = data.h;
				}else{
					res =data.news;
				}
			}
		});
 	});
	/*
 		action: 显示头像信息
 	*/
 	$.ajax({
		url: './data/account.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			console.log(data);
			// app.handlebars($("#content-id"),contentList,$(".content-block"),"append");
		}
	});
 	/*
		action: 显示首页内容
 	*/
 	$.ajax({
		url: './data/index.json',
		type: 'GET',
		dataType: 'json',
		success: function(data){
			var contentList;
			if(data.length <= config.row){
				contentList = data;
				$(".js-load-more").hide();
			}else{
				contentList = data.splice(config.count,config.row); 
			}
			app.handlebars($("#content-id"),contentList,$(".js-content-info"),"append");
		}
	});
	$(document).on("click",".js-load-more",function(e){
		e.preventDefault();
		$.ajax({
			url: './data/index.json',
			type: 'GET',
			dataType: 'json',
			success: function(data){
				config.count++;
				var first = config.count * config.row;
				var contentList = data.splice(first,config.row);
				if(data.splice(first) <= config.row){
					$(".js-load-more").hide();
				}else{
					$(".js-load-more").show();
				}
				app.handlebars($("#content-id"),contentList,$(".js-content-info"),"append");
			}
		});
	});
	function resizeHeight(){
		var cHeight = $(window).height();
		var navHeight = $(".top-navbar").outerHeight(true);
		var fHeight = $(".footer").outerHeight(true);
		var height = cHeight - navHeight -fHeight-20;
		$(".content-block").css("height",height);
	}
	$(function(){
		resizeHeight();
	});
	$(window).resize(function(event) {
		/* Act on the event */
		resizeHeight();
	});
});