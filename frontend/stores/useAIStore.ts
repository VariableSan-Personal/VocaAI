import { AIServiceFactory, AIServiceType, LocalStorageKeys, type AIServiceConfig } from '@/shared'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAIStore = defineStore('ai', () => {
	const currentServiceType = ref<AIServiceType>(AIServiceType.ChatGPT)
	const factory = AIServiceFactory.getInstance()
	const config = ref<AIServiceConfig | null>(null)

	const initService = (type: AIServiceType, serviceConfig: AIServiceConfig) => {
		factory.createService(type, serviceConfig)

		currentServiceType.value = type
		config.value = serviceConfig

		localStorage.setItem(LocalStorageKeys.SelectedAIService, type)
		localStorage.setItem(LocalStorageKeys.AIServiceConfig, JSON.stringify(serviceConfig))
	}

	const getCurrentService = () => {
		return factory.getCurrentService()
	}

	const getConfigFieldsByServiceName = (serviceName: AIServiceType) => {
		return factory.getServiceConfigFields(serviceName)
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
		getConfigFieldsByServiceName,
	}
})
