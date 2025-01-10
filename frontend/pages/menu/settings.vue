<script lang="ts" setup>
	import AIServiceSettings from '@/components/settings/AIServiceSettings.vue'
	import AppearanceSettings from '@/components/settings/AppearanceSettings.vue'
	import GeneralSettings from '@/components/settings/GeneralSettings.vue'
	import NotificationSettings from '@/components/settings/NotificationSettings.vue'
	import PronunciationSettings from '@/components/settings/PronunciationSettings.vue'

	definePageMeta({
		showBack: true,
		title: 'Settings',
		hideBottomNav: true,
	})
</script>

<template>
	<div class="container">
		<div class="space-y-6">
			<AIServiceSettings />

			<AppearanceSettings />

			<GeneralSettings />

			<NotificationSettings />

			<PronunciationSettings />
		</div>
	</div>
</template>
