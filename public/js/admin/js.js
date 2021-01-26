var master_id="";
$( document ).ready(function() {
    $(".nav_bar li").click(function(){
		bt=$(this);
		$(".nav_bar li").attr("class","");
		bt.attr("class","active");
		$("#top_bar_header").html(bt.find("p").html());
	});
	$(".action_bar_i").tooltip();
	$(".menu_action_icons").tooltip();
	$(".dep_position_bt").click(function(e){
        e.stopPropagation();
        $(".dep_position_bt").each(function(){
            var x=$(this);
            x.css({"background":"","color":""});
        });
        var x=$(this);
        var id=x.parent().parent().attr("dep-id");
        x.css({"background":"#283747","color":"white"});
        master_id=id;
        dep_position=x.attr("dep-position");
	});
	$(".dep_action_bt").click(function(e){
            e.stopPropagation();
            var id=$(this).parent().parent().attr("dep-id");
            var name=$(this).parent().parent().attr("dep-name");
            var type=this.getAttribute("dep-type")
            if(type=="delete"){
                var msg="<h4>What About Sub Categories And Products ?</h4>";
                var bt_classes='modal-action waves-effect  btn-flat modal_action_bt ';
                var bt1='<button class="waves-green '+bt_classes+'" onclick="final_confirm(\'delete_all\','+id+')">Delete Every Thing</button>';
                var bt2='<button class="waves-green '+bt_classes+'" onclick="sub_to_archive_confirm('+id+')" >Move Them To Archive</button>';
                var bt3='<button class="waves-green '+bt_classes+'" onclick="sub_to_other_dep('+id+')">Move Them To Another Category</button>';
                var bt4='<button class="waves-red modal-close '+bt_classes+'">Cancel</button>';
                $("#confirm_modal .modal-content").html(msg);
                $("#confirm_modal .modal-footer").html(bt1+bt2+bt3+bt4);
                $("#confirm_modal").openModal();
            }
            else if(type=="edit"){
                var content="<h4>Edit Category Name</h4>";
                dep_id=id;               
                content+='<input class="general_tb" type="text" id="new_dep_name" value="'+name+'" placeholder="Category Name.."/>';
                var bt_classes='modal-action waves-effect  btn-flat modal_action_bt ';
                var bt1='<button class="waves-green '+bt_classes+'" onclick="edit_dep_name()">Save</button>';
                var bt2='<button class="waves-red modal-close '+bt_classes+'">Cancel</button>'; 
                $("#confirm_modal .modal-content").html(content);
                $("#confirm_modal .modal-footer").html(bt1+bt2);
                $("#confirm_modal").openModal();
            }
            else if(type=="move"){
                $("#add_new_dep_modal").openModal();
            }
            else if(type=="visibility"){
                var val=$(this).text();
                var content="";
                if(val=="visibility")
                    content="Are You Sure That You Want To Make This Category Invisible For Customers?";
                else
                    content="Are You Sure That You Want To Make This Category Visible For Customers?";
                $("#final_confirm_modal .modal-content").html("<h4>"+content+"</h4>");
                $("#final_confirm_modal .waves-green").attr("onclick","dep_visibility("+id+",'"+val+"')");
                $("#final_confirm_modal").openModal();
            }
        });
});
// Get All Departments And Put them in Modal
    function add_new_dep(){
        $("#add_new_dep_modal").openModal();
    }
// Toggle Collaps on click
	function toggle_collabs(x){
		var x2=x;
		x=x.childNodes;
		var i;
		for(i = 0; i < x.length; i++){
			if(x[i].className=='material-icons left_menu_icon_right'){break;}
		}
		if(x[i].innerHTML=='remove'){
			x[i].innerHTML ='add';
			x2.style.background='#fff';
		}
		else{
			x[i].innerHTML ='remove';
			x2.style.background='#ccc';
		}
	}
// Allow user to choose A master departments for the new department
    function dep_choose_master(){
        if(master_id!=""){
            var content="<h4>Choose Category Name </h4>";
            content+='<input class="general_tb" type="text" id="dep_name" placeholder="Category Name..."/>';
            var bt_classes='modal-action waves-effect  btn-flat modal_action_bt ';
            var bt1='<button class="waves-green '+bt_classes+'" onclick="add_new_dep_final()">Save</button>';
            var bt2='<button class="waves-red modal-close '+bt_classes+'">Cancel</button>';
            $("#confirm_modal .modal-content").html(content);
            $("#confirm_modal .modal-footer").html(bt1+bt2);
            $("#add_new_dep_modal").closeModal();
            $("#confirm_modal").openModal();
        }
        else{
            Materialize.toast("You Have To Choose Parent Category", 4000,"my_toast");
        }
    }