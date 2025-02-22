import {
	AIServiceFactory,
	AIServiceType,
	AIServiceValidationError,
	LocalStorageKeys,
	type AIServiceConfig,
} from '@/shared'
import { useCustomLogger } from '~/composables/useLogger'

export const useAIStore = defineStore('ai', () => {
	const logger = useCustomLogger('useAIStore')

	const { showError } = useGlobalStore()

	const currentServiceType = ref<AIServiceType>(AIServiceType.Gemini)
	const factory = AIServiceFactory.getInstance()
	const config = ref<AIServiceConfig | null>(null)

	const setupAIService = (type: AIServiceType, serviceConfig: AIServiceConfig) => {
		try {
			factory.createService(type, serviceConfig)
		} catch (error) {
			if (error instanceof AIServiceValidationError) {
				showError(error.message)
			}
			throw error
		}

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

	const loadSavedAIConfiguration = () => {
		const savedType = localStorage.getItem(LocalStorageKeys.SelectedAIService)
		const savedConfig = localStorage.getItem(LocalStorageKeys.AIServiceConfig)

		if (!savedType || !savedConfig) {
			return
		}

		try {
			setupAIService(savedType as AIServiceType, JSON.parse(savedConfig))
		} catch {
			logger.error('Failed to load saved AI configuration')
		}
	}

	onMounted(() => {
		loadSavedAIConfiguration()
	})

	return {
		currentServiceType,
		factory,
		config,
		setupAIService,
		getCurrentService,
		getConfigFieldsByServiceName,
	}
})
