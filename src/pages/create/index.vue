<template>
  <div class="flex-column">
    <v-label class="mb-2">Choose Request Type</v-label>
    <div>
      <v-btn variant="tonal" class="mr-4" @click="changeRoute('order')">
        Order
      </v-btn>
      <v-btn variant="tonal" class="mr-4" @click="changeRoute('deliver')">
        Deliver
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from "@/router";

  function changeRoute(route: string){
    router.push({name: `/create/${route}/`});
  }
</script>

