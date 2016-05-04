showdown.setOption('tables', true);
$(function(){
	template.helper('$findResultById', function (id,requests) {
			var request=findResultById(id,requests);
			var html="<color class='method-"+request.method+"'>"+request.method+"</color>"+request.name;
		    return html;
		});
	template.helper('$findResultByIds', function (ids,requests) {
			var requests=findResultByIds(ids,requests);
		    return requests;
		});
	template.helper('$apiFormate', function (request) {
			var description=request.description;

		    var converter = new showdown.Converter() 
  			var html = converter.makeHtml(description);
  			var $html=$("<div>"+html+"</div>");
  			$html.find("table").attr("class","table table-bordered table-hover table-condensed");
		    return $html.html();
		});
	loadApiFile();

	
})
//加载文件
function loadApiFile(){
	var url="dx.json.postman_collection";//"tradingscheme-client.json.postman_collection";
	$.getJSON(url, function(data) {
	 	resolutionApiData(data);
	});
}
//解析API数据
function resolutionApiData(data){

	var projectName=data.name;
	$("#projectName").html(projectName);

	var order=data.order;
	var folders=data.folders;

	var menu = template('menu', data);
	$(".sidebar").append(menu);
    
    var requests=findResultByIds(order,data.requests);
	var main=template('docsSection',{requests:requests});
    $(".main").append(main);



    $.each(data.folders,function(){
    	var requests=findResultByIds(this.order,data.requests);
    	var main=template('docsSection',{requests:requests});
    	$(".main").append(main);
    })
	

	$(".sidebar .list-group > a.sidebar-menu").on("click",function(){
		var hasClass=$(this).find("span").hasClass("glyphicon-menu-down");
		if(hasClass){
			$(this).parent().find("a.sidebar-submenu").css({"display":"block"});
			$(this).find("span").removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
		}else{
			$(this).parent().find("a.sidebar-submenu").css({"display":"none"});
			$(this).find("span").removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
		}
		
	})
}
function findResultById(id,requests){
		var request=null;
		$.each(requests,function(){
			if(this.id==id){
				request= this;
			}
		});
		return request;
}

function findResultByIds(ids,requests){
		var request=[];
		$.each(ids,function(){
			var id=this;
			$.each(requests,function(){
				if(this.id==id){
					request.push(this);
				}
			});
		});
		
		return request;
}
