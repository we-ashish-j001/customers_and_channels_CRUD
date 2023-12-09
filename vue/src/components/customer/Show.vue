<template>
  <div class = "p-2 panel" style="width: 300px">
    <div >
      <h2 class="title is-5 panel-heading">
        <span>Show</span>
        <router-link to="/" @click.prevent = "customerStore.resetState()">
          <span class="material-icons is-pulled-right">close</span>
        </router-link>
      </h2>
    </div>
    <div class="container p-2 is-flex is-flex-direction-column" style="">
        <div class="">
          <div class="is-pulled-left pr-2" >Customer Name : </div>
          <div class=""><span>{{form_data.name}}</span></div>
        </div>
      <hr/>
      <div class="">
        <div class="is-pulled-left pr-2">Country: </div>
        <div class="">{{form_data.country}}</div>
      </div>
      <hr/>
      <div class="is-flex">
        <div class="is-pulled-left pr-2">Active :</div>
        <div :class="form_data.is_active?'has-text-success':'has-text-danger'">
          {{form_data.is_active?'Yes':'No'}}
        </div>
      </div>
      <hr/>
      <div class="is-flex">
        <div class="is-pulled-left pr-2">Created At :</div>
        <div >{{form_data.created_at}}</div>
      </div>
      <hr/>
      <div class="is-flex">
        <div class="is-pulled-left pr-2">Updated At :</div>
        <div >{{form_data.updated_at}}</div>
      </div>

    </div>
    <div class="py-4">
      <h4 class="title is-5">Notes</h4>
      <ul>
        <li  v-for="note in noteStore.notes">
          <section style="background-color: yellowgreen"  class="p-2 is-rounded m-2">{{note.id}}. {{note.body}}
            <a><span @click.prevent = "customerStore.deleteNotes(note.id,$route.params.id)">
            <span class="material-icons is-pulled-right">close</span>
          </span></a>
          </section>

        </li>
      </ul>
    </div>
    <div class="py-4">
      <form @submit.prevent = "customerStore.addNotes($route.params.id)">
        <textarea  class="input" v-model="body"/>
        <button class="button is-success is-small my-2">Add</button>
      </form>
    </div>
  </div>

</template>
<script setup>
import {useCustomerStore} from '../../stores/CustomerStore.js';
import {useNoteStore} from '../../stores/NoteStore.js';
import {onBeforeMount} from "vue";
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
const customerStore = useCustomerStore();
const noteStore = useNoteStore();
onBeforeMount(()=>{
  const $route = useRoute();
  customerStore.getCustomerData($route.params.id);
  customerStore.getNotes($route.params.id);
})
const {body}  = storeToRefs(noteStore);
const {form_data}  = storeToRefs(customerStore);
</script>