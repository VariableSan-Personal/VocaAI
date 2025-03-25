<script lang="ts" setup>
	definePageMeta({
		showBack: true,
		title: 'Settings',
		hideBottomNav: true,
	})
</script>

<template>
	<div class="container">
		<div class="space-y-6">
			<SettingsAIService />
			<SettingsStorage />
			<SettingsAppearance />

			<!-- <SettingsGeneral />
			<SettingsNotification />
			<SettingsPronunciation /> -->
		</div>
	</div>
</template>
