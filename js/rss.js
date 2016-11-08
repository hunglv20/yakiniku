// JavaScript Document

/* --------------------------------------------------------------------------------------
 　RSS表示
--------------------------------------------------------------------------------------- */

$.fn.feed = function (option) {
	var option = $.extend({
		Path        : "",
		BOX         : $(this),
		feedURL     : "",
		MAX         : 5,
		titleMax    : 40,
		postMax     : 100,
		endtext     : "...",
		Datetype    : { year: "年", month: "月", date: "日" },
		Image       : "no",
		ImageSize   : { width: "200", height: "150"}, //表示する画像のサイズ
		noImage     : "no",
		noImage_src : "shared/img/shared/no_image.jpg",
		source      : ""
	},option);
	
	$.ajax({
		url: option["Path"] + "?url=" + option["feedURL"],
		crossDomain: true,
		cache: false, 
		type:'GET',
		dataType:'xml',
		error: function(){ return false; },
		success: function(data){
			var cnt = 0;
			
			//要素を全て配列に
			$(data).find("item").each(function(){
				var title = $("title",this).text(), //タイトル
					link  = $("link",this).text(), //リンク先
					ex    = $("description",this).text(); //注釈文章
					
					//スペースを削除
					ex.replace(/\s+/g, "");
					ex.replace(" ", "");
				
				//タイトルが1行に収まらない場合、調整
				if (title.length > option["titleMax"]) {
					var rename = title.substring(0,option["titleMax"]-1) + option["endtext"];
					title = rename;
				};
				
				//本文の調整
				if (ex.length > option["postMax"]) {
					var retxt = ex.substring(0,option["postMax"]-1) + option["endtext"];
					ex = retxt;
				};
				
				//日付取得
				var Datetxt = $("pubDate",this).text(),
					year  = Datetxt.substring(12, 16),
					month = Datetxt.substring(8, 11),
					date  = Datetxt.substring(5, 7);
				
				//英語表記の月を日本語に変換
				if (month == "Jan") month = "01";
				if (month == "Feb") month = "02";
				if (month == "Mar") month = "03";
				if (month == "Apr") month = "04";
				if (month == "May") month = "05";
				if (month == "Jun") month = "06";
				if (month == "Jul") month = "07";
				if (month == "Aug") month = "08";
				if (month == "Sep") month = "09";
				if (month == "Oct") month = "10";
				if (month == "Nov") month = "11";
				if (month == "Dec") month = "12";
				
				//日付の形式
				var date = year + option["Datetype"]["year"] + month + option["Datetype"]["month"] + date + option["Datetype"]["date"];
				
				//画像の取得
				if(option["Image"] !== "no") {
				
					var ss =  $(this).find('[nodeName="content:encoded"]').context["textContent"];
					var html = $.parseHTML( ss );
					
					var imgTbl  = new Array(),
						src     = "";
						
					$(data).find('div.entry-content img').each(function(){
						Array.prototype.push.apply(imgTbl, [$(this).attr("src")]);
					});
					
					if ($(html).find("img")[0]) src = $(html).find("img")[0]["src"];
					else src = option["noImage_src"]; //no-image画像
					
					if (option["noImage"] === "yes") {
						var img = '<span style="display:block; background: url(' + src + ') no-repeat center center; background-size:cover; width:' + option["ImageSize"]["width"] + 'px; height:' + option["ImageSize"]["height"] + 'px;"></span>';
					}
					
					if (option["noImage"] === "no") {
						if ($(html).find("img")[0]) var img = '<span style="display:block; background: url(' + src + ') no-repeat center center; background-size:cover; width:' + option["ImageSize"]["width"] + 'px; height:' + option["ImageSize"]["height"] + 'px;"></span>';
						else var img = '<span class="no-image" style="display:none;"></span>';
					};
				};
				
				//出力のソース
				if(!title.match("PR")) {
					var postdata = option["source"];
					var post = postdata(link,title,date,ex,img,cnt);
					
					$(option["BOX"]["selector"]).append(post);
				};
				
				//終了フラグ
				cnt++;
				if(cnt > (option["MAX"] -1)) return false;
			});
		}
	});
};