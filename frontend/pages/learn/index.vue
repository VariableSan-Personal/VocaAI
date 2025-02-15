<script setup lang="ts">
	import type { CustomPageMeta } from '~/shared'

	definePageMeta({
		title: 'Spaced repetition',
	} satisfies CustomPageMeta)

	const spacedRepetitionList = [
		{
			icon: 'uil:plus',
			title: 'Learn new words',
			subtitle: '',
			disabled: false,
			route: 'learn-new-words',
		},
	]
</script>

<template>
	<div class="container space-y-4">
		<section>
			<ul class="menu w-full gap-2 rounded-box">
				<li v-for="(item, idx) in spacedRepetitionList" :key="idx">
					<NuxtLink v-if="item.route" :to="{ name: item.route }" class="flex items-center px-2">
						<Icon :name="item.icon" class="h-5 w-5" />

						<p>
							{{ item.title }}
							<small v-if="item.subtitle" class="block text-gray-500">
								{{ item.subtitle }}
							</small>
						</p>
					</NuxtLink>
				</li>
			</ul>
		</section>
	</div>
</template>
