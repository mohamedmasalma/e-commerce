<html>
	<head>
		<title>ADMIN PANEL</title>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css" rel="stylesheet"/>
		<link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet"/>
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">
		<link href="https://fonts.googleapis.com/css?family=Muli:400,300" rel="stylesheet" type="text/css">
		<link href="{{asset('css/admin/style.css')}}" rel="stylesheet"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<meta charset="UTF-8"/>
		<script src="http://code.jquery.com/jquery-latest.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.6/js/materialize.min.js"></script>


	</head>
	<body>
		<table class="main_table">
			<tr>
				<td>
					<div class="logo">
						<img src="../global imgs/hasan.png"/>
					</div>
				</td>
				<td class="top_bar">
					<div id="top_bar_header">Categories</div>
				</td>
			</tr>
			<tr>
				<td class="nav_bar">
					<ul class="nav">
						<li class="active ">
							<a class="waves-effect">
								<i class="material-icons">dns</i>
								<p>Categories</p>
							</a>
						</li>
						<li >
							<a class="waves-effect">
								<i class="material-icons">assignment</i>
								<p>Products</p>
							</a>
						</li>
						<li >
							<a class="waves-effect">
								<i class="material-icons">people</i>
								<p>Suppliers</p>
							</a>
						</li>
						<li >
							<a class="waves-effect">
								<i class="material-icons">people</i>
								<p>Employees</p>
							</a>
						</li>
						<li >
							<a class="waves-effect">
								<i class="material-icons">local_shipping</i>
								<p>Shipments</p>
							</a>
						</li>
					</ul>
				</td>
				<td class="main_td">
					<table class="main_table">
						<tr>
							<td class="sub_content_td dep_sub_content_td">
								<div id="dep_collaps_cont">
									<ul class="collapsible" data-collapsible="Accordion">
										<li>
											<div class="collapsible-header waves-effect" dep-name="Archive" dep-id="-1">
												Archive
											</div>
											<div class="collapsible-body">
											</div>
										</li>
										<li> 
											<div class="collapsible-header waves-effect" dep-name="Main Menu" dep-id="1" onclick="toggle_collabs(this)">
												Main Menu
												<i class="material-icons left_menu_icon_right">add</i>
											</div>
											<div class="collapsible-body">
												<ul class="collapsible" data-collapsible="Accordion">
													<li>
														<div class="collapsible-header waves-effect active" dep-name="Foods" dep-id="150">
															<div class="menu_action_div">
																<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="Delete This Category" dep-type="delete" >delete</i>
																<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="Move This Category To Another Place" dep-type="move" >low_priority</i>
																<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="Edit This Category" dep-type="edit" >edit</i>
																<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_action_bt" data-tooltip="Customers Can See This Category" dep-type="visibility">visibility</i>
															</div>
															Foods
														</div>
														<div class="collapsible-body" ></div>
													</li>
												</ul>
											</div>
										</li>
									</ul>
								</div>
							</td>
							<td class="action_bar">
								<i class="material-icons waves-effect action_bar_i" onclick="add_new_dep()" data-position="left" data-tooltip="Add New Category">add</i>
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
		<div id="add_new_dep_modal" class="modal modal-fixed-footer">
			<div class="modal-content">
				<h4>Choose Department Parent</h4>
				<ul class="collapsible">
					<li>
						<div class="collapsible-header waves-effect">
							<div class="menu_action_div">
								<i class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="Add Here" dep-position="here">adjust</i>
							</div>
							Archive
						</div>
						<div class="collapsible-body">					
						</div>
					</li>
					<li>
						<div class="collapsible-header waves-effect" onclick="toggle_collabs(this)">
							<div class="menu_action_div">
								<i class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="Add Here" dep-position="here">adjust</i>
							</div>
							Main Menu
							<i class="material-icons left_menu_icon_right">add</i>
						</div>
						<div class="collapsible-body">
							<ul class="collapsible">
								<li>
									<div class="collapsible-header waves-effect">
										<div class="menu_action_div">
											<i class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="Add Here" dep-position="here">adjust</i>
											<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="Add After This" dep-position="after">arrow_downward</i>
											<i data-position="bottom" class="material-icons  waves-effect waves-circle menu_action_icons dep_position_bt" data-tooltip="Add Before This" dep-position="after">arrow_upward</i>
										</div>
									  Foods
									</div>
									<div class="collapsible-body">					
									</div>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<div class="modal-footer">
				<button class="modal-action waves-effect waves-green btn-flat modal_action_bt" onclick="dep_choose_master()">Choose</button>
				<button class="modal-action modal-close waves-effect waves-red   btn-flat modal_action_bt">Cancel</button>
			</div>
		</div>
		<div id="confirm_modal" class="modal " >
			<div class="modal-content">
			</div>
			<div class="modal-footer">
			</div>
		</div>
		<div id="final_confirm_modal" class="modal" >
			<div class="modal-content">
			</div>
			<div class="modal-footer">
				<button class="modal-action waves-effect waves-green btn-flat modal_action_bt" onclick="" >Yes</button>
				<button class="modal-action modal-close waves-effect waves-red   btn-flat modal_action_bt">No</button>
			</div>
		</div>
	<script src="{{asset('js/admin/js.js')}}"></script>
	</body>
</html>