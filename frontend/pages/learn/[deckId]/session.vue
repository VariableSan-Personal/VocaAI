<script lang="ts" setup>
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
		title: 'Session',
	} satisfies CustomPageMeta)
</script>

<template>
	<div class="container">
		<h1>Session</h1>
	</div>
</template>
