<template>
  <div class="flex-column">
    <v-label class="text-h5 d-inline-block mb-1">List of All {{userId ? `User №${userId}` : ''}} Requests</v-label>
    <v-switch color="primary" label="Sort by date of delivery" v-model="isSortedByDeliveryDate"></v-switch>
    <v-card variant="tonal" class="request-card" v-for="request in requests" :key="request.creationDate">
      <v-btn icon="mdi-pencil" size="small" variant="text" class="float-right">
      </v-btn>
      <div class="d-inline-block pr-2" v-if="request.type === 'Order'">
        <span class="font-weight-bold">Type: </span> {{ request.parcelType }}
      </div>
      <span class="font-weight-bold">Date: </span> {{moment(request.date).format('DD.MM.YYYY')}} <br/>
      <span class="font-weight-bold">From: </span> {{ request.from }}
      <span class="font-weight-bold">To: </span> {{ request.to }}
      <div v-if="!userId">
        <span class="font-weight-bold">User ID: </span> {{request.userId}}
      </div>
      <div v-if="request.type === 'Order' && request.description">
        <span class="font-weight-bold">Description: </span> {{request.description}}
      </div>
      <div class="mt-4" v-if="request.associatedRequests.length">
        List of Associated Requests:
        <v-table variant="tonal">
          <thead>
          <tr>
            <th class="text-left">
              From
            </th>
            <th class="text-left">
              To
            </th>
            <th class="text-left">
              Type
            </th>
            <th class="text-left">
              User ID
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="associatedRequest in request.associatedRequests" :key="associatedRequest.creationDate">
            <td> {{ associatedRequest.from}} </td>
            <td> {{ associatedRequest.to }} </td>
            <td> {{ associatedRequest.type }} </td>
            <td> {{ associatedRequest.userId }} </td>
          </tr>
          </tbody>
        </v-table>
      </div>
    </v-card>
  </div>
</template>

<script setup lang="ts">
  import {ref, Ref, watch} from "vue";
  import { onMounted } from 'vue';
  import { useRoute } from 'vue-router'
  import moment from "moment";
  import {useAppStore, Request} from "@/store/app";

  const route = useRoute();
  const userId = route.query.id;
  const store = useAppStore();

  const isSortedByDeliveryDate = ref(false);

  watch(isSortedByDeliveryDate, (value) => {
    if(value){
      requests.value = requests.value.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          } else if (a.date > b.date) {
            return 1;
          } else return 0;
        }
      )
    } else requests.value = requests.value.sort((a, b) => {
        if (a.creationDate < b.creationDate) {
          return -1;
        } else if (a.creationDate > b.creationDate) {
          return 1;
        } else return 0;
      }
    )
  })

  let requests = ref([]) as Ref<Request[]>;
  const initialize = () => {
    store.fetchRequests(userId ? userId as String : null);
    requests.value = store.requestsList;
  };

  onMounted(() => initialize());
</script>


<style scoped lang="scss">
  .request-card{
    border-radius: 10px;
    width: fit-content;
    padding: 10px;
    margin-bottom: 10px;
  }
</style>
