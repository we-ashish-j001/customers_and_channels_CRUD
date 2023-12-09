<template>
  <div class = "p-2 panel" style="width: 300px">
    <div >
      <h2 class="title is-5 panel-heading">
        <span>Show</span>
        <router-link to="/channels" @click.prevent = "channelStore.resetState">
          <span class="material-icons is-pulled-right">close</span>
        </router-link>
      </h2>

    </div>
    <div class="container p-2 is-flex is-flex-direction-column" style="">
      <div class="">
        <div class="is-pulled-left pr-2" ><strong>Channel Name :</strong> </div>
        <div class="">{{form_data.name}}</div>
      </div>
      <hr/>
      <div class="">
        <div class="is-pulled-left pr-2"><strong>Customer Name: </strong> </div>
        <div class="">{{form_data.customer_name}}</div>
      </div>
      <hr/>
      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Active : </strong></div>
        <div :class="form_data.is_active?'has-text-success':'has-text-danger'">
          {{form_data.is_active?'Yes':'No'}}
        </div>
      </div>
      <hr/>

      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Primary Locale : </strong></div>
        <div >{{form_data.primary_locale}}</div>
      </div>
      <hr/>

      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Store URL : </strong></div>
        <div >{{form_data.store_url}}</div>
      </div>
      <hr/>

      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Currency : </strong></div>
        <div >{{form_data.currency}}</div>
      </div>
      <hr/>

      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Api Type : </strong></div>
        <div >{{form_data.api_type}}</div>
      </div>
      <hr/>
<!--      <div v-for="(value,index,column) in form_data.api_data" >-->

<!--        <div v-for="(item, key) in value">-->
<!--          <strong v-if="key === 'api_url'"> API URL : </strong>-->
<!--          <strong v-if="key === 'api_token'"> API Token : </strong>-->
<!--          <strong v-if="key === 'api_key'"> API Key : </strong>-->
<!--          <strong v-if="key === 'api_secret'"> API Secret : </strong>-->
<!--          {{ item }}-->
<!--        </div>-->
<!--        <hr/>-->
<!--      </div>-->
      <div class="" v-if="form_data.api_type === 'Shopify'">
              <div class="is-flex">
                  <div class=" pr-2"><strong>API URL : </strong></div>
                    <div>
                      <div v-for="(value) in form_data.api_data" >
                        {{value.api_url}}
                      </div>
                    </div>
                  </div>

              <hr/>
        <div class="is-flex">
          <div class=" pr-2"><strong>API Token : </strong></div>
          <div >
            <div v-for="(value) in form_data.api_data" >
              {{value.api_token}}
            </div>
          </div>

        </div>
          <hr/>
      <div class="is-flex">
          <div class=" pr-2"><strong>API Key : </strong></div>
          <div >
            <div v-for="(value) in form_data.api_data" >
              {{value.api_key}}
            </div>

        </div>
    </div>
          <hr/>
      <div class="is-flex">
          <div class=" pr-2"><strong>API Secret : </strong></div>
          <div >
            <div v-for="(value) in form_data.api_data" >
              {{value.api_secret}}
            </div>
          </div>
      </div>
      <hr/>
</div>
      <div class="" v-if="form_data.api_type === 'Woocommerce'">
        <div class="is-flex">
          <div class=" pr-2"><strong>API URL : </strong></div>
          <div>
            <div v-for="(value) in form_data.api_data" >
              {{value.api_url}}
            </div>
          </div>
        </div>

        <hr/>
        <div class="is-flex">
          <div class=" pr-2"><strong>API Token : </strong></div>
          <div >
            <div v-for="(value) in form_data.api_data" >
              {{value.api_token}}
            </div>
          </div>

        </div>
        <hr/>
        <div class="is-flex">
          <div class=" pr-2"><strong>API Key : </strong></div>
          <div >
            <div v-for="(value) in form_data.api_data" >
              {{value.api_key}}
            </div>

          </div>
        </div>
        <hr/>
      </div>
      <div class="" v-if="form_data.api_type === 'Bigcommerce'">
        <div class="is-flex">
          <div class=" pr-2"><strong>API URL : </strong></div>
          <div>
            <div v-for="(value) in form_data.api_data" >
              {{value.api_url}}
            </div>
          </div>
        </div>

        <hr/>
        <div class="is-flex">
          <div class=" pr-2"><strong>API Token : </strong></div>
          <div >
            <div v-for="(value) in form_data.api_data" >
              {{value.api_token}}
            </div>
          </div>

        </div>
        <hr/>


      </div>

      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Created At : </strong></div>
        <div >{{form_data.created_at}}</div>
      </div>
      <hr/>

      <div class="is-flex">
        <div class="is-pulled-left pr-2"><strong>Updated At : </strong></div>
        <div >{{form_data.updated_at}}</div>
      </div>

    </div>
  </div>
  <div class="py-4">
    <h4 class="title is-5">Notes</h4>
    <ul>
      <li  v-for="note in noteStore.notes">
        <section style="background-color: yellowgreen"  class="p-2 is-rounded m-2">{{note.id}}. {{note.body}}
          <a><span @click.prevent = "channelStore.deleteNotes(note.id,$route.params.id)">
            <span class="material-icons is-pulled-right">close</span>
          </span></a>
        </section>
      </li>
    </ul>
  </div>
  <div class="py-4">
    <form @submit.prevent = "channelStore.addNotes($route.params.id)">
      <textarea  class="input" v-model="body"/>
      <button class="button is-success is-small my-2">Add</button>
    </form>
  </div>

</template>
<script setup>
import {useChannelStore} from '../../stores/ChannelStore.js';
import {onBeforeMount} from "vue";
import {useNoteStore} from '../../stores/NoteStore.js';
import {useRoute} from "vue-router";
import {storeToRefs} from "pinia";
const channelStore = useChannelStore();
onBeforeMount(()=>{
  const $route = useRoute();
  channelStore.getChannelData($route.params.id);
  channelStore.getNotes($route.params.id);
})
const noteStore = useNoteStore();
const {body}  = storeToRefs(noteStore);
const {form_data}  = storeToRefs(channelStore);
</script>