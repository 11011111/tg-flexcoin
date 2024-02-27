<template>
  <q-page class="row column">
    <h4><span class="text-light-green-8">FLEX</span>COIN</h4>
    <q-form>
      <q-input
        v-model="userName"
        outlined
      />
      <Alert message="Hello!" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {Alert} from 'vue-tg';

const userName = ref('')
</script>
