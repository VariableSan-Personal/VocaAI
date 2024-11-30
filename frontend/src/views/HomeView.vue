<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const dotnetDialog = ref(false)
const dotnetResponse = ref('')

const fetchDotnetData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOTNET_SERVICE_URL}/api/greetings`)
    dotnetResponse.value = response.data
    dotnetDialog.value = true
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-btn color="primary" @click="fetchDotnetData">Fetch DotNet Data</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="dotnetDialog" max-width="500">
      <v-card>
        <v-card-title>Reponse from DotNet</v-card-title>
        <v-card-text>{{ dotnetResponse }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text="Close" @click="(dotnetDialog = false)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
