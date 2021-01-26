@if($type=='show')
@foreach($childs as $child)
<ul class='collapsible' data-collapsible='Accordion'>
<li>
 <div class="collapsible-header waves-effect" dep-name="{{$child->name}}" dep-id="{{$child->id}}" onclick="toggle_collabs(this)">
 	<div class="menu_action_div">
 		<i class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="إحذف هذا القسم" dep-type="delete">delete</i>
 		<i  class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="إنقل هذا القسم لمكان آخر" dep-type="move" >low_priority</i>
 		<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="تعديل الإسم" dep-type="edit" >edit</i> 
 		<i  class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="يمكن للمستخدم رؤية هذا القسم" dep-type="visibility" >visibility</i>
 	</div>

 		{{$child->name}}
 @if(count($child->childs))
<i class='material-icons left_menu_icon_right'>add</i>
 @endif
 	</div><div class="collapsible-body">
	    
	@if(count($child->childs))
            @include('admin/catTree',['childs' => $child->childs,'type'=>'show'])
        @endif
</div></li>
</ul>
@endforeach
@else
@foreach($childs as $child)
<ul class='collapsible' data-collapsible='Accordion'>
<li>
 <div class="collapsible-header waves-effect" dep-name="{{$child->name}}" dep-id="{{$child->id}}" onclick="toggle_collabs(this)">
 <div class="menu_action_div">
 	<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="أضف هنا" dep-position="here" data-tooltip-id="aad44af4-7dba-b07c-00b3-a79b20130f3e">adjust</i><i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="أضف بعد هذا القسم" dep-position="after" data-tooltip-id="1e140046-72e1-3aab-a744-168a1345da6d">arrow_downward</i><i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="أضف قبل هذا القسم" dep-position="before" data-tooltip-id="a5c4d898-57e0-e7e9-b235-b0392406d5dd">arrow_upward</i> 
 </div>

 		{{$child->name}}
 @if(count($child->childs))
<i class='material-icons left_menu_icon_right'>add</i>
 @endif
 	</div><div class="collapsible-body">
	    
	@if(count($child->childs))
            @include('admin/catTree',['childs' => $child->childs,'type'=>'add'])
        @endif
    </div></li></ul>
@endforeach
@endif