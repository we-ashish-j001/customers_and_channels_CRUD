<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Customer;
use App\Models\Notes;
use http\Env\Response;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $order= $request->input('sort');
        $active = $request->input('active');
        $trashed = $request->input('trashed');
        $customer_name = $request->input('customer_name');
        $customer_id= $request->input('id');


        $channels_query = Channel::query();

        if ($active ==='0' || $active === '1') {
            $channels_query = $channels_query->where('is_active', $active);
        }

        if ($trashed === 'only') {
            $channels_query =  $channels_query->onlyTrashed();
        } elseif ($trashed === 'with') {
            $channels_query =  $channels_query->withTrashed();
        }

        if ($order === 'asc' || $order === 'desc') {
            $channels_query = $channels_query->orderBy('updated_at', $order);
        }

        if ($customer_name) {
            $channels_query = $channels_query->WhereIn('customer_name', $customer_name);
        }
        if ($customer_id) {
            $channels_query = $channels_query->where('customer_id', $customer_id);
        }

        $channels_all =  $channels_query->get();
        $channels =  $channels_query->latest()->paginate(4);
        return response()->json(['channels_by_page'=>$channels,'channels_all'=>$channels_all,'filter_count'=>count($request->input())-1]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = Validator::make($request->all(), [
            'name'=>'required|unique:channels|max:30',
            'customer_name'=>'required',
            'primary_locale'=>'required',
            'currency'=>'required|max:30',
            'store_url'=>'required',
            'api_type'=>'required',

        ])->validateWithBag('add');
        if($validated){
            $channel = new Channel();
            $customer = Customer::where('name',$request->customer_name)->get();
            $channel->customer_id = $customer->first()->id;
            $channel->name = $request->name;
            $channel->customer_name= $request->customer_name;
            $channel->primary_locale= $request->primary_locale;
            $channel->currency= $request->currency;
            $channel->store_url= $request->store_url;
            $channel->api_type= $request->api_type;


            $channel->api_data = $request->api_data;
            $channel->is_active= $request->is_active;

            $channel->save();
        }else{
            return response($request->api_data);
        }
        return response("Added");


    }

    /**
     * Display the specified resource.
     */
    public function show(Channel $channel)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Channel $channel)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = Validator::make($request->all(), [
            'name'=>'required|max:30|unique:channels,name,'.$id,
            'customer_name'=>'required',
            'primary_locale'=>'required',
            'currency'=>'required',
            'store_url'=>'required',
            'api_type'=>'required',
            'api_data'=>'required',

        ])->validateWithBag('update');
        if($validated) {
            $channel = Channel::find($id);
            $customer = Customer::where('name',$request->customer_name)->get();
            $channel->customer_id = $customer->first()->id;
            $channel->name = $request->name;
            $channel->customer_name = $request->customer_name;
            $channel->primary_locale = $request->primary_locale;
            $channel->currency = $request->currency;
            $channel->api_type = $request->api_type;
            $channel->api_data = $request->api_data;
            $channel->store_url = $request->store_url;
            $channel->is_active = $request->is_active;
            $channel->update();
        }else{
            return response($validated);
        }
        return response('updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $channel  = Channel::find($id);
        if(!$channel){
            $channel = Channel::onlyTrashed()->find($id);
        }
        $channel->forceDelete();
        return response('deleted');
    }

    public function getItem(string $id)
    {
        $channel  = Channel::find($id);
        return response()->json($channel);
    }


    public function destroyBulk(Request $request){
        $ids = $request->input('ids');

        Channel::withTrashed()->WhereIn('id',$ids)->forceDelete();

    }
    public function activateBulk(Request $request){
        $ids = $request->input('ids');
        Channel::withTrashed()->WhereIn('id',$ids)->update(['is_active'=>1]);

    }
    public function deactivateBulk(Request $request){
        $ids = $request->input('ids');
        Channel::withTrashed()->WhereIn('id',$ids)->update(['is_active'=>0]);

    }
    public function trashBulk(Request $request){
        $ids = $request->input('ids');
        Channel::withTrashed()->WhereIn('id',$ids)->delete();
    }

    public function bulkRestore(Request $request){
        $ids = $request->input('ids');
        Channel::onlyTrashed()->WhereIn('id',$ids)->restore();


    }
    public function toggleIsActivate(Request $request,String $id){
        $channel = Channel::find($id);
        $channel->is_active = $request->input('is_active');
        $channel->update();
        return response('updated');
    }
    public function trash(String $id){

        Channel::where('id',$id)->delete();

    }


}
