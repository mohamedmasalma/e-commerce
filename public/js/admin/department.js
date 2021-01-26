
// Global Variables
    var dep_id="";
    var master_id="";
    var dep_position="";
// initializations for departmets page
    function departments_ready(){
        $(".dep_action_bt").click(function(e){
            e.stopPropagation();
            var id=$(this).parent().parent().attr("dep-id");
            var name=$(this).parent().parent().attr("dep-name");
            var type=this.getAttribute("dep-type")
            if(type=="delete"){
                var msg="ماذا عن الأقسام والمواد التي تنطوي تحت هذا القسم ؟";
                var bt_classes='modal-action waves-effect  btn-flat modal_action_bt ';
                var bt1='<button class="waves-green '+bt_classes+'" onclick="final_confirm(\'delete_all\','+id+')">إحذف الجميع</button>';
                var bt2='<button class="waves-green '+bt_classes+'" onclick="sub_to_archive_confirm('+id+')" >إنقلهم إلى الأرشيف</button>';
                var bt3='<button class="waves-green '+bt_classes+'" onclick="sub_to_other_dep('+id+')">إنقلهم إلى قسم آخر</button>';
                var bt4='<button class="waves-red modal-close '+bt_classes+'">إلغاء</button>';
                $("#confirm_modal .modal-content").html(msg);
                $("#confirm_modal .modal-footer").html(bt1+bt2+bt3+bt4);
                $("#confirm_modal").openModal();
            }
            else if(type=="edit"){
                var content="<h4>تعديل إسم القسم</h4>";
                dep_id=id;               
                content+='<input class="general_tb" type="text" id="new_dep_name" value="'+name+'" placeholder="إسم القسم"/>';
                var bt_classes='modal-action waves-effect  btn-flat modal_action_bt ';
                var bt1='<button class="waves-green '+bt_classes+'" onclick="edit_dep_name()">حفظ</button>';
                var bt2='<button class="waves-red modal-close '+bt_classes+'">إلغاء</button>'; 
                $("#confirm_modal .modal-content").html(content);
                $("#confirm_modal .modal-footer").html(bt1+bt2);
                $("#confirm_modal").openModal();
            }
            else if(type=="move"){
                $("#add_new_dep_modal").openModal();
                $("#add_new_dep_modal .modal-content").append("<div id='centered_loader_div'>"+my_preloader("colorfull","")+"</div>");
                $.post("../php classes/cmd.php",
                {
                    type : "department",
                    sub_type :"get",
                    id : 0,
                    style : "add",
                    extra : " and id <>"+id
                    
                },function(data,statue){
                    destroy_tooltip(".dep_position_bt");
                    $("#add_new_dep_modal .modal-content").html("<h4>إختر المكان الجديد لهذا القسم</h4>"+data);
                    $("#add_new_dep_modal .waves-green").attr("onclick","move_dep_location("+id+")");
                    add_dep_ready();
                });
            }
            else if(type=="visibility"){
                var val=$(this).text();
                var content="";
                if(val=="visibility")
                    content="هل أنت متأكد من جعل هذا القسم غير مرئي للمستخدم";
                else
                    content="هل أنت متأكد من جعل هذا القسم مرئي للمستخدم";
                $("#final_confirm_modal .modal-content").html("<h4>"+content+"</h4>");
                $("#final_confirm_modal .waves-green").attr("onclick","dep_visibility("+id+",'"+val+"')");
                $("#final_confirm_modal").openModal();
            }
        });
        $(".dep_action_bt").tooltip({delay:500});
        $('.collapsible').collapsible();
        $("#final_confirm_modal waves-effect").removeAttr("disabled");
        $("#final_confirm_modal").closeModal();
        $("#confirm_modal").closeModal();
        $("#centered_loader_div").remove();
        $("#add_new_dep_modal").closeModal();
        $("#add_new_dep_modal .waves-green").attr("onclick","dep_choose_master()");
    }

// ========================================= DELETE DEPARTMENT FUNCTIONS ===============================================

// confirm delete department and all sub childrens
    function final_confirm(type,id){
        if(type=="delete_all"){
            var msg="هل أنت متأكد من هذا القرار ؟";
            $("#final_confirm_modal .modal-content").html(msg);
            $("#final_confirm_modal .waves-green").attr("onclick","final_delete('all',"+id+")");
            $("#final_confirm_modal").openModal();
        }
    }
