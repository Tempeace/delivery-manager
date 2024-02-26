<template>
  <v-form
    class="create-deliver-page"
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
    <v-btn variant="tonal" class="float-end mt-2" type="submit">
      Save
    </v-btn>
  </v-form>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import { useRoute } from 'vue-router'
import router from "@/router";
import { useNotification } from "@kyvg/vue3-notification";
import {VForm} from "vuetify/components";

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
  date: '',
  type: 'Delivery',
  userId: '',
  creationDate: 0
};
const form = reactive({...initialState})
const cityItems = ref(['Odesa', 'Kiev', 'Dnepr', 'Kharkiv', 'Lviv', 'Zaporizhzhia']);

function saveRequest(){
  console.log(isValid.value);
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
.create-deliver-page{
  width: 500px;
  display: flex;
  flex-direction: column;
}
</style>
