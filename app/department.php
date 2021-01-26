<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class department extends Model
{
        public function childs() {
        return $this->hasMany('App\department','parent_id','id') ;
    }
}
