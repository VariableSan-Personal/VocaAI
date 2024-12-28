<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
</script>

<template>
  <v-app-bar v-if="route.meta.showBack">
    <v-btn icon @click="router.back()">
      <v-icon icon="$mdiArrowLeft"></v-icon>
    </v-btn>
    <v-app-bar-title>{{ route.name }}</v-app-bar-title>
  </v-app-bar>
</template>
