<script setup lang="ts">
	useAIStore()
	useCardStore()
</script>

<template>
	<div class="flex min-h-screen w-full flex-col">
		<Header class="mb-2" />

		<main class="mb-2 flex-1">
			<slot></slot>
		</main>

		<Footer />

		<Notification />
	</div>
</template>
