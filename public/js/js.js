
// Global Variables
	var full_screen_modal_current_page="";
	var full_screen=true;


// my input function to make the label stay up when the textbox not empty
function stay_up(x){
	var c = x.parentElement.children;
	var bar=$(c[2]);
	if(x.value!=""){
		c[1].style.top="10px";
		bar.css({"left":"0","width":"100%"});
		x.style.borderBottom ="1px solid transparent";
	}
	else{
		c[1].style.top="";
		x.style.borderBottom ="1px solid #000";
		bar.css({"left":"","width":""});
	}
}

// open Account Panel
function account(bt){
	var js=script_existed("login");
	var css=style_sheet_existed("login");
	var bt=$(bt);
	var panel=$("#account_panel");
	close_other_panels(panel,bt);
	if(bt.attr("opened")=="yes"){
		panel.css({"right":"","opacity":"","border-radius":"5px 0 0 100%"});
		bt.css({"background":""});
		bt.attr("opened","no");
	}
	else{
		panel.css({"right":"75px","opacity":"1","border-radius":"5px 0 0 5px"});
		bt.css({"background":"#900c3f"});
		bt.attr("opened","yes");
		$("#account_panel_content").html("<div id='account_loading_div'>"+my_preloader("colorfull","")+"</div>");
		$.post("php classes/cmd.php",
			{
				type:"user_account",
				js : js,
				css : css
			},
			function(data,statue){
			var data=data.split("|||||split-account|||||");
			if(css==false)
			$("head").append(data[1]);
			if(js==false)
			$("body").append(data[2]);
			$("#account_panel_content").html(data[0]);
		});
	}
}
function script_existed(name){
	var val=false;
	$("body").children("script").each(function(){
		var x=$(this);
		if(x.attr("data-type")==name){
			val=true;
		}
	});
	return val;
}
function style_sheet_existed(name){
	var val=false;
	$("head").children("link").each(function(){
		var x=$(this);
		if(x.attr("data-type")==name){
			val=true;
		}
	});
	return val;
}

// open Shopping Basket Panel ..
	function shopping_basket(bt){
		var js=script_existed("shopping_basket");
		var css=style_sheet_existed("shopping_basket");
		bt=$(bt);
		var panel=$("#shopping_basket_panel");
		close_other_panels(panel,bt);
		if(bt.attr("opened")=="yes"){
			bt.attr("opened","no");
			panel.css({"right":"","opacity":""});
			bt.css({"background":""});
		}
		else{
			destroy_tooltip(".item_action_bt");
			panel.css({"right":"75px","opacity":"1"});
			bt.attr("opened","yes");
			bt.css({"background":"#900c3f"});
			panel.append("<div id='shopping_basket_loading_div'>"+my_preloader("colorfull","")+"</div>");
			$.post("php classes/cmd.php",
			{
				type:"shopping",
				sub_type:"load",
				js : js,
				css : css
				},
				function(data,statue){
					$("#shopping_basket_loading_div").remove();
					var data=data.split("|||||split-shopping_basket|||||");
					if(css==false)
						$("head").append(data[1]);
					if(js==false)
						$("body").append(data[2]);
					$("#shopping_basket_panel_content").html(data[0]);
					shopping_basket_ready();
					$('.item_action_bt').tooltip({delay : 500});
			});
		}
	}




//close other panels while opening a new one
	function close_other_panels(panel,bt){
		$(".right_menu_common_panel").each(function(){
			var x=$(this);		
			if(x.attr("id")!=panel.attr("id")){
				x.css({"right":""});
			}
		});
		$(".right_menu_bt").each(function(){
			var x=$(this);
			if(x.attr("id")!=bt.attr("id")){
				x.css({"background":""});
				x.attr("opened","no");
			}
		});
	}




//when the document is ready
	$(document).ready(function(){
		
	//display the page and remove preloader
		$("#body").css("transform","scaleX(1)");
		$("#preloading_div").remove();
		$(".right_menu_bt").tooltip();


	//get all items in main page
		$("#body .body_content").html("<div id='body_preloader_div'>"+my_preloader("colorfull","big")+"</div>");
		$.post("php classes/cmd.php",{
			type : "mat",
			sub_type : "get_from_dep",
			dep_id : "1"
			},function(data, status){
				if(data !=false){
					$("#body .body_content").html(data);
					jQuery_Ready();
				}
				else{

				}
		});
	// get items when user click on department
		$(".get_imtes_event").click(function(e){
			e.stopPropagation();
			destroy_tooltip(".my_icon");
			$("#body .body_content").html("<div id='body_preloader_div'>"+my_preloader("colorfull","big")+"</div>");
			$.post("php classes/cmd.php",{
				type : "mat",
				sub_type : "get_from_dep",
				dep_id : this.getAttribute("dep_id")
				},function(data, status){
					if(data !=false){
						$("#body .body_content").html(data);
						jQuery_Ready();
					}
					else{

					}
			});
    	});	
	});



