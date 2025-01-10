<script setup lang="ts">
	const routes = [
		{
			name: 'learn',
			title: 'Learn',
			icon: 'uil:university',
		},
		{
			name: 'vocabulary',
			title: 'Vocabulary',
			icon: 'uil:book-open',
		},
		{
			name: 'menu',
			title: 'Menu',
			icon: 'uil:list-ul',
		},
	]
</script>

<template>
	<div v-if="!$route.meta.hideBottomNav" class="btm-nav relative">
		<NuxtLink
			v-for="route in routes"
			:key="route.title"
			:to="{ name: route.name }"
			class="btm-nav-link"
			:class="{ active: $route.name === route.name }"
		>
			<Icon :name="route.icon"></Icon>
			<p>{{ route.title }}</p>
		</NuxtLink>
	</div>
</template>
