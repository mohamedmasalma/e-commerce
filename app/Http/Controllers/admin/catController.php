<?php

namespace App\Http\Controllers\admin;
use App\department;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class catController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id = null)
    {
        if(is_null($id)){$id=0;}
        $d=new department;
      
        $main_dep=$d->where('parent_id',$id)->get();
      
        $dep=$d->orderBy('sort_num', 'inc')->get();
    
      return view('admin/cat',compact('main_dep','dep'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($id = null)
    {

       
       
   $z=$this->department_json(0);
   $json = json_decode($z, true);
  
      return ($z);
   
    }
    public function department_json($id){
        $d=new department;
        $all_departments_json='';
      
        $main_dep=$d->where('parent_id',$id)->get();

        foreach ($main_dep as $key => $dep) {
        $all_departments_json.=
        'department:{"id":'.$dep->id.',"name":"'.$dep->name.'","sort_num":'.$dep->sort_num.',"parent_id":'.$dep->parent_id.',"childs":['.$this->department_json($dep->id).']},';

     }
     $json=rtrim($all_departments_json,','); 
     return($json) ;
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $d->name= $request->name;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
