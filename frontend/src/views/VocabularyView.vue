<template>
  <v-container class="pa-0">
    <v-card class="mx-2">
      <v-card-title class="d-flex justify-space-between">
        Vocabulary
        <v-btn variant="text" color="primary">IMPORT</v-btn>
      </v-card-title>

      <v-text-field
        prepend-inner-icon="$mdiMagnify"
        placeholder="Search for words..."
        class="mx-4 rounded-pill"
        variant="outlined"
        density="comfortable"
        hide-details
      ></v-text-field>

      <v-list>
        <v-list-item>
          <v-btn prepend-icon="$mdiPlus" variant="text" block class="justify-start">
            Add category
          </v-btn>
        </v-list-item>

        <v-list-item v-for="(item, index) in categories" :key="index">
          <template v-slot:prepend>
            <v-icon :color="item.iconColor">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.words }} words</v-list-item-subtitle>
          <template v-slot:append>
            <span v-if="item.progress" class="text-grey">{{ item.progress }}%</span>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-group v-model="generalList">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="$mdiBook"
              title="New General Service List"
            ></v-list-item>
          </template>
        </v-list-group>

        <v-list-group v-model="oxfordList">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="$mdiBook"
              title="Oxford 3000 & 5000"
            ></v-list-item>
          </template>
        </v-list-group>
      </v-list>
    </v-card>

    <v-btn
      class="floating-button"
      color="primary"
      prepend-icon="$mdiPlus"
      position="fixed"
      rounded="lg"
    >
      Word
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const generalList = ref(true)
const oxfordList = ref(true)

const categories = [
  { title: 'Idioms', words: 2, icon: '$mdiWater', iconColor: 'amber' },
  { title: 'IELTS', words: 17, icon: '$mdiLeaf', iconColor: 'orange', progress: 6 },
  { title: 'Linking words', words: 46, icon: '$mdiRuler', iconColor: 'orange', progress: 87 },
  { title: 'Smart Book', words: 228, icon: '$mdiNotebook', iconColor: 'blue', progress: 78 },
  { title: 'Свои слова', words: 79, icon: '$mdiCamera', iconColor: 'grey', progress: 5 },
  { title: 'Анатомия', words: 120, icon: '$mdiBone', iconColor: 'amber', progress: 2 },
  { title: 'Археология', words: 74, icon: '$mdiFlowerTulip', iconColor: 'red' },
]
</script>

<style scoped>
.floating-button {
  right: calc(50% - 104px / 2);
  bottom: 80px;
}
</style>
