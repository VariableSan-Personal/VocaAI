<script lang="ts" setup>
	import type { AIServiceConfig, ConfigField } from '@/shared/ai/lib'
	import { AIServiceType } from '@/shared/ai/lib/constants'
	import { useGlobalStore } from '@/stores'
	import { useAIStore } from '@/stores/useAIStore'
	import { reactive, ref } from 'vue'

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

	const aiConfig = reactive<AIServiceConfig>({})

	const handleServiceChange = () => {
		if (selectedService.value && aiConfig) {
			try {
				aiStore.initService(selectedService.value, aiConfig)
			} catch (error) {
				showNotification(error as string)
			}
		}
	}

	const onServiceChange = (value: AIServiceType) => {
		configFields.value = aiStore.getConfigFieldsByServiceName(value)
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
				<v-text-field :label="item.label" v-model="aiConfig[item.name]"></v-text-field>
			</v-list-item>
		</v-list>

		<v-btn @click="handleServiceChange">Save</v-btn>
	</v-container>
</template>
