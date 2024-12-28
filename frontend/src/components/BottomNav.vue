<script setup lang="ts">
const routes = [
  {
    name: 'learn',
    title: 'Learn',
    icon: '$mdiTextBox',
  },
  {
    name: 'vocabulary',
    title: 'Vocabulary',
    icon: '$mdiBookOpen',
  },
  {
    name: 'menu',
    title: 'Menu',
    icon: '$mdiMenu',
  },
]
</script>

<template>
  <v-bottom-navigation grow>
    <v-btn v-for="route in routes" :key="route.title" :to="{ name: route.name }" exact>
      <v-icon :icon="route.icon" class="mb-1"></v-icon>
      <p>{{ route.title }}</p>
    </v-btn>
  </v-bottom-navigation>
</template>
