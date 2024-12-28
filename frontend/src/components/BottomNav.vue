<script setup lang="ts">
import { useRoute } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'

const route = useRoute()

const routes: { name: keyof RouteNamedMap; title: string; icon: string }[] = [
  {
    name: '/learn',
    title: 'Learn',
    icon: '$mdiTextBox',
  },
  {
    name: '/vocabulary',
    title: 'Vocabulary',
    icon: '$mdiBookOpen',
  },
  {
    name: '/menu/',
    title: 'Menu',
    icon: '$mdiMenu',
  },
]
</script>

<template>
  <v-bottom-navigation grow v-if="!route.meta.hideBottomNav">
    <v-btn v-for="route in routes" :key="route.title" :to="{ name: route.name }">
      <v-icon :icon="route.icon" class="mb-1"></v-icon>
      <p>{{ route.title }}</p>
    </v-btn>
  </v-bottom-navigation>
</template>
