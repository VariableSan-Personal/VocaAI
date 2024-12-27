<script setup lang="ts">
import { PATHS } from '@/router/paths'

const routes = [
  {
    path: PATHS.learn,
    name: 'Learn',
    icon: '$mdiTextBox',
  },
  {
    path: PATHS.vocabulary,
    name: 'Vocabulary',
    icon: '$mdiBookOpen',
  },
  {
    path: PATHS.menu,
    name: 'Menu',
    icon: '$mdiMenu',
  },
]
</script>

<template>
  <v-bottom-navigation grow>
    <v-btn v-for="route in routes" :key="route.path" :to="route.path" exact>
      <v-icon :icon="route.icon" class="mb-1"></v-icon>
      <p>{{ route.name }}</p>
    </v-btn>
  </v-bottom-navigation>
</template>
