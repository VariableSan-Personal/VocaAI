<script setup lang="ts">
import axios from 'axios'
import { reactive } from 'vue'
import ImageUploader from '@/components/ImageUploader.vue'

const baseApi = reactive({
  name: 'Base Api',
  response: '',
  dialog: false,
  url: import.meta.env.VITE_BASE_API,
  file: null,
})

const fetchBaseApiData = async () => {
  try {
    const response = await axios.get(`${baseApi.url}/api/v1/greetings`)
    baseApi.response = response.data
    baseApi.dialog = true
  } catch (error) {
    console.error(error)
  }
}

const uploadImageToBaseApi = async () => {
  if (!baseApi.file) {
    alert('Please select a file to upload.')
    return
  }

  const formData = new FormData()
  formData.append('file', baseApi.file)

  try {
    const response = await axios.post(`${baseApi.url}/api/v1/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

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
        <v-btn color="primary" @click="uploadImageToBaseApi">Upload Image</v-btn>
      </v-col>
    </v-row>

    <v-dialog v-model="baseApi.dialog" max-width="500">
      <v-card>
        <v-card-title>Reponse from {{ baseApi.name }}</v-card-title>
        <v-card-text>{{ baseApi.response }}</v-card-text>
        <v-card-actions>
          <v-btn color="primary" text="Close" @click="(baseApi.dialog = false)"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
