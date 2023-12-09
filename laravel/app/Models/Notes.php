<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Notes extends Model
{
    use SoftDeletes;
    use HasFactory;
    public function notable()
    {
        return $this->morphTo();
    }

}
