<script setup lang="ts">
	const routes = [
		{
			name: 'learn',
			title: 'Learn',
			icon: 'mdi-text-box',
		},
		{
			name: 'vocabulary',
			title: 'Vocabulary',
			icon: 'mdi-book-open',
		},
		{
			name: 'menu',
			title: 'Menu',
			icon: 'mdi-menu',
		},
	]
</script>

<template>
	<v-bottom-navigation grow v-if="!$route.meta.hideBottomNav">
		<v-btn v-for="route in routes" :key="route.title" :to="{ name: route.name }">
			<v-icon :icon="route.icon" class="mb-1"></v-icon>
			<p>{{ route.title }}</p>
		</v-btn>
	</v-bottom-navigation>
</template>
