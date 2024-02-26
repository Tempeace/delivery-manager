<template>
  <v-app>
    <DefaultAppBar/>
    <DefaultNavBar/>
    <DefaultView />
  </v-app>
</template>

<script lang="ts" setup>
  import DefaultView from './default/View.vue'
  import DefaultAppBar from './default/AppBar.vue'
  import DefaultNavBar from "./default/NavBar.vue";
</script>
