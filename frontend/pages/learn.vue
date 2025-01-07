<script setup lang="ts">
	import type { VListItem } from 'vuetify/components'

	type VListItemProps = VListItem['$props']

	const spacedRepetitionList: VListItemProps[] = [
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

	const { showNotification } = useGlobalStore()

	const file = ref<File>()
</script>

<template>
	<v-container>
		<section>
			<h6 class="text-subtitle-1 text-secondary mb-1">Spaced repetition</h6>
			<v-list :items="spacedRepetitionList" item-props rounded="lg" lines="two"></v-list>
		</section>
	</v-container>
</template>
