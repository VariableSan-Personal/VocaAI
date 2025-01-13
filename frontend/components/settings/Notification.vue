<script lang="ts" setup>
	import CardSettings from '~/components/settings/Card.vue'
</script>

<template>
	<CardSettings>
		<template #title>Notifications</template>

		<div class="space-y-4">
			<div class="flex items-center justify-between">
				<p class="font-medium">Enable notifications</p>
				<input type="checkbox" class="toggle" />
			</div>

			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium">Silent mode</p>
					<p class="text-sm text-base-content/70">22:00 - 08:00</p>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium">Notification frequency limit</p>
					<p class="text-sm text-base-content/70">Once in 2 hours</p>
				</div>
			</div>
		</div>
	</CardSettings>
</template>
