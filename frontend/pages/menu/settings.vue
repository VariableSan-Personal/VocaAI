<script lang="ts" setup>
	import type { AIServiceConfig, ConfigField } from '@/shared/ai/lib'
	import { AIServiceType } from '@/shared/ai/lib/constants'
	import { useGlobalStore } from '@/stores'
	import { useAIStore } from '@/stores/useAIStore'
	import { ref } from 'vue'
	import SettingsDynamicFormField from '~/components/SettingsDynamicFormField.vue'

	definePageMeta({
		showBack: true,
		title: 'Settings',
		hideBottomNav: true,
	})

	const aiStore = useAIStore()
	const { showNotification } = useGlobalStore()

	const items = Object.values(AIServiceType)

	const selectedService = ref(aiStore.currentServiceType)
	const configFields = ref<ConfigField[]>(
		aiStore.getConfigFieldsByServiceName(selectedService.value)
	)
	const aiConfig = ref<AIServiceConfig>(aiStore.config ?? {})

	const handleServiceChange = () => {
		if (selectedService.value && aiConfig.value) {
			try {
				aiStore.initService(selectedService.value, aiConfig.value)
			} catch (error) {
				showNotification(error as string, { color: 'red' })
			}
		}
	}

	const onServiceChange = (value: AIServiceType) => {
		configFields.value = aiStore.getConfigFieldsByServiceName(value)
		aiConfig.value = {}
	}
</script>

<template>
	<div class="container">
		<div class="space-y-6">
			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="mb-2 text-sm text-base-content/70">AI Service Settings</h2>

					<div class="form-control w-full">
						<label class="label">
							<span class="label-text">Select AI Service</span>
						</label>
						<select
							v-model="selectedService"
							class="select select-bordered w-full"
							@change="onServiceChange(($event.target as HTMLInputElement).value as AIServiceType)"
						>
							<option value="" disabled selected>Choose an AI service</option>
							<option v-for="service in items" :key="service" :value="service">
								{{ service }}
							</option>
						</select>
					</div>

					<div v-if="configFields?.length" class="mt-6 space-y-4">
						<label class="label">
							<span class="label-text">AI Config Fields</span>
						</label>
						<div v-for="(item, index) in configFields" :key="index" class="form-control">
							<SettingsDynamicFormField
								v-model="aiConfig[item.name]"
								:field="item"
								class="w-full"
							/>
						</div>
					</div>

					<div class="card-actions mt-6 justify-end">
						<button class="btn btn-primary" @click="handleServiceChange">Save Changes</button>
					</div>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="mb-2 text-sm text-base-content/70">Appearance</h2>

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
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="mb-2 text-sm text-base-content/70">General</h2>

					<div class="space-y-4">
						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">First language</p>
								<p class="text-sm text-primary">Русский</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Enable the keyboard input exercise for words in</p>
								<p class="text-sm text-primary">English only</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">
									Enable the "choose the correct word" exercise for words in
								</p>
								<p class="text-sm text-primary">English and Russian</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Display new words first in</p>
								<p class="text-sm text-primary">English</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">New word learning mode</p>
								<p class="text-sm text-primary">
									Recall in both directions (twice as many flashcards)
								</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Word review mode</p>
								<p class="text-sm text-primary">
									Recall in both directions (twice as many flashcards)
								</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Review interval for words to become "Mastered"</p>
								<p class="text-sm text-primary">15 days</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<p class="font-medium">Show transcription</p>
							<input type="checkbox" class="toggle" checked />
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Show pictures</p>
								<p class="text-sm text-primary">When translation is shown</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Daily goal (new words learned)</p>
								<p class="text-sm text-primary">10</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<div>
								<p class="font-medium">Review words from</p>
								<p class="text-sm text-primary">Chosen categories only</p>
							</div>
						</div>

						<div class="flex items-center justify-between">
							<p class="font-medium">Invert swipe direction</p>
							<input type="checkbox" class="toggle" />
						</div>
					</div>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="mb-2 text-sm text-base-content/70">Notifications</h2>

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
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl">
				<div class="card-body">
					<h2 class="mb-2 text-sm text-base-content/70">Pronunciation</h2>

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
				</div>
			</div>
		</div>
	</div>
</template>
