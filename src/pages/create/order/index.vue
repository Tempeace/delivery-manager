<template>
  <v-form class="create-order-page"
          v-model="isValid"
          @submit.prevent="saveRequest">
    <v-label class="mb-2">
      Create new Request
    </v-label>
    <v-label class="mt-2">
      From
    </v-label>
    <v-select
      v-model="form.from"
      :items="cityItems"
      label="Choose city"
      hide-details="auto"
      :rules="formRules"
    ></v-select>
    <v-label class="mt-2">
      To
    </v-label>
    <v-select
      v-model="form.to"
      :items="cityItems"
      label="Choose city"
      hide-details="auto"
      :rules="formRules"
    ></v-select>
    <v-label class="mt-2">
      Date of Delivery
    </v-label>
    <v-text-field
      v-model="form.date"
      type="date"
      label="Choose date"
      hide-details="auto"
      :rules="formRules"
    ></v-text-field>
    <v-label class="mt-2">
      Parcel Type
    </v-label>
    <v-select
      v-model="form.parcelType"
      :items="parcelItems"
      label="Choose parcel type"
      hide-details="auto"
      :rules="formRules"
    ></v-select>
    <v-label class="mt-2">
      Description
    </v-label>
    <v-textarea
      v-model="form.description"
      label="Enter description"
      hide-details="auto"
    ></v-textarea>
    <v-btn variant="tonal" class="float-end mt-2" type="submit">
      Save
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
  import {reactive, ref} from "vue";
  import { useRoute } from 'vue-router'
  import router from "@/router";
  import {VForm} from "vuetify/components";
  import { useNotification } from "@kyvg/vue3-notification";

  const { notify }  = useNotification()

  const route = useRoute();
  const userId = route.query.id as string;

  const isValid = ref(false);
  const formRules = [
    (value : string | number) => {
      if (value) return true
      return 'Field is required.'
    },
  ]
  const initialState = {
    from: '',
    to: '',
    parcelType: '',
    description: '',
    date: '',
    type: 'Order',
    userId: '',
    creationDate: 0
  };
  const cityItems = ref(['Odesa', 'Kiev', 'Dnepr', 'Kharkiv', 'Lviv', 'Zaporizhzhia']);
  const parcelItems = ref(['Gadgets', 'Drinks', 'Clothes', 'Medicines', 'Other']);
  const form = reactive({...initialState})

  function saveRequest(){
    if(!isValid.value) return;
    form.userId = userId ? userId : '1';
    form.creationDate = Date.now();
    const savedRequests = localStorage.getItem('requests');
    if(savedRequests){
      localStorage.setItem('requests', JSON.stringify([...JSON.parse(savedRequests), form]));
    } else{
      localStorage.setItem('requests', JSON.stringify([form]));
    }
    router.push('/requests');
    notify({
      type: "success",
      text: "Request has successfully been created!",
    });
  }

</script>


<style scoped lang="scss">
.create-order-page{
  width: 500px;
  display: flex;
  flex-direction: column;
}
</style>
