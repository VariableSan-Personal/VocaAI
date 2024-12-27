<script setup lang="ts">
import { RouterView } from 'vue-router'
import BottomNav from '@/components/BottomNav.vue'
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
