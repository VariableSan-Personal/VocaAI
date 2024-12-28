import { defineStore } from 'pinia'
import { AIServiceFactory } from '@/shared/ai/services/factory'
import { AIServiceType } from '@/shared/ai/lib/constants'
import type { AIServiceConfig } from '@/shared/ai/lib/types'
import { ref } from 'vue'
import { LocalStorageKeys } from '@/shared'

export const useAIStore = defineStore('ai', () => {
  const currentServiceType = ref<AIServiceType | null>(null)
  const factory = AIServiceFactory.getInstance()
  const config = ref<AIServiceConfig | null>(null)

  const initService = (type: AIServiceType, serviceConfig: AIServiceConfig) => {
    currentServiceType.value = type
    config.value = serviceConfig
    return factory.createService(type, serviceConfig)
  }

  const getCurrentService = () => {
    return factory.getCurrentService()
  }

  const restoreService = () => {
    const savedType = localStorage.getItem(LocalStorageKeys.SelectedAIService)
    const savedConfig = localStorage.getItem(LocalStorageKeys.AIServiceConfig)

    if (savedType && savedConfig) {
      initService(savedType as AIServiceType, JSON.parse(savedConfig))
    }
  }

  return {
    currentServiceType,
    factory,
    config,
    initService,
    getCurrentService,
    restoreService,
  }
})
