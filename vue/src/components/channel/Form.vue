<template>
  <div >
    <div class="py-5">
      <h5 class="title is-5">
        <span v-if="$route.path === '/channels/create'
        || $route.path === '/channels/create/'+ $route.params.id">
          Create
        </span>
        <span v-if="$route.path === '/channels/update/'+ $route.params.id">Update</span>
        <router-link to="/channels" @click.prevent = "channelStore.resetState; channelStore.getChannel()">
          <span class="material-icons is-pulled-right">close</span>
        </router-link>
      </h5>
    </div>
    <div class="container has-background-light p-5">
      <form method="post" style="width: 230px">
        <div class="field ">
          <label class=" ">Channel Name</label>

          <div class="control">
            <input class="input is-small" v-model="form_data.name" type="text" >
          </div>
        </div>
        <div class="field " >
          <label class=" ">Customer Name</label>
          <div class="control">
            <div class="select is-small" >
              <select v-model="form_data.customer_name"
                      :disabled="$route.path=== '/channels/create/'+$route.params.id"
                      style="width: 230px"
              >
                <option value="" selected>Select Customer</option>
                <option :value="customer.name" v-for="customer in customerStore.customers">
                  {{customer.name}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="field ">
          <label class=" ">Primary Locale</label>
          <div class="control">
            <div class="select is-small">
              <select v-model="form_data.primary_locale" style="width: 230px">
                <option value="" selected>Select Locale</option>
                <option value="EN">EN</option>
                <option value="FR">FR</option>
                <option value="IN">IN</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field ">
          <label class=" ">Default Currency</label>
          <div class="control">
            <div class="select is-small">
              <select v-model="form_data.currency" style="width: 230px">
                <option value="" selected>Select Currency</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field ">
          <label class=" ">Store URL</label>
          <div class="control">
            <input class="input is-small" v-model="form_data.store_url" type="text" >
          </div>
        </div>
        <div class="field ">
          <label class=" ">Type</label>
          <div class="control">
            <div class="select is-small">
              <select v-model="form_data.api_type" style="width: 230px">
                <option value="" selected>Select Type</option>
                <option>Shopify</option>
                <option>Woocommerce</option>
                <option>Bigcommerce</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field ">
          <label class="" v-if="form_data.api_type !== ''">API Keys</label>
          <div class="container ml-5">

            <div v-if="form_data.api_type === 'Shopify'
            || form_data.api_type === 'Woocommerce'
            || form_data.api_type === 'Bigcommerce'" class="container">
              <label class=" ">API URL</label>
              <div class="control">
                <input class="input is-small" v-model="form_data.api_url" type="text" >
              </div>
            </div>
            <div v-if="form_data.api_type === 'Shopify'
            || form_data.api_type === 'Woocommerce'
            || form_data.api_type === 'Bigcommerce'" class="container">
              <label class=" ">API Token</label>
              <div class="control">
                <input class="input is-small" v-model="form_data.api_token" type="text" >
              </div>
            </div>
            <div v-if="form_data.api_type === 'Shopify'
            || form_data.api_type === 'Woocommerce'" class="container">
              <label class=" ">API Key</label>
              <div class="control">
                <input class="input is-small"  v-model="form_data.api_key" type="text" >
              </div>
            </div>
            <div v-if="form_data.api_type === 'Shopify'" class="container">
              <label class=" ">API Secret</label>
              <div class="control">
                <input class="input is-small" v-model="form_data.api_secret" type="text" >
              </div>
            </div>
          </div>
        </div>

        <div class="field ">
          <label class="">Is Active</label>
          <div>
            <input type="checkbox" class="checkbox" v-model="form_data.is_active" >
            <span class="pl-2">{{form_data.is_active?'Yes':'No'}}</span>
          </div>


        </div>
        <div>
          <button v-if="$route.path === '/channels/update/'+ $route.params.id"
                  class="button is-success mr-3"
                  @click.prevent="channelStore.handleUpdate(this.$route.params.id)">
            Update
          </button>
          <button v-if="$route.path === '/channels/create'"
                  class="button is-success mr-3"
                  @click.prevent="channelStore.handleAdd">
            Create
          </button>
          <button v-if="$route.path === '/channels/create/' + $route.params.id"
                  class="button is-success mr-3"
                  @click.prevent="channelStore.handleAdd($route.params.id)">
            Create
          </button>
          <router-link to="/channels"
                       @click.prevent = "channelStore.resetState">
            <button class="button is-dark">Cancel</button>
          </router-link>
        </div>
      </form>
    </div>

  </div>


</template>

<script setup>
import {storeToRefs} from "pinia";
import {useChannelStore} from "../../stores/ChannelStore.js";
import {useCustomerStore} from "../../stores/CustomerStore.js";
import {onBeforeMount, onMounted} from "vue";
import {useRoute} from "vue-router";
const channelStore = useChannelStore();
const customerStore = useCustomerStore();

const {channels,form_data} = storeToRefs(channelStore);

onBeforeMount(()=>{
  customerStore.getCustomer();
  let $route = useRoute();
  if($route.path === '/channels/update/' + $route.params.id ){
    channelStore.getChannelData($route.params.id);
  }
  else if($route.path === '/channels/create/' + $route.params.id){
    customerStore.getCustomerName($route.params.id);
  }


})


</script>
