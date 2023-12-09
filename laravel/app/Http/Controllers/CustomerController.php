<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Customer;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use function Symfony\Component\Console\Completion\__toString;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $order=$request->input('sort');
        $active = $request->input('active');
        $trashed = $request->input('trashed');
        $country = $request->input('country');


        $customers_query = Customer::with('channels');

        if ( $active === '0' || $active === '1' ) {
            $customers_query = $customers_query->where('is_active', $active);
        }


        if ($trashed === 'only') {
            $customers_query =  $customers_query->onlyTrashed();
        } elseif ($trashed === 'with') {
            $customers_query =  $customers_query->withTrashed();
        }

        if ($order === 'asc' || $order === 'desc') {
            $customers_query = $customers_query->orderBy('updated_at', $order);
        }
        if ($country) {
            $customers_query = $customers_query->WhereIn('country', $country);
        }

        $customers_all = $customers_query->get();
        $customers = $customers_query->latest()->paginate(4);


        return response()->json(['customers_by_page'=>$customers,'customers_all'=>$customers_all,'filter_count'=>count($request->input())-1]);

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
            'name'=>'required|unique:customers|max:30',
            'country'=>'required'

        ])->validateWithBag('add');
        if($validated) {
            $customer = new Customer();
            $customer->name = $request->name;
            $customer->country = $request->country;
            $customer->is_active = $request->is_active;

            $customer->save();
        }else{
            return response($validated);

        }
        return response("Added");


    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = Validator::make($request->all(), [
            'name'=>'required|max:30|unique:customers,name,'.$id,
            'country'=>'required'

        ])->validateWithBag('update');
        if($validated){
            $customer = Customer::find($id);
            Channel::withTrashed()->where('customer_id',$id)
                ->update(['customer_name'=>$request->input('name')]);
            $customer->name = $request->input('name');
            $customer->country = $request->input('country');
            $customer->is_active = $request->input('is_active');
            $customer->update();
        }else{
            return response($validated);
        }
        return response("Updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {



        $customer  = Customer::find($id);
        if(!$customer){
            $customer = Customer::onlyTrashed()->find($id);
        }
            $customer_channel=$customer->channels();
            if ($customer_channel)
            {
                $customer->channels()->forceDelete();

            }
            $customer_notes=$customer->notes();

            if ($customer_notes)
            {
                $customer->notes()->forceDelete();

            }
        $customer->forceDelete();
        return response('deleted');
    }

    public function getItem(string $id)
    {
        $customer  = Customer::find($id);

        return response()->json($customer);
    }
    public function getCustomerName(string $id)
    {
        $customer  = Customer::find($id);

            return response()->json($customer->name);

    }

    public function destroyBulk(Request $request){
        $ids = $request->input('ids');
        Customer::withTrashed()->whereIn('id',$ids)->forceDelete();
        Channel::withTrashed()->whereIn('customer_id',$ids)->forceDelete();
        Notes::withTrashed()->whereIn('notable_id',$ids,'and')
            ->where('notable_type','App\Models\Customer')->forceDelete();

    }
    public function activateBulk(Request $request){
        $ids = $request->input('ids');
        Customer::WhereIn('id',$ids)->update(['is_active'=>1]);
    }
    public function deactivateBulk(Request $request){
        $ids = $request->input('ids');
        Customer::WhereIn('id',$ids)->update(['is_active'=>0]);
    }
    public function trashBulk(Request $request){
        $ids = $request->input('ids');
        Customer::WhereIn('id',$ids)->delete();
        Channel::WhereIn('customer_id',$ids)->delete();
        Notes::withTrashed()->whereIn('notable_id',$ids,'and')
            ->where('notable_type','App\Models\Customer')->delete();
    }
    public function bulkRestore(Request $request){
        $ids = $request->input('ids');
        Customer::onlyTrashed()->WhereIn('id',$ids)->restore();
        Channel::onlyTrashed()->WhereIn('customer_id',$ids)->restore();
        Notes::onlyTrashed()->whereIn('notable_id',$ids,'and')
            ->where('notable_type','App\Models\Customer')->restore();
    }
    public function toggleIsActivate(Request $request,String $id){
        $customer = Customer::find($id);
        $customer->is_active = $request->input('is_active');
        $customer->update();
        return response('updated');
    }
    public function trash(String $id){

        Customer::where('id',$id)->delete();
        Channel::where('customer_id',$id)->delete();

    }


}
