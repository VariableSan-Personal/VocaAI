<script lang="ts" setup>
	import { StorageServiceType } from '~/shared'

	const storageServiceTypes = Object.values(StorageServiceType)

	const logger = useCustomLogger('settings-storage')
	const cardStore = useCardStore()

	const selectedService = ref<StorageServiceType | null>(cardStore.currentServiceType)

	const onServiceChange = async (value: StorageServiceType) => {
		try {
			await cardStore.setupStorageService(value)
		} catch (error) {
			logger.error(error)
			selectedService.value = null
		}
	}
</script>

<template>
	<SettingsCard>
		<template #title>Storage</template>

		<SettingsSelectionDialog
			v-model="selectedService"
			title="Storage Service"
			:list="storageServiceTypes"
			@update:model-value="onServiceChange($event as StorageServiceType)"
		/>
	</SettingsCard>
</template>
