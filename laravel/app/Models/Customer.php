<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'name',
        'country',
        'isActive'
    ];

    public function channels(){
        return $this->hasMany(Channel::class,'customer_id','id');
    }
    public function notes(){
        return $this->morphMany(Notes::class, 'notable');
    }
}
