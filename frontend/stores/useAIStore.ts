import {
	AIServiceFactory,
	AIServiceValidationError,
	LocalStorageKeys,
	type AIServiceConfig,
	type AIServiceType,
} from '@/shared'
import { useCustomLogger } from '~/composables/useCustomLogger'

export const useAIStore = defineStore('ai', () => {
	const logger = useCustomLogger('useAIStore')
	const { showError } = useGlobalStore()

	const currentServiceType = ref<AIServiceType>()
	const aiFactoryInstance = AIServiceFactory.getInstance()
	const config = ref<AIServiceConfig | null>(null)

	const initialized = ref(false)
	const loading = ref(false)

	const setupAIService = (type: AIServiceType, serviceConfig: AIServiceConfig) => {
		loading.value = true
		try {
			aiFactoryInstance.createService(type, serviceConfig)
		} catch (error) {
			if (error instanceof AIServiceValidationError) {
				showError(error.message)
			}
			throw error
		} finally {
			loading.value = false
		}

		currentServiceType.value = type
		config.value = serviceConfig

		localStorage.setItem(LocalStorageKeys.SelectedAIService, type)
		localStorage.setItem(LocalStorageKeys.AIServiceConfig, JSON.stringify(serviceConfig))
	}

	const getCurrentService = () => {
		return aiFactoryInstance.getCurrentService()
	}

	const getConfigFieldsByServiceName = (serviceName?: AIServiceType) => {
		if (serviceName) {
			return aiFactoryInstance.getServiceConfigFields(serviceName)
		}
		return []
	}

	const initializeAIStore = () => {
		initialized.value = true
	}

	const loadSavedAIConfiguration = () => {
		const savedType = localStorage.getItem(LocalStorageKeys.SelectedAIService)
		const savedConfig = localStorage.getItem(LocalStorageKeys.AIServiceConfig)

		if (!savedType || !savedConfig) {
			return
		}

		try {
			setupAIService(savedType as AIServiceType, JSON.parse(savedConfig))
			initializeAIStore()
		} catch {
			logger.error('Failed to load saved AI configuration')
		}
	}

	onMounted(() => {
		loadSavedAIConfiguration()
	})

	return {
		currentServiceType,
		config,
		initialized,
		loading,
		setupAIService,
		getCurrentService,
		getConfigFieldsByServiceName,
	}
})
