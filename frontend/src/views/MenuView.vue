<script setup lang="ts"></script>

<template>
  <v-container>
    <h1 class="text-h4 mb-4">Menu</h1>

    <v-list>
      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="amber" class="mr-2">mdi-crown</v-icon>
          Full version is active
        </v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: 'settings' }">
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-cog</v-icon>
          Settings
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-web</v-icon>
          Other languages and apps
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-star</v-icon>
          Rate
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-share-variant</v-icon>
          Share
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-backup-restore</v-icon>
          Create backup
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-database-import</v-icon>
          Restore data
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-refresh</v-icon>
          Reset all progress
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-help-circle</v-icon>
          Support
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-information</v-icon>
          About
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>
