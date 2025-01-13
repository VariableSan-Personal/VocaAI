<script lang="ts" setup>
	import CardSettings from '~/components/settings/Card.vue'
</script>

<template>
	<CardSettings>
		<template #title>Appearance</template>

		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium">Theme</p>
					<p class="text-sm text-primary">Match system theme</p>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<p class="font-medium">Turn on animation</p>
				<input type="checkbox" class="toggle" />
			</div>

			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium">UI language</p>
					<p class="text-sm text-primary">Match system language</p>
				</div>
			</div>
		</div>
	</CardSettings>
</template>
