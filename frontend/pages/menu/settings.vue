<script lang="ts" setup>
	import type { AIServiceConfig, ConfigField } from '@/shared/ai/lib'
	import { AIServiceType } from '@/shared/ai/lib/constants'
	import { useGlobalStore } from '@/stores'
	import { useAIStore } from '@/stores/useAIStore'
	import { ref } from 'vue'
	import SettingsDynamicFormField from '~/components/SettingsDynamicFormField.vue'

	definePageMeta({
		showBack: true,
		title: 'Settings',
		hideBottomNav: true,
	})

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
				showNotification(error as string)
			}
		}
	}

	const onServiceChange = (value: AIServiceType) => {
		configFields.value = aiStore.getConfigFieldsByServiceName(value)
		aiConfig.value = {}
	}
</script>

<template>
	<v-container>
		<v-select
			v-model="selectedService"
			:items="items"
			label="Select AI Service"
			@update:model-value="onServiceChange"
		/>

		<v-list v-if="configFields?.length" class="mb-4">
			<v-list-item v-for="(item, index) in configFields" :key="index">
				<SettingsDynamicFormField v-model="aiConfig[item.name]" :field="item" />
			</v-list-item>
		</v-list>

		<v-btn @click="handleServiceChange">Save</v-btn>
	</v-container>
</template>
