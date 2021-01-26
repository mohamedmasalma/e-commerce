<div id="top_logo_div">
<img src="global imgs/hasan.png" id='main_logo'/>
</div>
<div id="top_menu">
<button class="top_menu_bt waves-effect " >عنا</button>
<button class="top_menu_bt waves-effect " >تواصل معنا</button>
<button class="top_main_bt top_menu_bt waves-effect get_imtes_event" dep_id="1">الصفحة الرئيسية</button>
<button class="top_menu_bt waves-effect " >عروضنا</button>
<button class="top_menu_bt waves-effect " onclick="signup_load()">إشترك معنا</button>
<div id='lan' class='dropdown-button waves-effect' data-activates='lan_drop'>
<img id='id_of_lan_flag_img' src="{{asset('img/arab_flag.png')}}"class='lan_flag_img'/><br/>
<font id="lan_text">AR</font>


<ul id='lan_drop' class='dropdown-content'>
    <li class='lan_drop_item waves-effect' onclick='change_lan("ar")'>
    	<img src="{{asset('img/arab_flag.png')}}" class='lan_flag_img'/>عربي</li>
    <li class='lan_drop_item waves-effect' onclick='change_lan("en")'>
    	<img src="{{asset('img/america_flag.png')}}" class='lan_flag_img'/>ENGLISH</li>
	<li class='lan_drop_item waves-effect' onclick='change_lan("tr")'>
		<img src="{{asset('img/turkey_flag.png')}}" class='lan_flag_img'/>TÜRKÇE</li>
</ul>

</div>


<div class='my_vertical_divider'></div>
<i id='search_icon_top' class='material-icons btn-floating btn-large waves-effect' onclick='search_div(this)'>search</i>
<div id='main_search_div'>
<input type='text' class='main_search_tb' value="" placeholder='إبحث هنا' onblur="check_search(this)"/>
</div>

<i class="material-icons waves-effect waves-circle fullscreen" id="full_screen_bt" onclick="toggleFullScreen();mytoggleFullScreen();">fullscreen</i>
</div>