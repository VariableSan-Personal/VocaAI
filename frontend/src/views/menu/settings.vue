<script lang="ts" setup>
import type { AIServiceConfig } from '@/shared/ai/lib'
import { AIServiceType } from '@/shared/ai/lib/constants'
import { useAIStore } from '@/stores/useAIStore'
import { reactive, ref } from 'vue'

definePage({
  meta: {
    showBack: true,
    title: 'Settings',
    hideBottomNav: true,
  },
})

const aiStore = useAIStore()

const selectedService = ref(aiStore.currentServiceType)
const aiConfig = reactive<AIServiceConfig>({
  apiKey: aiStore.config?.apiKey ?? '',
})

const items = Object.values(AIServiceType)

const handleServiceChange = () => {
  if (selectedService.value && aiConfig) {
    aiStore.initService(selectedService.value, aiConfig)
  }
}
</script>

<template>
  <v-container>
    <v-list>
      <v-list-item>
        <v-select v-model="selectedService" :items="items" label="Select AI Service" />
      </v-list-item>

      <v-text-field label="API Key" v-model="aiConfig.apiKey"></v-text-field>
    </v-list>

    <v-btn @click="handleServiceChange"> Save </v-btn>
  </v-container>
</template>
