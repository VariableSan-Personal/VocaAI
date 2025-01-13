<script lang="ts" setup>
	import CardSettings from '~/components/settings/Card.vue'
</script>

<template>
	<CardSettings>
		<template #title>Pronunciation</template>

		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<p class="font-medium">Automatically pronounce English words</p>
				<input type="checkbox" class="toggle" checked />
			</div>

			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium">Robot voice</p>
					<p class="text-sm text-primary">Default</p>
				</div>
			</div>

			<div class="space-y-2">
				<p class="font-medium">Robot speech rate</p>
				<input type="range" min="0" max="100" class="range" value="50" />
				<div class="text-sm text-primary">1.0</div>
			</div>
		</div>
	</CardSettings>
</template>
