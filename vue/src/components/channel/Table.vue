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
      <button class="button is-success is-small" @click="channelStore.handleBulk">
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
      <button class="button is-success is-small" @click="channelStore.handleBulkAll">
        Done
      </button>
    </div>
  </div>

  <table class="table is-bordered is-striped">
    <thead>
    <tr>
      <th><input type="checkbox" v-model="select_page_channel"
                 @change="channelStore.handleSelect"></th>
      <th style="width: 50px">Id</th>
      <th style="width: 250px">Name</th>
      <th style="width: 250px">Customers Name</th>
      <th v-if="$route.path === '/channels'">Is Active</th>
      <th style="width: 250px">Created At</th>
      <th style="width: 150px">Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="channel in channelStore.channels_by_page.data">
      <td>
        <input :value="channel.id" v-model="channel_selected" :checked="select_page_channel" type="checkbox">
      </td>
      <td>{{channel.id}}</td>
      <td>{{ channel.name }}</td>
      <td>{{ channel.customer_name }}</td>
      <td v-if="$route.path === '/channels'">
        <a class="tag  px-4 is-rounded "
              :class="channel.is_active?'is-success':'is-danger'"
              @click="channel.is_active?channelStore.toggleIsActive(channel.id,false):channelStore.toggleIsActive(channel.id,true)"
              style="text-decoration: none"
        >
          {{channel.is_active ? 'Yes' : 'No' }}
        </a>
      </td>
      <td>{{ format(channel.created_at) }}</td>
      <td>
        <router-link :to="{path:'/channels/update/'+ channel.id}"
                     @click.prevent="channelStore.sidebar=false;channelStore.getChannelData(channel.id)">
          <span class="material-icons">edit</span>
        </router-link>
        <router-link :to="{path:'/channels/show/'+ channel.id}"
                     @click.prevent="channelStore.sidebar=false;channelStore.getChannelData(channel.id);
                           channelStore.getNotes(channel.id)">
          <span class="material-icons ">visibility</span></router-link>
        <a><span style="color: indianred" v-if="channel.deleted_at === null" class="material-icons" @click="channelStore.trashChannel(channel.id)">delete</span>
          <span v-else class="material-icons" @click="channelStore.bulkRestore([channel.id])">restore</span></a>

      </td>
    </tr>
    </tbody>

  </table>
  <div style="width: 150px">
    <Bootstrap5Pagination
        :show-disabled="true"
        :limit="1"
        :data="channelStore.channels_by_page"
        @pagination-change-page="channelStore.getChannel"

    />
  </div>
</template>

<script setup>
import {format} from "timeago.js";
import {Bootstrap5Pagination} from 'laravel-vue-pagination';

import {onBeforeMount, onMounted, ref} from "vue";
import {useChannelStore} from "../../stores/ChannelStore.js";
import {storeToRefs} from "pinia";
import {useRoute} from "vue-router";

const channelStore = useChannelStore();

onMounted(() => {
  const $route = useRoute();
  if ($route.path === '/channels'
      || $route.path === '/channels/show/' + $route.params.id
      || $route.path === '/channels/create'
      || $route.path === '/channels/update/'+$route.params.id) {
    channelStore.getChannel();
  } else if ($route.path === '/channels/' + $route.params.id || $route.path === '/channels/create/' + $route.params.id) {
    channelStore.getCustomerChannels($route.params.id);
  }

})

const {
  form_data,
  bulk_all_operation,
  bulk_operation,
  channel_selected,
  select_page_channel
} = storeToRefs(channelStore);
</script>
