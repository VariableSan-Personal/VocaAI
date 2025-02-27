<script lang="ts" setup>
	import { AIServiceType, type AIServiceConfig, type ConfigField } from '@/shared'
	import CardSettings from '~/components/settings/Card.vue'
	import SelectionDialog from '~/components/settings/SelectionDialog.vue'
	import SettingsDynamicFormField from '~/components/settings/SettingsDynamicFormField.vue'

	const aiStore = useAIStore()
	const { showSuccess } = useGlobalStore()
	const logger = useCustomLogger('AIService Page')

	const items = Object.values(AIServiceType)

	// TODO: Replace with reactive and replace watch with computed
	const selectedService = ref(aiStore.currentServiceType)
	const configFields = ref<ConfigField[]>()
	const aiConfig = ref<AIServiceConfig>({})

	const handleServiceChange = () => {
		if (selectedService.value && aiConfig.value) {
			try {
				aiStore.setupAIService(selectedService.value, aiConfig.value)
				showSuccess('AI service settings updated')
			} catch (error) {
				logger.error(error)
			}
		}
	}

	const onServiceChange = (value: AIServiceType) => {
		configFields.value = aiStore.getConfigFieldsByServiceName(value)
		aiConfig.value = {}
	}

	watch(
		() => aiStore.initialized,
		(initialized) => {
			if (initialized) {
				selectedService.value = aiStore.currentServiceType
				configFields.value = aiStore.getConfigFieldsByServiceName(selectedService.value)
				aiConfig.value = aiStore.config ?? {}
			}
		},
		{
			immediate: true,
		}
	)
</script>

<template>
	<CardSettings>
		<template #title>AI Service Settings</template>

		<SelectionDialog
			v-model="selectedService"
			title="AI Service"
			:list="items"
			@update:model-value="onServiceChange($event as AIServiceType)"
		/>

		<div v-if="configFields?.length" class="space-y-4">
			<div v-for="(item, index) in configFields" :key="index" class="form-control">
				<SettingsDynamicFormField v-model="aiConfig[item.name]" :field="item" class="w-full" />
			</div>
		</div>

		<div class="card-actions mt-6 justify-end">
			<Button variant="primary" @click="handleServiceChange">Apply</Button>
		</div>
	</CardSettings>
</template>
