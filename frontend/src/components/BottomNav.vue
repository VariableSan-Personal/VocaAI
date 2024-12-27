<script setup lang="ts">
import { PATHS } from '@/router/paths'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const activeTab = ref('')

const onTabChange = (val: string) => {
  router.push(val)
}

onMounted(() => {
  activeTab.value = route.path
})
</script>

<template>
  <v-bottom-navigation v-model="activeTab" @update:modelValue="onTabChange" grow>
    <v-btn :value="PATHS.learn">
      <span>Learn</span>
      <v-icon icon="$mdiBookOpen"></v-icon>
    </v-btn>
    <v-btn :value="PATHS.vocabulary">
      <span>Vocabulary</span>
      <v-icon icon="$mdiTextBox"></v-icon>
    </v-btn>
    <v-btn :value="PATHS.menu">
      <span>Menu</span>
      <v-icon icon="$mdiMenu"></v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
