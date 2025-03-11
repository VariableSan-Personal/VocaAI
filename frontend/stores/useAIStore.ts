import {
	AIServiceFactory,
	LocalStorageKeys,
	type AIServiceConfig,
	type AIServiceType,
} from '@/shared'
import { useCustomLogger } from '~/composables/useCustomLogger'

export const useAIStore = defineStore('ai', () => {
	const logger = useCustomLogger('useAIStore')

	const aiFactoryInstance = AIServiceFactory.getInstance()

	const initialized = ref(false)
	const currentServiceType = ref<AIServiceType | undefined>()
	const config = ref<AIServiceConfig | null>(null)

	const setupAIService = (type: AIServiceType, serviceConfig: AIServiceConfig) => {
		try {
			aiFactoryInstance.createService(type, serviceConfig)

			currentServiceType.value = type
			config.value = serviceConfig

			localStorage.setItem(LocalStorageKeys.SelectedAIService, type)
			localStorage.setItem(LocalStorageKeys.AIServiceConfig, JSON.stringify(serviceConfig))
		} catch (error) {
			logger.error(`Failed to setup AI service: ${error}`)
			throw error
		}
	}

	const getCurrentService = () => {
		const service = aiFactoryInstance.getCurrentService()
		if (!service) {
			logger.warn('Attempting to use AI service before initialization')
		}
		return service
	}

	const getConfigFieldsByServiceName = (serviceName?: AIServiceType) => {
		if (!serviceName) {
			return []
		}

		try {
			return aiFactoryInstance.getServiceConfigFields(serviceName)
		} catch (error) {
			logger.error(`Failed to get config fields for ${serviceName}: ${error}`)
			return []
		}
	}

	const loadSavedAIConfiguration = () => {
		const savedType = localStorage.getItem(LocalStorageKeys.SelectedAIService) as AIServiceType
		const savedConfig = localStorage.getItem(LocalStorageKeys.AIServiceConfig)

		if (!savedType || !savedConfig) {
			logger.info('No saved AI configuration found')
			return
		}

		try {
			const parsedConfig = JSON.parse(savedConfig) as AIServiceConfig
			setupAIService(savedType, parsedConfig)
		} catch (error) {
			logger.error(`Failed to load saved AI configuration: ${error}`)
		}
	}

	const resetAIService = () => {
		currentServiceType.value = undefined
		config.value = null
		localStorage.removeItem(LocalStorageKeys.SelectedAIService)
		localStorage.removeItem(LocalStorageKeys.AIServiceConfig)
	}

	onMounted(() => {
		loadSavedAIConfiguration()
		initialized.value = true
	})

	return {
		currentServiceType,
		config,
		initialized,

		setupAIService,
		getCurrentService,
		getConfigFieldsByServiceName,
		resetAIService,
	}
})
