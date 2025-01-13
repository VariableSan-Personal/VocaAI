<script lang="ts" setup>
	import CardSettings from '~/components/settings/Card.vue'
</script>

<template>
	<CardSettings>
		<template #title>General</template>

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
					<p class="font-medium">Enable the "choose the correct word" exercise for words in</p>
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
					<p class="text-sm text-primary">Recall in both directions (twice as many flashcards)</p>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<div>
					<p class="font-medium">Word review mode</p>
					<p class="text-sm text-primary">Recall in both directions (twice as many flashcards)</p>
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
	</CardSettings>
</template>
