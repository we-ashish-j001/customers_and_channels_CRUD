<template>
  <div >
    <div class="py-5">
      <h5 class="title is-5">
        <span v-if="$route.path === '/create'">Create</span>
        <span v-if="$route.path === '/update/'+ $route.params.id">Update</span>
        <router-link to="/" @click.prevent="customerStore.resetState()">
          <span  class="material-icons is-pulled-right" >close</span>
        </router-link>
      </h5>
    </div>
    <div class="container has-background-light p-5">

      <form method="post">

        <div class="field ">
          <label>Customer Name </label>
          <div class="control">
            <input class="input is-small" v-model="form_data.name" type="text" >
          </div>
        </div>
        <div class="field ">
          <label class="">Country</label>
          <div class="control">
            <div class="select is-small">
              <select v-model="form_data.country">
                <option value="" selected>Select Country</option>
                <option :value="country.name.official" v-for="country in form_data.countries">
                  {{country.name.official}}
                </option>
              </select>
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
          <button class="button is-success mr-3" v-if="$route.path === '/create'"
                  @click.prevent="customerStore.handleAdd">
            Create
          </button>
          <button class="button is-success mr-3" v-if="$route.path === '/update/'+ $route.params.id"
                  @click.prevent="customerStore.handleUpdate($route.params.id)">
            Update
          </button>
          <router-link to="/"
                       @click.prevent="customerStore.resetState">
            <button  class="button is-dark">Cancel</button>
          </router-link>
        </div>
      </form>
    </div>

  </div>

</template>

<script setup>
import { storeToRefs } from "pinia";
import {useCustomerStore} from '../../stores/CustomerStore.js';
import {onBeforeMount} from "vue";
import {useRoute} from "vue-router";
const customerStore = useCustomerStore();
const {form_data}  = storeToRefs(customerStore);
const {getCountries}  = customerStore;

onBeforeMount(()=>{
  getCountries();

})
// import {useToast} from 'vue-toast-notification';
// import 'vue-toast-notification/dist/theme-sugar.css';

// const $toast = useToast();
// let instance = $toast.success('You did it!');
</script>
