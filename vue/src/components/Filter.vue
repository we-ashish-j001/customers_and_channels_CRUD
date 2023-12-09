<template>
  <a v-if="$route.path === '/channels'|| $route.path === '/channels/'+$route.params.id " class="p-4"
     @click.prevent="channelStore.sidebar = false">
    <span class="material-icons is-pulled-right">close</span>
  </a>
  <a v-if="$route.path === '/'" class="p-4" @click.prevent="customerStore.sidebar = false">
    <span
      class="material-icons is-pulled-right">
      close
    </span>
  </a>
  <div style="background-color: whitesmoke" class="box p-4">
    <div class="is-flex is-flex-direction-column">
      <div class="py-2"><h4 class="title is-6">
        <span v-if="$route.path === '/channels'
        || $route.path === '/channels/'+$route.params.id ">
          Customer:
        </span>
        <span v-if="$route.path === '/'">Countries:</span>

      </h4></div>
      <div class="select is-multiple is-small">
        <select multiple v-if="$route.path === '/channels'|| $route.path === '/channels/'+$route.params.id "
                v-model="channelStore.filter_data.customer_name" @change="channelStore.getChannel()"
                style="width: 250px">
          <option :value="customer.name" v-for="customer in customerStore.customers">
            {{ customer.name }}
          </option>

        </select>
        <select multiple  v-if="$route.path === '/'" v-model="customerStore.filter_data.country"
                @change="customerStore.getCustomer()"
                 style="width: 250px"
        >
          <option :value="country.name.official" v-for="country in customerStore.form_data.countries">
            {{ country.name.official }}
          </option>
        </select>
      </div>
    </div>
    <hr/>
    <div class="is-flex is-flex-direction-column">
      <div><h4 class="title is-6">Sort By:</h4></div>
      <div v-if="$route.path === '/channels'|| $route.path === '/channels/'+$route.params.id ">
        <div><input type="radio" value="asc" v-model="channelStore.filter_data.sort_by"
                    @change="channelStore.getChannel()">  Updated (Ascending)
        </div>
        <div><input type="radio" value="desc" v-model="channelStore.filter_data.sort_by"
                    @change="channelStore.getChannel()">  Updated (Descending)
        </div>
      </div>
      <div v-if="$route.path === '/'">
        <div><input type="radio" value="asc" v-model="customerStore.filter_data.sort_by"
                    @change="customerStore.getCustomer()">  Updated (Ascending)
        </div>
        <div><input type="radio" value="desc" v-model="customerStore.filter_data.sort_by"
                    @change="customerStore.getCustomer()">  Updated (Descending)
        </div>
      </div>
    </div>
    <hr/>
    <div class="is-flex is-flex-direction-column">
      <div><h4 class="title is-6">Is Active:</h4></div>
      <div v-if="$route.path === '/channels'|| $route.path === '/channels/'+$route.params.id ">
        <div><input type="radio" value="all" v-model="channelStore.filter_data.is_active_filter"
                    @change="channelStore.getChannel()">  All</div>
        <div><input type="radio" value="1" v-model="channelStore.filter_data.is_active_filter"
                    @change="channelStore.getChannel()">  Only Active
        </div>
        <div><input type="radio" value="0" v-model="channelStore.filter_data.is_active_filter"
                    @change="channelStore.getChannel()">  Only Inactive
        </div>
      </div>
      <div v-if="$route.path === '/'">
        <div><input type="radio" value="all" v-model="customerStore.filter_data.is_active_filter"
                    @change="customerStore.getCustomer()">  All</div>
        <div><input type="radio" value="1" v-model="customerStore.filter_data.is_active_filter"
                    @change="customerStore.getCustomer()">  Only Active
        </div>
        <div><input type="radio" value="0" v-model="customerStore.filter_data.is_active_filter"
                    @change="customerStore.getCustomer()">  Only Inactive
        </div>
      </div>

    </div>
    <hr/>
    <div class="is-flex is-flex-direction-column">
      <div><h4 class="title is-6">Trashed:</h4></div>
      <div v-if="$route.path === '/channels'|| $route.path === '/channels/'+$route.params.id ">
        <div><input type="radio" value="without" v-model="channelStore.filter_data.trashed"
                    @change="channelStore.getChannel()">  Exclude Trashed</div>
        <div><input type="radio" value="with" v-model="channelStore.filter_data.trashed"
                    @change="channelStore.getChannel()">  Include Trashed
        </div>
        <div><input type="radio" value="only" v-model="channelStore.filter_data.trashed"
                    @change="channelStore.getChannel()">  Only Trashed
        </div>
      </div>
      <div v-if="$route.path === '/'">
        <div><input type="radio" value="without" v-model="customerStore.filter_data.trashed"
                    @change="customerStore.getCustomer()">  Exclude Trashed</div>
        <div><input type="radio" value="with" v-model="customerStore.filter_data.trashed"
                    @change="customerStore.getCustomer()">  Include Trashed
        </div>
        <div><input type="radio" value="only" v-model="customerStore.filter_data.trashed"
                    @change="customerStore.getCustomer()">  Only Trashed
        </div>
      </div>

    </div>
  </div>
</template>
<script setup>
import {useChannelStore} from "../stores/ChannelStore.js";
import {storeToRefs} from "pinia";
import {useCustomerStore} from "../stores/CustomerStore.js";

const channelStore = useChannelStore();
const customerStore = useCustomerStore();

</script>