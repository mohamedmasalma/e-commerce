<!doctype html>
<html>
    <head>
        <title>MY WEBSITE</title>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css" rel="stylesheet"/>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
        <link href="{{asset('css/admin/style.css')}}" rel="stylesheet">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta charset="UTF-8"/>	
        <script src="http://code.jquery.com/jquery-latest.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>
    </head>
    <body>
        <div id="preloading_div"></div>
        <script>
        function my_preloader (color,size){
            var preloader="";
            if(color=="colorfull"){
                preloader='<div class="preloader-wrapper big active">';
                preloader+='<div class="spinner-layer spinner-blue"><div class="circle-clipper left">';
                preloader+='<div class="circle"></div></div><div class="gap-patch"><div class="circle"></div>';
                preloader+= '</div><div class="circle-clipper right"><div class="circle"></div></div></div>';
                preloader+='<div class="spinner-layer spinner-red"><div class="circle-clipper left">';
                preloader+='<div class="circle"></div></div><div class="gap-patch"><div class="circle"></div>';
                preloader+= '</div><div class="circle-clipper right"><div class="circle"></div></div></div>';
                preloader+= '<div class="spinner-layer spinner-yellow"><div class="circle-clipper left">';
                preloader+='<div class="circle"></div></div><div class="gap-patch"><div class="circle"></div>';
                preloader+= '</div><div class="circle-clipper right"><div class="circle"></div></div></div>';
                preloader+=  '<div class="spinner-layer spinner-green"><div class="circle-clipper left">';
                preloader+= '<div class="circle"></div></div><div class="gap-patch"><div class="circle"></div>';
                preloader+= '</div><div class="circle-clipper right"><div class="circle"></div></div></div></div>';
            }
            else{
                preloader='<div class="preloader-wrapper '+size+' active">';
                preloader+='<div class="spinner-layer spinner-'+color+'-only">';
                preloader+='<div class="circle-clipper left">';
                preloader+='<div class="circle"></div>';
                preloader+='</div><div class="gap-patch">';
                preloader+='<div class="circle"></div>';
                preloader+='</div><div class="circle-clipper right">';
                preloader+='<div class="circle"></div></div>';
                preloader+='</div></div>';
            }
                return preloader;
        }
        $("#preloading_div").html(my_preloader("colorfull",""));
        </script>
        <div id="body">
            <table class="main_table">
                <tr>
                    <td colspan="3" id="top_menu_td" >
                        @include('top')
                    </td>
                </tr>
                <tr>
                    <td id="left_menu_td"  >
                        <div>
                           
                           // <?
                           // include "php classes/lib.php";
                            //include "php classes/departments.php";
                            //include "php classes/shopping.php";
                            //$conn=new department();
                            //$shop=new shopping();
                            //$shop_item_number=$shop->get_shop_items_number();
                            //$opacity="";
                            //if($shop_item_number>0)
                                //$opacity="opacity:1";
                            //echo $conn->client_menu(1);
                            //?>
                        </div>
                    </td>
                    <td id="content_body" >
                        <div style='width:100%;height:1px;box-shadow:0 2px 5px #000'></div>
                        <div class="body_content">
                        </div>
                    </td>
                    <td id="right_menu_td"  >
                        <div id="right_menu">
                            <div class="right_menu_bt waves-effect"  data-position="left" data-delay="200" data-tooltip="حسابك الشخصي" onclick="account(this)">
                                <img src="{{asset('img/profile.png')}}" class="right_menu_img"/>
                                حسابي
                            </div>
                            <div id="shop_salla" class="right_menu_bt waves-effect" data-position="left" data-delay="200" data-tooltip="سلة المشتريات" onclick="shopping_basket(this)">
                                <img src="{{asset('img/shopping.png')}}" class="right_menu_img"/>
                                السلة
                                <div id='shop_item_counter' style=''></div>
                            </div>

                            <div class="right_menu_bt waves-effect"  data-position="left" data-delay="200" data-tooltip="محادثة مع الأدمن" onclick="chat(this)">
                                <img src="{{asset('img/chat.png')}}" class="right_menu_img"/>
                                تشات
                            </div>

                            <div class="right_menu_bt waves-effect"  data-position="left" data-delay="200" data-tooltip="سلاتك الماضية" onclick="last_baskets(this)">
                                <img src="{{asset('img/shopping_2.png')}}" class="right_menu_img"/>
                                سلاتي
                            </div>

                            <div class="right_menu_bt waves-effect"  data-position="left" data-delay="200" data-tooltip="صندوق المفضلة" onclick="favoraite_box(this)">
                                <img src="{{asset('img/fav.png')}}" class="right_menu_img"/>
                                المفضلة
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="right_menu_common_panel" id="account_panel">
                <div style='position:relative;'>
                    <div class='come_from_left_pointer'>
                    </div>
                </div>
                <div id="account_panel_content">
                </div>
            </div>

            <div class='right_menu_common_panel' id="shopping_basket_panel">
                <div style='position:relative;'>
                    <div class='come_from_left_pointer'>
                    </div>
                </div>
                <div class='login_header'>
                    سلة التسوق
                </div>
                <div id="shopping_basket_panel_content">

                </div>
            </div>

     <script type="text/javascript" src="{{asset('js/admin/js.js')}}"></script>
            <div id="full_screen_modal">
            </div>
        </div>
    </body>
</html>