<script setup lang="ts">
	import { useAIStore, useGlobalStore } from '@/stores'

	const aiStore = useAIStore()
	const { notification, showNotification } = useGlobalStore()

	onMounted(() => {
		try {
			aiStore.restoreService()
		} catch (error) {
			showNotification(error as string)
		}
	})
</script>

<template>
	<v-responsive>
		<v-app>
			<AppBar />

			<v-main>
				<v-container>
					<slot></slot>
				</v-container>
			</v-main>

			<BottomNav />

			<v-snackbar
				v-model="notification.show"
				:color="notification.color"
				:timeout="notification.timeout"
			>
				{{ notification.message }}
			</v-snackbar>
		</v-app>
	</v-responsive>
</template>

<style>
	.header-link {
		color: rgba(var(--v-theme-on-background), 1);
	}
</style>
