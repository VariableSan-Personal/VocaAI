<script setup lang="ts">
import ImageUploader from '@/components/ImageUploader.vue'
import { fetchGreetingMessages, submitFileUpload } from '@/shared'
import { reactive } from 'vue'

const baseApi = reactive({
  name: 'Base Api',
  response: '',
  dialog: false,
  file: null,
})

const fetchBaseApiData = async () => {
  try {
    const response = await fetchGreetingMessages()
    baseApi.response = response.data
    baseApi.dialog = true
  } catch (error) {
    console.error(error)
  }
}

const uploadImageToBaseApi = async () => {
  if (!baseApi.file) {
    return
  }

  const formData = new FormData()
  formData.append('file', baseApi.file)

  try {
    const response = await submitFileUpload(formData)

    baseApi.response = response.data
    baseApi.dialog = true
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <v-container>
    <v-btn class="mb-8" color="primary" @click="fetchBaseApiData">
      Fetch {{ baseApi.name }} Data
    </v-btn>

    <v-row align="center" class="border-md pa-4">
      <v-col cols="12">
        <ImageUploader v-model:file="baseApi.file" />
      </v-col>

      <v-col cols="auto">
        <v-btn color="primary" :disabled="!baseApi.file" @click="uploadImageToBaseApi">
          Upload Image
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="baseApi.dialog" max-width="500">
      <v-card>
        <v-card-title>Reponse from {{ baseApi.name }}</v-card-title>
        <v-card-text>{{ baseApi.response }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text="Close" @click="baseApi.dialog = false"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
