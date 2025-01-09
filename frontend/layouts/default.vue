<script setup lang="ts">
	import { useAIStore, useGlobalStore } from '@/stores'

	const aiStore = useAIStore()
	const { showNotification } = useGlobalStore()

	onMounted(() => {
		try {
			aiStore.restoreService()
		} catch (error) {
			showNotification(error as string)
		}
	})
</script>

<template>
	<div class="flex min-h-screen w-full flex-col">
		<Header />

		<main class="container mx-auto flex-1 p-4">
			<slot></slot>
		</main>

		<Footer />

		<Notification />
	</div>
</template>
