<template>
	<v-app-bar v-if="$route.meta.showBack">
		<v-btn icon @click="$router.back()">
			<v-icon icon="mdi-arrow-left"></v-icon>
		</v-btn>

		<v-app-bar-title v-if="$route.meta.title">{{ $route.meta.title }}</v-app-bar-title>
	</v-app-bar>
</template>
