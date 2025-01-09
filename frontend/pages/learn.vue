<script setup lang="ts">
	const spacedRepetitionList = [
		{
			prependIcon: 'mdi-pencil',
			title: '1 category chosen',
		},
		{
			prependIcon: 'mdi-plus',
			title: 'Learn new words',
			subtitle: 'Learned today: 0 of 10',
		},
		{
			prependIcon: 'mdi-timelapse',
			title: 'Review words',
			subtitle: 'Words to review: 178',
		},
		{
			prependIcon: 'mdi-lightbulb',
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

	const changeTheTheme = () => {}
</script>

<template>
	<v-container>
		<button class="btn" @click="changeTheTheme">
      change the theme
    </button>

		<v-btn color="warning" @click="generateSomething">Generate something</v-btn>
		<v-text-field name="prompt" label="Prompt" v-model="prompt"></v-text-field>

		<section>
			<h6 class="text-subtitle-1 text-secondary mb-1">Spaced repetition</h6>
			<v-list :items="spacedRepetitionList" item-props rounded="lg" lines="two"></v-list>
		</section>
	</v-container>
</template>
