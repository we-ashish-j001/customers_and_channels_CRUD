
<template>
  <div  class="px-5  mx-5 is-flex" >
    <div style="width: 100%" class="px-3 " >
      <div class="p-2 mx-5 is-flex">
        <router-link to="/create"
                     @click.prevent = "customerStore.resetState();
                     customerStore.getCountries(); customerStore.sidebar = false"
                     class="mr-3">
          <button class="button is-link is-outlined is-small" >
          Create Customer
          </button>
        </router-link>
        <div  class="mr-3">
            <button :disabled="$route.path !== '/'" class="button is-link is-outlined p-2 is-small"
                                      @click.prevent="customerStore.sidebar=true;
                                      customerStore.getCountries()">
            Filter <span class="tag ml-2 is-rounded is-info">{{customerStore.filter_data.count}}</span>
          </button>
        </div>
        <div >
          <button  class="button  is-link is-outlined is-small"
                  @click =" customerStore.resetFilter(); customerStore.getCustomer()">
            Reset Filter
          </button>
        </div>
      </div>
      <div class="mx-5 p-2">
        <h4 class="title is-4 ">Customers
          <span>({{customerStore.customers.length}})</span>
        </h4>
      </div>
      <div class="container px-2 mx-5">
        <customers-table   ></customers-table>

      </div>
    </div>



        <div v-if="$route.path === '/create'"
             class="container is-pulled-right" style="width: 300px">
          <customer-form ></customer-form>
        </div>

    <div v-if="$route.path === '/update/'+ $route.params.id"
         class="container is-pulled-right" style="width: 300px">
      <customer-form ></customer-form>
    </div>
    <div v-if="$route.path === '/show/' + $route.params.id" class="container is-pulled-right" style="width: 300px">
      <show-customer></show-customer>
    </div>
    <div v-if="customerStore.sidebar" style="width: 300px">
      <filter-sidebar></filter-sidebar>
    </div>
  </div>


</template>
<script setup>
import {useCustomerStore} from '../stores/CustomerStore.js';
import CustomersTable from "../components/customer/Table.vue";

import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";
import ShowCustomer from "../components/customer/Show.vue";
import CustomerForm from "../components/customer/Form.vue";
import FilterSidebar from "../components/Filter.vue";
import { onMounted, ref} from "vue";

const customerStore = useCustomerStore();

</script>

