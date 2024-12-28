<script setup lang="ts">
import BottomNav from '@/components/BottomNav.vue'
import { useAIStore } from '@/stores'
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  const aiStore = useAIStore()
  aiStore.restoreService()
})
</script>

<template>
  <v-responsive>
    <v-app>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>

      <BottomNav />
    </v-app>
  </v-responsive>
</template>

<style>
.header-link {
  color: rgba(var(--v-theme-on-background), 1);
}
</style>