// final delete department and all sub childrens
    function final_delete(delete_type,id){
        var modal=$("#final_confirm_modal");
        modal.find(".modal-content").html(my_preloader("fullcolor",""));
        modal.find("waves-effect").attr("disabled","disabled");
        $.post("../php classes/cmd.php",
        {   type:"department",
            sub_type:"delete",
            sub: delete_type,
            style : "edit",
            id : id,
        },
        function(data, status){
            if(data!="not"){
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast("تم حذف القسم بنجاح", 4000,"my_toast");
            }
            else{
                Materialize.toast("حدث خطأ ما",4000,"my_toast");
            }
        });
    }
// Moving Children Departments To Other Department Before Deleting The Father
    function sub_to_other_dep(id){
        $("#add_new_dep_modal").openModal();
        $("#add_new_dep_modal .modal-content").append("<div id='centered_loader_div'>"+my_preloader("colorfull","")+"</div>");
        $.post("../php classes/cmd.php",
        {
            type : "department",
            sub_type : "get",
            id : 0,
            style : "add",
            extra : " and id <>"+id
            
        },function(data,statue){
            destroy_tooltip(".dep_position_bt");
            $("#add_new_dep_modal .modal-content").html("<h4>إختر المكان الجديد لأبناء القسم المراد حذفه</h4>"+data);
            $("#add_new_dep_modal .waves-green").attr("onclick","sub_to_other_dep_final("+id+")");
            add_dep_ready();
        });
    }
// Final Children To Other Department Before Deleting Father
    function sub_to_other_dep_final(id){
        if(master_id==""){
            Materialize.toast("الرجاء إختيار المكان الجديد للأقسام التي تنطوي تحت القسم الذي تريد حذفه", 4000,"my_toast");
            return;
        }
        $("#add_new_dep_modal .modal-content").append("<div id='centered_loader_div'>"+my_preloader("colorfull","")+"</div>");
        $.post("../php classes/cmd.php",
        {
             type : "department",
             sub_type : "move_delete",
             id : id,
             master_id : master_id,
             style : "edit"
                    
        },function(data,statue){
            if(data !="not"){
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast("تم حذف القسم ونقل أبناء بنجاح", 4000,"my_toast");
            }
        });

    }
// Moving Children Departments To Archive Confirm
    function sub_to_archive_confirm(id){
        $("#final_confirm_modal").openModal();
        $("#final_confirm_modal .modal-content").html("<h4>هل أنت متأكد من ذلك ؟</h4>");
        $("#final_confirm_modal .waves-green").attr("onclick","sub_to_archive_final("+id+")");
    }
// Moving All Children Departments To Archive Before Deleting The Father Department
    function sub_to_archive_final(id){
        $("#final_confirm_modal").append("<div id='centered_loader_div' style='padding-top:12%'>"+my_preloader("colorfull","")+"</div>");
        $.post("../php classes/cmd.php",
        {   type : "department",
            sub_type : "archive_delete",
            style : "edit",
            id : id
        },function(data,statue){
            if(data!="not"){
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast("تم حذف القسم بنجاح", 4000,"my_toast");
            }
        });
    }
//=============================================== END OF DELETING DEPARTMENTS ==================================================



//=============================================== DEPARTMENT EDIT NAME =========================================================
function edit_dep_name(){
        var id=dep_id;
        var name=$("#new_dep_name").val().trim();
        if(name==""){
            Materialize.toast("لا يمكنك ترك الإسم فارغا", 4000,"my_toast");
            return;
        }
        $.post("../php classes/cmd.php",
            {   type : "department",
                sub_type : "change_name",
                style : "edit",
                id: id,
                name: name
            },
            function(data, status){
            if(data!="not"){
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast("تم تغيير الإسم بنجاح", 4000,"my_toast");
            }
            else{
                Materialize.toast("حدث خطأ ما",4000,"my_toast");
            }
        });
    }
//=============================================== END OF DEPARTMENT EDIT NAME =========================================================




