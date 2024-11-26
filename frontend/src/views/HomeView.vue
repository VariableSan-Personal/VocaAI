<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const dotnetDialog = ref(false)
const javaDialog = ref(false)
const dotnetResponse = ref('')
const javaResponse = ref('')

console.log(import.meta.env)

const fetchDotnetData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_DOTNET_SERVICE_URL}/api/greetings`)
    dotnetResponse.value = response.data
    dotnetDialog.value = true
  } catch (error) {
    console.error(error)
  }
}

const fetchJavaData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_JAVA_SERVICE_URL}/api/greetings`)
    javaResponse.value = response.data
    javaDialog.value = true
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

      <v-col cols="auto">
        <v-btn color="secondary" @click="fetchJavaData">Fetch Java Data</v-btn>
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

    <v-dialog v-model="javaDialog" max-width="500">
      <v-card>
        <v-card-title>Reponse from Java</v-card-title>
        <v-card-text>{{ javaResponse }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text="Close" @click="(javaDialog = false)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
