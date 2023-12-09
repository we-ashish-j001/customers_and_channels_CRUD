<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Channel extends Model
{
    use SoftDeletes;
    use HasFactory;
    protected $fillable = [
        'name',
        'customer_name',
        'primary_locale',
        'currency',
        'store_url',
        'api_type',
        'api_data',
        'isActive'
    ];

    public function notes(){
        return $this->morphMany(Notes::class, 'notable');
    }
}
