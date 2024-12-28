<template>
  <v-container>
    <h1 class="text-h4 mb-4">Menu</h1>

    <v-list>
      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="amber" class="mr-2" icon="$mdiCrown"></v-icon>
          Full version is active
        </v-list-item-title>
      </v-list-item>

      <v-list-item :to="{ name: '/menu/settings' }">
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiCog"></v-icon>
          Settings
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiWeb"></v-icon>
          Other languages and apps
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiStar"></v-icon>
          Rate
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiShareVariant"></v-icon>
          Share
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiBackupRestore"></v-icon>
          Create backup
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiDatabaseImport"></v-icon>
          Restore data
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiRefresh"></v-icon>
          Reset all progress
        </v-list-item-title>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiHelpCircle"></v-icon>
          Support
        </v-list-item-title>
      </v-list-item>

      <v-list-item>
        <v-list-item-title class="d-flex align-center">
          <v-icon color="primary" class="mr-2" icon="$mdiInformation"></v-icon>
          About
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>
