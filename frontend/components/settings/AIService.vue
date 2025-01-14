<script lang="ts" setup>
	import { AIServiceType, type AIServiceConfig, type ConfigField } from '@/shared'
	import { useAIStore, useGlobalStore } from '@/stores'

	import CardSettings from '~/components/settings/Card.vue'
	import SettingsDynamicFormField from '~/components/settings/SettingsDynamicFormField.vue'

	const aiStore = useAIStore()
	const { showNotification } = useGlobalStore()

	const items = Object.values(AIServiceType)

	const selectedService = ref(aiStore.currentServiceType)
	const configFields = ref<ConfigField[]>(
		aiStore.getConfigFieldsByServiceName(selectedService.value)
	)
	const aiConfig = ref<AIServiceConfig>(aiStore.config ?? {})

	const handleServiceChange = () => {
		if (selectedService.value && aiConfig.value) {
			try {
				aiStore.initService(selectedService.value, aiConfig.value)
			} catch (error) {
				showNotification(error as string, { color: 'error' })
			}
		}
	}

	const onServiceChange = (value: AIServiceType) => {
		configFields.value = aiStore.getConfigFieldsByServiceName(value)
		aiConfig.value = {}
	}
</script>

<template>
	<CardSettings>
		<template #title>AI Service Settings</template>

		<div class="form-control mb-4 w-full">
			<label class="label">
				<span class="label-text">Select AI Service</span>
			</label>
			<select
				v-model="selectedService"
				class="select select-bordered w-full"
				@change="onServiceChange(($event.target as HTMLInputElement).value as AIServiceType)"
			>
				<option value="" disabled selected>Choose an AI service</option>
				<option v-for="service in items" :key="service" :value="service">
					{{ service }}
				</option>
			</select>
		</div>

		<div v-if="configFields?.length" class="space-y-4">
			<label class="label">
				<span class="label-text">AI Config Fields</span>
			</label>
			<div v-for="(item, index) in configFields" :key="index" class="form-control">
				<SettingsDynamicFormField v-model="aiConfig[item.name]" :field="item" class="w-full" />
			</div>
		</div>

		<div class="card-actions mt-6 justify-end">
			<button class="btn btn-primary" @click="handleServiceChange">Save Changes</button>
		</div>
	</CardSettings>
</template>
