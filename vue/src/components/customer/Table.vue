<template>
  <div class="is-flex">
    <div class="py-4 mr-3">
      <select class="select is-small" v-model="bulk_operation">
        <option value="">Choose Bulk Operation</option>
        <option value="Activate">Activate</option>
        <option value="Deactivate">Deactivate</option>
        <option value="Trash">Trash</option>
        <option value="Restore">Restore</option>
        <option value="Delete">delete</option>
      </select>
      <button class="button is-success is-small" @click="customerStore.handleBulk">
        Done
      </button>
    </div>
    <div class="py-4">
      <select class="select is-small" v-model="bulk_all_operation">
        <option value="">Choose Bulk All Operation</option>
        <option value="Activate All">Activate All</option>
        <option value="Deactivate All">Deactivate All</option>
        <option value="Trash All">Trash All</option>
        <option value="Restore All">Restore All</option>
        <option value="Delete All">delete All</option>
      </select>
      <button class="button is-success is-small" @click="customerStore.handleBulkAll">
        Done
      </button>
    </div>
  </div>

  <table  class="table is-bordered is-striped">
    <thead>
    <tr>
      <th>
        <input type="checkbox" v-model="select_page_customers" @change="customerStore.handleSelect">
      </th>
      <th style="width: 50px">Id</th>
      <th style="width: 200px">Name</th>
      <th style="width: 250px">Country</th>
      <th style="width: 100px" v-if="$route.path === '/' && customerStore.sidebar===false">Channel</th>
      <th style="width: 90px" v-if="$route.path === '/'">Is Active</th>
      <th style="width: 200px">Created At</th>
      <th style="width: 150px">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="customer in customerStore.customers_by_page" key="index">

      <td><input :value="customer.id" v-model="customer_selected"
                 @change="customerStore.toggleSelection(customer.id)"
                 :checked="select_page_customers" type="checkbox"></td>
      <td>{{customer.id}}</td>
      <td>{{ customer.name }}</td>
      <td>{{ customer.country }}</td>
      <td style="height: 100%" class="is-flex is-justify-content-space-between" v-if="$route.path === '/' && customerStore.sidebar===false">
        <router-link :to="{path: '/channels/'+ customer.id}">
          <span v-if="customer.channels"
                class="tag is-primary px-4 is-rounded ">
            {{ customer.channels.length > 0 ? customer.channels.length : 0 }}
          </span>
        </router-link>
        <router-link class="" :to="{path: '/channels/create/'+ customer.id}"
                     @click.prevent="customerStore.getCustomerName(customer.id); channelStore.sidebar=false;">
          <span style="color: lightgrey"
                class="material-icons ">
            add_circle
          </span>
        </router-link>
      </td>
      <td v-if="$route.path === '/'">
        <a class="tag  px-4 is-rounded "
              :class="customer.is_active ?'is-success':'is-danger'"
              @click="customer.is_active?customerStore.toggleIsActive(customer.id,false)
              :customerStore.toggleIsActive(customer.id,true)"
              style="text-decoration: none"
        >
        {{ customer.is_active ? 'Yes' : 'No' }}
      </a>
      </td>
      <td>{{ customer.created_at }}</td>
      <td>
        <router-link :to="{path: '/update/'+ customer.id}"
                     @click.prevent="customerStore.sidebar=false;
                     customerStore.getCustomerData(customer.id);
                     customerStore.getCountries">
          <span class="material-icons">edit</span>
        </router-link>
        <router-link :to="{path: '/show/'+ customer.id}"
                     @click.prevent="customerStore.sidebar=false;customerStore.getCustomerData(customer.id);
                     customerStore.getNotes(customer.id)">
          <span class="material-icons ">visibility</span></router-link>
          <a>
            <span v-if="customer.deleted_at === null" class="material-icons " @click="customerStore.trashCustomer(customer.id)">delete</span>
            <span v-else class="material-icons ml-1" @click="customerStore.bulkRestore([customer.id])">restore</span>
          </a>


      </td>
    </tr>
    </tbody>

  </table>


  <div style="width: 150px">
      <Bootstrap5Pagination
          :show-disabled="true"
          :limit="1"
          :data="customerStore.pagination"
          @pagination-change-page="customerStore.getCustomer"

      />
  </div>


</template>

<script setup>
import {Bootstrap5Pagination} from 'laravel-vue-pagination';
import {useCustomerStore} from '../../stores/CustomerStore.js';
import {useChannelStore} from '../../stores/ChannelStore.js';
import {onBeforeMount, onBeforeUpdate, onMounted, ref} from "vue";
import {format} from "timeago.js";

const customerStore = useCustomerStore();
const channelStore = useChannelStore();
import {storeToRefs} from "pinia";
import axios from "axios";

onMounted(() => {
  customerStore.getCustomer();
})
const {
  form_data,
  bulk_all_operation,
  bulk_operation,
  customer_selected,
  select_page_customers
} = storeToRefs(customerStore);


</script>
