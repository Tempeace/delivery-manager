<template>
  <v-app id="app">
    <v-main>
      <router-view />
      <notifications position="bottom left" />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  import {Notifications} from "@kyvg/vue3-notification";
</script>

<style lang="scss">
  #app{
    font-family: monospace, serif;
  }
</style>
