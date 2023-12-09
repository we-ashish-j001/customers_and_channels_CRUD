<template>
  <div class=" px-5 pb-3 mx-5 is-flex" >
    <div style="width: 100%" class=" px-3  " >
      <div class="p-2 mx-5 is-flex ">
        <router-link v-if="$route.path === '/channels/'+$route.params.id" class="mr-3"
                     :to="{path: '/channels/create/'+ $route.params.id}"
                     @click.prevent = "channelStore.sidebar=false;channelStore.resetState(); customerStore.getCustomerName($route.params.id)" >
          <button class="button  is-link is-outlined is-small" >Create Channel</button>
        </router-link>
        <router-link v-if="$route.path !== '/channels/'+$route.params.id "
                     class="mr-3"  to="/channels/create"
                     @click.prevent = "channelStore.sidebar=false;channelStore.resetState()" >
          <button class="button  is-link is-outlined is-small" >Create Channel</button>
        </router-link>
        <div class="mr-3">
          <button :disabled="$route.path !== '/channels' && $route.path !== '/channels/'+$route.params.id"
                  class="button  is-link is-outlined is-small"
                  @click.prevent="channelStore.sidebar=true; customerStore.getCustomer()">
            Filter <span class="tag ml-2 is-rounded is-info">{{channelStore.filter_data.count}}</span>
          </button>
        </div>
        <div >
          <button  class="button  is-link is-outlined is-small"
                   @click =" channelStore.resetFilter(); channelStore.getChannel()">
            Reset Filter
          </button>
        </div>

      </div>
      <div class=" mx-5 p-2 ">
        <h4 class="title is-4 ">Channels <span>({{channelStore.channels.length}})</span></h4>
      </div>
      <div class="container mx-5 px-2">
        <channels-table  ></channels-table>
      </div>
    </div>

    <div v-if="$route.path === '/channels/create'" class="container is-pulled-right" style="width: 300px">
      <channel-form></channel-form>
    </div>
    <div v-if="$route.path === '/channels/create/'+ $route.params.id"
         class="container is-pulled-right"
         style="width: 300px">
      <channel-form></channel-form>
    </div>
    <div v-if="$route.path === '/channels/update/'+$route.params.id"
         class="container is-pulled-right"
         style="width: 300px">
      <channel-form></channel-form>
    </div>
    <div v-if="$route.path === '/channels/show/'+$route.params.id"
         class="container is-pulled-right"
         style="width: 300px">
      <show-channel></show-channel>
    </div>
    <div v-if="channelStore.sidebar" style="width: 350px" >
      <filter-sidebar></filter-sidebar>
    </div>

  </div>



</template>
<script setup>
import {useChannelStore} from "../stores/ChannelStore";
import ChannelsTable from "../components/channel/Table.vue";

import ShowChannel from "../components/channel/Show.vue";
import ChannelForm from "../components/channel/Form.vue";
import FilterSidebar from "../components/Filter.vue";
import {useCustomerStore} from "../stores/CustomerStore";
import {onMounted} from "vue";

const channelStore = useChannelStore();
const customerStore = useCustomerStore();


</script>

