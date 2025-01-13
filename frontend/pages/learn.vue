<script setup lang="ts">
	const spacedRepetitionList = [
		{
			icon: 'uil:pen',
			title: '1 category chosen',
		},
		{
			icon: 'uil:plus',
			title: 'Learn new words',
			subtitle: 'Learned today: 0 of 10',
		},
		{
			icon: 'uil:clock',
			title: 'Review words',
			subtitle: 'Words to review: 178',
		},
		{
			icon: 'uil:lightbulb',
			title: 'Mixed mode',
			subtitle: 'Both new words and words for review will appear',
		},
	]

	const { getCurrentService } = useAIStore()

	const prompt = ref('')

	const generateSomething = async () => {
		const res = await getCurrentService()?.generateSuggestion(prompt.value)
		console.info(res)
	}
</script>

<template>
	<div class="container space-y-4">
		<button class="btn btn-warning" @click="generateSomething">Generate something</button>

		<input
			v-model="prompt"
			class="input input-bordered w-full max-w-sm"
			name="prompt"
			placeholder="Prompt"
		/>

		<section>
			<h6 class="mb-1 text-xl font-semibold text-secondary">Spaced repetition</h6>
			<ul class="menu w-full rounded-box gap-2">
				<li v-for="(item, idx) in spacedRepetitionList" :key="idx">
					<button class="btn btn-ghost btn-sm gap-2 h-full py-3">
						<Icon :name="item.icon" class="h-5 w-5" />
						<div>
							{{ item.title }}
							<small v-if="item.subtitle" class="block text-gray-500">
								{{ item.subtitle }}
							</small>
						</div>
					</button>
				</li>
			</ul>
		</section>
	</div>
</template>
