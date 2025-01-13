<script lang="ts" setup>
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
		title: 'Add new word',
	} satisfies CustomPageMeta)

	const { getCurrentService } = useAIStore()

	const prompt = ref('')

	const generateSomething = async () => {
		const res = await getCurrentService()?.generateSuggestion(prompt.value)
		console.info(res)
	}
</script>

<template>
	<div class="container">
		<section class="grid grid-cols-12 gap-4">
			<input
				v-model="prompt"
				class="input input-bordered col-span-8 w-full max-w-sm"
				name="prompt"
				placeholder="Prompt"
			/>

			<button class="btn btn-warning col-span-4" @click="generateSomething">Generate</button>
		</section>
	</div>
</template>
