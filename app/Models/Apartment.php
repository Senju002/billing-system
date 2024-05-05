<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $fillable = ['name', 'address', 'created_by'];

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // public function users()
    // {
    //     return $this->hasMany(User::class);
    // }

    use HasFactory;
}