//main search textbox animations 
//animate the text box left right
	function search_div(x){
		var a=$("#main_search_div");
		var b=$("#search_icon_top");
		if(a.width()==0){
			a.css("visibility","visible");
			a.css("width","270");
			b.css("right","355");
		}
		else if($(".main_search_tb").val()==""){
			a.css("visibility","hidden");
			a.css("width","0");
			b.css("right","85");
		}
	}


// Close Search Bar
	function check_search(x){
		x=$(x).val()
		if(x==""){
			$("#main_search_div").css("visibility","hidden");
			$("#main_search_div").css("width","0");
			$("#search_icon_top").css("right","85");
		}
	}

// change laguage
	function change_lan(x){
		if(x=="ar"){
			$("#id_of_lan_flag_img").attr("src","global imgs/arab_flag.png");
			$("#lan_text").text("AR");
		}
		else if(x=="en"){
			$("#id_of_lan_flag_img").attr("src","global imgs/america_flag.png");
			$("#lan_text").text("EN");
		}
		else if(x=="tr"){
			$("#id_of_lan_flag_img").attr("src","global imgs/turkey_flag.png");
			$("#lan_text").text("TR");
		}
	}


//card icons functions
	function jQuery_Ready(){
		//add to favorait menu
		$('.add_to_favorait').click(function(){
			if($(this).attr('data-tooltip')!='تمت الإضافة'){
				$(this).css('color','rgb(186, 0, 70)');
				$(this).attr('data-tooltip','تمت الإضافة');
			}
		});

		//add to shopping basket
		$('.add_to_shopping').click(function(){
			var bt=$(this);
			var shopping_counter=$("#shop_item_counter");
			if(bt.attr('data-tooltip')!='تمت الإضافة'){
				request_item(bt.attr("mat-id"),bt,this);
			}
		}); 
		$('.my_icon').tooltip();
	}
	function request_item(id,bt,th){
		$.post("php classes/cmd.php",{
			type:"shopping",
			sub_type:"add",
			id:id
			},function(data,statu){
				if(data=="ok"){
					item_has_been_added(bt,th);
				}
				else{

				}
			}
		);
	}
	function item_has_been_added(bt,th){
		var shopping_counter=$("#shop_item_counter");
		bt.css('color','rgb(63, 124, 6)');
		bt.attr('data-tooltip','تمت الإضافة');
		$("#shop_item_counter").css('opacity','1');	
		var x=parseInt(shopping_counter.html())+1;
		shopping_counter.html(x);
		$("#shop_salla").addClass("animated shake").delay(2000).queue(function(){
			$(th).removeClass("animated shake").dequeue();
		});
	}

// TOGGLE FULL SCREEN MODE
	function mytoggleFullScreen(){
		if(full_screen==true){
			$("#full_screen_bt").html("fullscreen_exit");
			full_screen=false;
		}
		else{
			$("#full_screen_bt").html("fullscreen");
			full_screen=true;
		}
	}
	function toggleFullScreen()
	{
		var doc = document.documentElement,
			state = (document.webkitIsFullScreen || document.isFullScreen),
			requestFunc = (doc.requestFullScreen || doc.webkitRequestFullScreen),
			cancelFunc = (document.cancelFullScreen || document.webkitCancelFullScreen);

		(!state) ? requestFunc.call(doc) : cancelFunc.call(document);
	}
// END TOGGLE

// load page to display it in Full Size Modal
	function signup_load(){
		var js=script_existed("signup");
		var css=style_sheet_existed("signup");
		$.post("php classes/cmd.php",{
			type : "load_signup",
			js : js,
			css : css
		}
		,function(data,status){
			destroy_tooltip(".sign_up_icons");
			var data=data.split("|||||split-signup|||||");
			if(css==false)
			$("head").append(data[1]);
			if(js==false)
			$("body").append(data[2]);
			$("#full_screen_modal").html(data).dequeue();
			$("#full_screen_modal").delay(50).queue(function(){
				show_full_screen_modal();
			});
			$('.sign_up_icons').tooltip();
		});
	}



function destroy_tooltip(name){
	$(name).each(function(){
		var x="#"+this.getAttribute("data-tooltip-id");
		$(x).remove();
	});
}
function show_full_screen_modal(){
	$("#full_screen_modal").css({"opacity" : "1","visibility":"visible"});
	$("#full_screen_modal > div").css({"transform":"scale(1)","border-radius":"5px"});
}
function close_full_screen_modal(){
	$("#full_screen_modal").css({"opacity" : "0","visibility":"hidden"});
	$("#full_screen_modal > div").css({"transform":"scale(0)","border-radius":"5px"});
}




