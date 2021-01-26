@extends('admin.home')
@section('main')
<script src="{{asset('js/admin/department.js')}}"></script>
<div class="td_absolute_container">

<table class="general_table">
    <tr>
      <td class="sub_content_td dep_sub_content_td">
        <div id="dep_collaps_cont">
           @foreach($main_dep as $category)
	            <ul class='collapsible' data-collapsible='Accordion'>
	            <li class="active">
	            <div class="collapsible-header waves-effect" dep-name="{{$category->name}}" dep-id="{{$category->id}}" onclick="toggle_collabs(this)">

	            	{{$category->name}}
	            @if(count($category->childs))
	            <i class='material-icons left_menu_icon_right'>add</i>
	            @endif
	            </div>
	            <div class="collapsible-body" >
	                @if(count($category->childs))
	                @include('admin.catTree',['childs' => $category->childs,'type'=>'show'])
	                @endif
	            </div>
	            </li>
	            </ul>
	        @endforeach


				
            </div>
        </td>
        <td  class="sub_right_actions_td">
            <i class='material-icons waves-effect sub_td_right_icons' onclick="add_new_dep()" data-position='left' data-tooltip='أضف قسم جديد'>add</i>
        </td>
    </tr>
</table>
</div>

<div id="confirm_modal" class="modal modal-fixed-footer" >
    <div class="modal-content">
    </div>
    <div class="modal-footer">
    </div>
</div>
<div id="final_confirm_modal" class="modal modal-fixed-footer" >
    <div class="modal-content">
    </div>
    <div class="modal-footer">
        <button class="modal-action waves-effect waves-green btn-flat modal_action_bt" onclick="" >نعم</button>
	    <button class="modal-action modal-close waves-effect waves-red   btn-flat modal_action_bt">لا</button>
    </div>
</div>
<div id="add_new_dep_modal" class="modal modal-fixed-footer" >
    <div class="modal-content">
    	 @foreach($main_dep as $category)
	            <ul class='collapsible' data-collapsible='Accordion'>
	            <li class="active">
	            <div class="collapsible-header waves-effect" dep-name="{{$category->name}}" dep-id="{{$category->id}}" onclick="toggle_collabs(this)">
	            	<div onclick="" class="menu_action_div" >
	            		<i  data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="أضف هنا" dep-position="here" data-tooltip-id="2504989d-526e-f663-2b3c-8896f94f3c8d">adjust</i></div>
	            	{{$category->name}}
	            @if(count($category->childs))
	            <i class='material-icons left_menu_icon_right'>add</i>
	            @endif
	            </div>
	            <div class="collapsible-body" >
	                @if(count($category->childs))
	                @include('admin.catTree',['childs' => $category->childs,'type'=>'add'])
	                @endif
	            </div>
	            </li>
	            </ul>
	        @endforeach

    </div>
    <div class="modal-footer">
        <button class="modal-action waves-effect waves-green btn-flat modal_action_bt" onclick="dep_choose_master()" >موافق</button>
	    <button class="modal-action modal-close waves-effect waves-red   btn-flat modal_action_bt">إلغاء</button>
    </div>
</div>
<script type="text/javascript">

</script>

@endsection



