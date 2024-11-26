<script setup lang="ts">
import router from '@/router'
import { RouterLink, RouterView } from 'vue-router'

const routes = router.getRoutes()
</script>

<template>
  <v-responsive>
    <v-app>
      <v-app-bar>
        <v-container class="d-flex align-center">
          <v-app-bar-title text="App Bar" class="ml-0"></v-app-bar-title>

          <v-row justify="end">
            <v-col v-for="(route, index) in routes" :key="index" cols="auto">
              <router-link
                :to="route.path"
                exact-active-class="text-green"
                class="text-decoration-none header-link"
              >
                {{ route.name }}
              </router-link>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<style>
.header-link {
  color: rgba(var(--v-theme-on-background), 1);
}
</style>
