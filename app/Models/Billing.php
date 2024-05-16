<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Billing extends Model
{
    use HasFactory;
    protected $fillable = [
        'billing_type', 'billing_fee', 'billing_date', 'owner_id', 'meter_reading', 'is_paid', 'paid_date', 'status', 'created_by', 'fine', 'due_date'
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function owner()
    {
        return $this->belongsTo(ApartmentOwner::class, 'owner_id');
    }
}