//=============================================== DEPARTMENT VISIBILITY EDITING ========================================================
    function dep_visibility(id,val){
        $("#final_confirm_modal .modal-content").append("<div id='centered_loader_div' style='padding-top:12%'>"+my_preloader("colorfull","")+"</div>");
        var msg="تم جعل القسم غير مرئي";
        if(val=="visibility_off"){
            val="yes";
            msg="تم جعل القسم مرئي"
        }
        else
            val="no";
        $.post("../php classes/cmd.php",
        {
             type : "department",
             sub_type :"visibility",
             id : id,
             val : val,
             style : "edit"
                    
        },function(data,statue){
            if(data !="not"){
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast(msg, 4000,"my_toast");
            }
        });
    }
//=============================================== END OF DEPARTMENT VISIBILITY EDITING ========================================================


//=============================================== DEPARTMENT EDIT LOCATION ==================================================================
    function move_dep_location(id){
        if(master_id==""){
            Materialize.toast("الرجاء إختيار مكان القسم", 4000,"my_toast");
            return;
        }
        $("#add_new_dep_modal .modal-content").append("<div id='centered_loader_div'>"+my_preloader("colorfull","")+"</div>");
        $.post("../php classes/cmd.php",
        {
            type : "department",
            sub_type : "move",
            id : id,
            style : "edit",
            master_id : master_id
            
        },function(data,statue){
            if(data !="not"){
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast("تم تعديل مكان القسم بنجاح", 4000,"my_toast");
            }
        });
    }
//=============================================== END OF DEPARTMENT EDIT LOCATION ==================================================================




//======================================================= ADD NEW DEPARTMENT FUNCTIONS ==============================================================

// initializations for adding new department
function add_dep_ready(){
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
        $('.collapsible').collapsible();
        $('.dep_position_bt').tooltip();
        master_id="";
        dep_position="";
    }

// Get All Departments And Put them in Modal
    function add_new_dep(){
        $("#add_new_dep_modal").openModal();
        
    }
// Allow user to choose A master departments for the new department
    function dep_choose_master(){
        if(master_id!=""){
            var content="<h4>إختر إسما للقسم الجديد</h4>";
            content+='<input class="general_tb" type="text" id="dep_name" placeholder="إسم القسم"/>';
            var bt_classes='modal-action waves-effect  btn-flat modal_action_bt ';
            var bt1='<button class="waves-green '+bt_classes+'" onclick="add_new_dep_final()">حفظ</button>';
            var bt2='<button class="waves-red modal-close '+bt_classes+'">إلغاء</button>';
            $("#confirm_modal .modal-content").html(content);
            $("#confirm_modal .modal-footer").html(bt1+bt2);
            $("#add_new_dep_modal").closeModal();
            $("#confirm_modal").openModal();
        }
        else{
            Materialize.toast("يجب أن تختار مكان القسم", 4000,"my_toast");
        }
    }
// The Final Step To Add New Department
    function add_new_dep_final(){
        var name=$("#dep_name").val().trim();
        if(name==""){
            Materialize.toast("! لا يمكنك إضافة قسم بدون إسم ", 4000,"my_toast");
            return;
        }
        $("#confirm_modal").append("<div id='centered_loader_div' style='padding-top:12%'>"+my_preloader("colorfull","")+"</div>")
        $.post("../php classes/cmd.php",
        {   type : "department",
            sub_type :"insert",
            name : name,
            master: master_id,
            position : dep_position,
            style : "edit"
        },
        function(data, status){
            if(data=="not_name"){
                Materialize.toast('يرجى عدم ترك الإسم فارغا', 4000,"my_toast");	
            }
            else if(data=="not_master"){
                Materialize.toast('يرجى إختيار القسم الأب', 4000,"my_toast");	
            }
            else if(data=="not"){
                Materialize.toast('حدثت مشكلة :( ', 4000,"my_toast");	
            }
            else{
                destroy_tooltip(".dep_action_bt");
                $("#dep_collaps_cont").html(data);
                departments_ready();
                Materialize.toast('تمت الإضافة بنجاح', 4000,"my_toast");
            }
        });
    }
//=================================================== END OF ADD NEW DEPARTMENT FUNCTIONS ==============================================================
function get_master_id(id){
           
     $(".dep_position_bt").each(function(){
    var x=$(this);
    x.css({"background":"","color":""});
            });
$('#select_dep'+id).css({"background":"#283747","color":"white"})
master_id=id;

}