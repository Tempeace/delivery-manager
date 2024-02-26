<template>
  <v-navigation-drawer class="navigation-bar" color="#c7c743">
    <v-list-item :to="'/create'" title="Create New Request" class="navigation-bar__item"/>
    <v-divider/>
    <v-list-item :to="'/requests'" title="Requests" class="navigation-bar__item"/>
    <v-divider/>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  //
</script>

<style scoped lang="scss">
.navigation-bar{
  display: flex;
  flex-direction: column;

  &__item{
    border: 1px black;
  }
}
</style>
