import { defineStore } from 'pinia'
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import {format} from "timeago.js";
import {useChannelStore} from "./ChannelStore";
import {useNoteStore} from "./NoteStore";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
const $toast = useToast();
export const useCustomerStore = defineStore('CustomerStore',  {
 state: () =>(
     {
         loading: false,
         sidebar : false,
         bulk_operation:'',
         bulk_all_operation:'',
         customer_selected : [],
         select_page_customers : false,
         pagination : [],
         customers : [],
         customers_by_page : [],
         form_data : {
             name : '',
             country : '',
             is_active : true,
             customer_id : null,
             countries : null,
             created_at : '',
             updated_at : '',
             errors : '',
             head_check : false,
             child_check : [],
         },
         filter_data : {
             count: 0,
             country: [],
             sort_by: null,
             is_active_filter: null,
             trashed : null
         }
     }
            ),
    getters : {
     formatDate(){
         this.created_at = format(Date.now() - this.created_at);
     },
    },
    actions: {
        async addCustomer(customer) {
            this.form_data.errors = '';
            this.loading = true;
            await axios.post('customer/add', customer)
                .then((response) => {
                    this.getCustomer();

                    $toast.success('Added');
                    this.resetState();
                    this.loading = false;
                })
                .catch((error) => {
                    this.form_data.errors = error.response.data.errors;
                    this.showErrors(error.response.data.errors);
                    this.loading = false;
                });
        },
        trashCustomer(id) {
            this.loading = true;
                    axios.delete('customer/trash/' + id)
                        .then((response) => {
                            useCustomerStore().getCustomer();
                            $toast.success('trashed');
                            this.loading = false;

                        })
                        .catch((error) => {
                            this.showErrors(error);
                            this.loading = false;

                        });


        },

        updateCustomer(id, customers_data) {
            this.loading = true;
            this.form_data.errors = '';
            const customer = this.customers.find(t => t.id.toString() === id);
            axios.patch('customer/update/' + id, customers_data)
                .then((response) =>{
                    this.getCustomer();
                    $toast.success('updated');
                    this.loading = false;
                })
                .catch((error) => {
                    this.form_data.errors = error.response.data.errors;
                    this.showErrors(error.response.data.errors);
                    this.loading = false;
                });

        },

        getCustomer(page = 1) {
            this.loading = true;
            axios.get(`customer?page=${page}`,{
                params: {
                    sort: this.filter_data.sort_by,
                    active: this.filter_data.is_active_filter,
                    trashed: this.filter_data.trashed,
                    country: this.filter_data.country
                },
            })
                .then((response) => {
                    this.customers = response.data.customers_all;
                    this.customers.created_at = format(this.customers.created_at);

                    this.customers_by_page = response.data.customers_by_page.data;
                    this.customers_by_page.forEach(customer => {
                        customer.created_at = format(customer.created_at);
                    });
                    this.pagination = response.data.customers_by_page;
                    this.filter_data.count = response.data.filter_count;
                    this.loading = false;

                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;

                });


        },

        handleAdd() {
                    const add_data = this.form_data;
                    this.addCustomer(add_data)

        },
         handleUpdate(id){
             const update_data = this.form_data;
                this.updateCustomer(id,update_data)

        },
        getCountries(){
            this.loading = true;
            axios.get('https://restcountries.com/v3.1/all')
                    .then(res=>{
                        this.form_data.countries = res.data;
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loading = false;

                    });
        },
        getCustomerData(id){
            this.loading = true;
            axios.get('customer/update/' + id)
                .then(res=> {
                    this.form_data = res.data;
                    this.getCountries();
                    this.form_data.is_active = res.data.is_active===1;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });
        },
        getCustomerName(id){
            this.loading = true;
            axios.get('customer/add/' + id)
                .then(res=> {
                    useChannelStore().resetState();
                    useChannelStore().form_data.customer_name= res.data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });
        },
        addNotes(id){
            this.loading = true;
            axios.post('customer/notes/add/' + id,{
                body: useNoteStore().body
            })
                .then(res=> {
                    useNoteStore().body = res.data.body;
                    useNoteStore().notes.push(res.data);
                    $toast.success('note added');
                    this.getNotes(id);
                    this.loading = false;

                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
        },
        getNotes(id) {
            this.loading = true;
            axios.get('customer/notes/' + id)
                .then((response) => {
                    useNoteStore().notes = response.data;
                    this.loading = false;

                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });

        },
        deleteNotes(id,customer_id) {
            this.loading = true;
            axios.delete('customer/notes/delete/' + id)
                .then((response) => {
                    this.getNotes(customer_id);
                    $toast.success('Note Deleted');
                    this.loading = false;

                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });

        },
        resetState(){
                console.log('reset state called')
                this.form_data.name = ''
                this.form_data.country = ''
                this.form_data.is_active = true
                this.form_data.created_at = ''
                this.form_data.updated_at = ''
                this.form_data.errors = ''
        },
        toggleSelection(id){
            console.log('customer id => '+ id);
        },
        resetFilter() {
            this.filter_data.country = []
            this.filter_data.sort_by = null
            this.filter_data.is_active_filter = null
            this.filter_data.trashed = null
            this.filter_data.count = 0
        },
       async bulkDelete(arr){
           this.loading = true;
                await axios.delete('customer/delete/', {
                    data: {
                        ids: arr
                    }
                })
                    .then((response) => {
                        useCustomerStore().getCustomer();
                        useCustomerStore().customer_selected = [];
                        if(arr.length>1){
                                $toast.success(arr.length + ' customers deleted');
                            }
                            else{
                                $toast.success(arr.length + ' customer deleted');
                        }
                        this.select_page_customers = false;
                        this.customer_selected = [];
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loading = false;
                    });
        },
        async bulkTrash(arr){
            this.loading = true;
                await axios.delete('customer/trash/', {
                    data: {
                        ids: arr
                    }
                })
                    .then((response) => {
                        useCustomerStore().getCustomer();
                        useCustomerStore().customer_selected = [];
                        if(arr.length>1){
                            $toast.success(arr.length + ' customers trashed');
                        }
                        else{
                            $toast.success(arr.length + ' customer trashed');
                        }
                        this.select_page_customers = false;
                        this.customer_selected = [];
                        this.loading = false;
                    })
                    .catch((error) => {
                        $toast.error(error);
                        this.loading = false;
                    });


        },
        async bulkRestore(arr){
            this.loading = true;
            await axios.post('customer/restore/', {

                    ids: arr

            })
                .then((response) => {
                    useCustomerStore().getCustomer();
                    if(arr.length>1){
                        $toast.success(arr.length + ' customers restored');
                    }
                    else{
                        $toast.success(arr.length + ' customer restored');
                    }
                    this.select_page_customers = false;
                    this.customer_selected = [];
                    this.loading = false;

                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;

                });
        },
        async bulkActivate(arr){
            this.loading = true;
            await axios.put('customer/update/activate', {
                    ids: arr
            })
                .then((response) => {
                    useCustomerStore().getCustomer();
                    if(arr.length>1){
                        $toast.success(arr.length + ' customers activated');
                    }
                    else{
                        $toast.success(arr.length + ' customer activated');
                    }
                    this.select_page_customers = false;
                    this.customer_selected = [];
                    this.loading = false;
                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
        },
        async bulkDeactivate(arr){
            this.loading = true;
            await axios.put('customer/update/deactivate', {
                ids: arr
            })
                .then((response) => {
                    useCustomerStore().getCustomer();
                    if(arr.length>1){
                        $toast.success(arr.length + ' customers deactivated');
                    }
                    else{
                        $toast.success(arr.length + ' customer deactivated');
                    }
                    this.select_page_customers = false;
                    this.customer_selected = [];
                    this.loading = false;

                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;

                });
        },
        handleBulk(){
            if(this.customer_selected.length > 0){
                if(this.bulk_operation === 'Delete'){
                    this.bulkDelete(this.customer_selected);
                    }
                else if(this.bulk_operation === 'Activate'){
                    this.bulkActivate(this.customer_selected);
                }
                else if(this.bulk_operation === 'Deactivate'){
                    this.bulkDeactivate(this.customer_selected);
                }
                else if(this.bulk_operation === 'Trash'){
                    this.bulkTrash(this.customer_selected);
                }
                else if(this.bulk_operation === 'Restore'){
                    this.bulkRestore(this.customer_selected);
                }
            }else{
                $toast.error('No Customer Selected')
            }


        },
        handleBulkAll(){
            const customer_selected_all = this.customers.map((item)=>{
                return item.id;
            })
            console.log(customer_selected_all);
            if(this.bulk_all_operation === 'Delete All'){
                this.bulkDelete(customer_selected_all);
            }
            else if(this.bulk_all_operation === 'Activate All'){
                this.bulkActivate(customer_selected_all);
            }
            else if(this.bulk_all_operation === 'Deactivate All'){
                this.bulkDeactivate(customer_selected_all);
            }
            else if(this.bulk_all_operation === 'Trash All'){
                this.bulkTrash(customer_selected_all);
            }
            else if(this.bulk_all_operation === 'Restore All'){
                this.bulkRestore(customer_selected_all);
            }
        },
        handleSelect(){
            if(this.select_page_customers){
                this.customer_selected =  this.customers_by_page.map((item)=>{
                    return item.id;
                })
            }else{
                this.customer_selected =  [];
            }
        },
        showErrors(error){
            if(error.name){
                $toast.error(error.name);
            }
            if(error.country){
                $toast.error(error.country);
            }
        },
        toggleIsActive(id,active){
            this.loading = true;
            axios.patch('customer/update/active/'+ id,{
                is_active: active
            })
                .then((response)=>{
                    this.getCustomer();
                    this.loading = false;
                })
        }

    },

})
