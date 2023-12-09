<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Customer;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Mockery\Matcher\Not;

class NotesController extends Controller
{
    public function addCustomerNotes(string $id ,Request $request){
        $customer  = Customer::find($id);


        $notes = new Notes();
        $notes->body = $request->body;

        $customer->notes()->save($notes);

        return response("Added Notes");

    }
    public function getCustomerNotes(string $id ){
        $customer  = Customer::find($id);
        $notes  = $customer->notes()->get();

        return response()->json($notes);

    }
    public function addChannelNotes(string $id ,Request $request){
        $channel  = Channel::find($id);


        $notes = new Notes();
        $notes->body = $request->body;

        $channel->notes()->save($notes);

        return response("Added Notes");

    }
    public function getChannelNotes(string $id ){
        $channel  = Channel::find($id);
        $notes  = $channel->notes()->get();

        return response()->json($notes);

    }

    public function deleteChannelNotes(string $id ){
        $notes  = Notes::withTrashed()->find($id);
        $notes->forceDelete();
        return response('Note Deleted');

    }
    public function deleteCustomerNotes(string $id ){
        $notes  = Notes::withTrashed()->find($id);
        $notes->forceDelete();
        return response('Note Deleted');

    }

}
