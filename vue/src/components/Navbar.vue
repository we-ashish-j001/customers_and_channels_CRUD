<template>
  <progress v-show="useCustomerStore().loading || useChannelStore().loading"  style="margin-bottom:0;position: absolute; top: -10px ;" class=" progress is-success  is-small" value="100" max="100"></progress>
    <nav style="position:relative;top:1px" class="navbar px-5 mx-5" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="">
                <img src="https://bulma.io/images/bulma-logo.png" width="56 " height="28">
            </a>

        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">

                <router-link class="navbar-item" to="/">Customers </router-link>
                <router-link class="navbar-item" to="/channels">Channels</router-link>
            </div>


        </div>
    </nav>
</template>
<script setup>
import {useCustomerStore} from "../stores/CustomerStore.js";
import {useChannelStore} from "../stores/ChannelStore.js";
</script>