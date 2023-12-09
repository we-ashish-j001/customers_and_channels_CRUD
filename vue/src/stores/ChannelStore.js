import { defineStore } from 'pinia'
import axios from "axios";
import {useNoteStore} from "./NoteStore";
import {useCustomerStore} from "./CustomerStore";
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import {useRoute} from "vue-router";
const $toast = useToast();

export const useChannelStore = defineStore('ChannelStore', {
   state: () => ({
       loading:false,
        sidebar : false,
        bulk_operation:'',
        bulk_all_operation:'',
        channel_selected : [],
        select_page_channel : false,
        channels : [],
        channels_by_page : [],
        form_data : {
            name : '',
            customer_name : '',
            primary_locale : '',
            currency : '',
            store_url : '',
            api_type :'',
            is_active : true,
            api_url : '',
            api_token : '',
            api_key : '',
            api_secret : '',
            channel_id : null,
            created_at : '',
            updated_at : '',
            errors: '',
            api_data: []
        },
       filter_data : {
            count: 0,
           customer_name : [],
           sort_by: null,
           is_active_filter: null,
           trashed : null
       }


   }),

    actions: {
            addChannel(channel,id) {
                this.loading = true;
                this.form_data.errors = '';
                axios.post('channel/add',channel)
                    .then((response)=>{
                        if(id){
                           this.getCustomerChannels(id);
                        }else{
                            this.getChannel();
                        }
                        $toast.success('Channel Added');
                        this.resetState();
                        this.loading = false;

                    })
                    .catch((error) => {
                        this.form_data.errors = error.response.data.errors;
                        this.showErrors(error.response.data.errors);
                        this.loading = false;
                    });
            },
            trashChannel(id) {
                this.loading = true;
                        axios.delete('channel/trash/' + id)
                            .then((response) => {
                                useChannelStore().getChannel();
                                $toast.success('Channel Trashed');
                                this.loading = false;
                            })
                            .catch((error) => {
                                $toast.error(error);
                                this.loading = false;
                            });

            },
            updateChannel(id,channels_data) {
                this.loading = true;
                this.form_data.errors = '';
                const channel  = this.channels.find(t=> t.id.toString() === id);
                axios.patch('channel/update/'+id, channels_data)
                    .then((response)=> {
                        this.getChannel();
                        $toast.success('Channel Updated');
                        this.loading = false;
                    })
                    .catch((error) => {
                        this.form_data.errors = error.response.data.errors;
                        this.showErrors(error.response.data.errors);
                        this.loading = false;
                    });

            },
            getChannel(page=1){
                this.loading = true;
                axios.get(`channel?page=${page}`,{
                    params: {
                        sort: this.filter_data.sort_by,
                        active: this.filter_data.is_active_filter,
                        trashed: this.filter_data.trashed,
                        customer_name: this.filter_data.customer_name
                    },
                })
                    .then((response)=>{
                        this.channels = response.data.channels_all;
                        this.channels_by_page = response.data.channels_by_page;
                        this.filter_data.count = response.data.filter_count;
                        this.loading = false;

                    })
                    .catch((error) => {
                        console.log(error);
                        this.loading = false;
                    });
            },
            getCustomerChannels(id,page=1){
                this.loading = true;
                axios.get(`channel?page=${page}`,{
                    params: {
                        sort: this.filter_data.sort_by,
                        active: this.filter_data.is_active_filter,
                        trashed: this.filter_data.trashed,
                        customer_name: this.filter_data.customer_name,
                        id: id
                    },
                })
                    .then((response)=>{
                        this.channels = response.data.channels_all;
                        this.channels_by_page = response.data.channels_by_page;
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loading = false;
                    });
            },

            handleAdd(id){
                this.handleApiData();

             const add_data = this.form_data;
                 this.addChannel(add_data,id);


            },

            handleUpdate(id){
                this.handleApiData();

             const update_data = this.form_data;
                this.updateChannel(id,update_data
                )


            },
            getChannelData(id){
                this.loading = true;
            axios.get('channel/update/' + id)
                .then(res=> {
                    this.form_data = res.data;
                    this.form_data.errors = '';
                    this.form_data.is_active = res.data.is_active===1;
                    this.storeApiData(res.data.api_data);
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });

            },
             addNotes(id){
                 this.loading = true;
                axios.post('channel/notes/add/' + id,{
                body: useNoteStore().body
                })
                .then(res=> {
                    useNoteStore().body = res.data.body;
                    this.getNotes(id);
                    $toast.success('Note Added');
                    this.loading = false;
                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
            },
            getNotes(id) {
                this.loading = true;
            axios.get('channel/notes/' + id)
                .then((response) => {
                    useNoteStore().notes = response.data;
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                });

            },
            deleteNotes(id,channel_id) {
                this.loading = true;
                axios.delete('channel/notes/delete/' + id)
                    .then((response) => {
                        this.getNotes(channel_id);
                        $toast.success('Note Deleted');
                        this.loading = false;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.loading = false;
                    });

            },
            resetState(){
                console.log('reset state called');
                this.form_data.name = ''
                this.form_data.customer_name = ''
                this.form_data.primary_locale = ''
                this.form_data.currency = ''
                this.form_data.store_url =''
                this.form_data.api_type =''
                this.form_data.is_active = true
                this.form_data.api_url = ''
                this.form_data.api_token = ''
                this.form_data.api_key = ''
                this.form_data.api_secret = ''
                this.form_data.created_at = ''
                this.form_data.updated_at = ''
                this.form_data.api_data=[]
                this.form_data.errors= ''
            },
        resetFilter() {
            this.filter_data.customer_name = []
            this.filter_data.sort_by = null
            this.filter_data.is_active_filter = null
            this.filter_data.trashed = null
        },
            storeApiData(api_data){
                this.form_data.api_data = JSON.parse(api_data);
                this.form_data.api_data.forEach((value,key)=> {
                    if (value.api_url) {
                        this.form_data.api_url = value.api_url;
                    }
                    if (value.api_token) {
                        this.form_data.api_token = value.api_token;
                    }
                    if (value.api_key) {
                        this.form_data.api_key = value.api_key;
                    }
                    if (value.api_secret) {
                        this.form_data.api_secret = value.api_secret;
                    }
                })
            },
            handleApiData(){
                this.form_data.api_data = [];
                this.form_data.api_data.push({"api_url":this.form_data.api_url});
                this.form_data.api_data.push({"api_token":this.form_data.api_token});
                if(this.form_data.api_key && this.form_data.api_key !== ''){
                    this.form_data.api_data.push({"api_key":this.form_data.api_key})
                }
                if(this.form_data.api_secret && this.form_data.api_secret !== '') {
                    this.form_data.api_data.push({"api_secret":this.form_data.api_secret})
                }
                this.form_data.api_data = JSON.stringify(this.form_data.api_data);
            },
        async bulkDelete(arr){
            this.loading = true;
            await axios.delete('channel/delete/', {
                data: {
                    ids: arr
                }
            })
                .then((response) => {
                    useChannelStore().getChannel();
                    useChannelStore().channel_selected = [];
                    if(arr.length>1){
                        $toast.success(arr.length + ' channels deleted');
                    }
                    else{
                        $toast.success(arr.length + ' channel deleted');
                    }
                    this.select_page_channel = false;
                    this.channel_selected = [];
                    this.loading = false;
                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
        },
        async bulkTrash(arr){
            this.loading = true;
            await axios.delete('channel/trash/', {
                data: {
                    ids: arr
                }
            })
                .then((response) => {
                    useChannelStore().getChannel();
                    useChannelStore().channel_selected = [];
                    if(arr.length>1){
                        $toast.success(arr.length + ' channels trashed');
                    }
                    else{
                        $toast.success(arr.length + ' channel trashed');
                    }
                    this.select_page_channel = false;
                    this.channel_selected = [];
                    this.loading = false;
                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
        },
        async bulkRestore(arr){
            this.loading = true;
            await axios.post('channel/restore/',{
                ids: arr
            } )
                .then((response) => {
                    useChannelStore().getChannel();
                    if(arr.length>1){
                        $toast.success(arr.length + ' channels restored');
                    }
                    else{
                        $toast.success(arr.length + ' channel restored');
                    }
                    this.select_page_channel = false;
                    this.channel_selected = [];
                    this.loading = false;
                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
        },
        async bulkActivate(arr){
            this.loading = true;
            await axios.put('channel/update/activate', {
                ids: arr
            })
                .then((response) => {
                    useChannelStore().getChannel();
                    if(arr.length>1){
                        $toast.success(arr.length + ' channels activated');
                    }
                    else{
                        $toast.success(arr.length + ' channel activated');
                    }
                    this.select_page_channel = false;
                    this.channel_selected = [];
                    this.loading = false;
                })
                .catch((error) => {
                    $toast.error(error);
                    this.loading = false;
                });
        },
        async bulkDeactivate(arr){
            this.loading = true;
            await axios.put('channel/update/deactivate', {
                ids: arr
            })
                .then((response) => {
                    useChannelStore().getChannel();
                    if(arr.length>1){
                        $toast.success(arr.length + ' channels deactivated');
                    }
                    else{
                        $toast.success(arr.length + ' channel deactivated');
                    }
                    this.select_page_channel = false;
                    this.channel_selected = [];
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        handleBulk(){
                if(this.channel_selected.length >0){
                    if(this.bulk_operation === 'Delete'){
                        this.bulkDelete(this.channel_selected);
                    }
                    else if(this.bulk_operation === 'Activate'){
                        this.bulkActivate(this.channel_selected);
                    }
                    else if(this.bulk_operation === 'Deactivate'){
                        this.bulkDeactivate(this.channel_selected);
                    }
                    else if(this.bulk_operation === 'Trash'){
                        this.bulkTrash(this.channel_selected);
                    }
                    else if(this.bulk_operation === 'Restore'){
                        this.bulkRestore(this.channel_selected);
                    }
                }else{
                    $toast.error('No Channel Selected')
                }


        },
        handleBulkAll(){
            const channel_selected_all = this.channels.map((item)=>{
                return item.id;
            })
            if(this.bulk_all_operation === 'Delete All'){
                this.bulkDelete(channel_selected_all);
            }
            else if(this.bulk_all_operation === 'Activate All'){
                this.bulkActivate(channel_selected_all);
            }
            else if(this.bulk_all_operation === 'Deactivate All'){
                this.bulkDeactivate(channel_selected_all);
            }
            else if(this.bulk_all_operation === 'Trash All'){
                this.bulkTrash(channel_selected_all);
            }
            else if(this.bulk_all_operation === 'Restore All'){
                this.bulkRestore(channel_selected_all);
            }
        },
        handleSelect(){
            if(this.select_page_channel){
                this.channel_selected =  this.channels_by_page.data.map((item)=>{
                    return item.id;
                })
            }else{
                this.channel_selected =  [];
            }
        },
        showErrors(error){
            if(error.name){
                $toast.error(error.name);
            }
            if(error.customer_name){
                $toast.error(error.customer_name);
            }
            if(error.primary_locale){
                $toast.error(error.primary_locale);
            }
            if(error.currency){
                $toast.error(error.currency);
            }
            if(error.store_url){
                $toast.error(error.store_url);
            }
            if(error.api_type){
                $toast.error(error.api_type);
            }
        },
        toggleIsActive(id,active){
            this.loading = true;
            axios.patch('channel/update/active/'+ id,{
                is_active: active
            })
                .then((response)=>{
                    this.getChannel();
                    this.loading = false;
                })
        }

    },

})
