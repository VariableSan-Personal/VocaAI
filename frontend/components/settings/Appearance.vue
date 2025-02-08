<script lang="ts" setup>
	import CardSettings from '~/components/settings/Card.vue'
	import SelectionDialog from '~/components/settings/SelectionDialog.vue'

	const globalStore = useGlobalStore()
	const { isDark, toggleDark } = toRefs(globalStore)
</script>

<template>
	<CardSettings>
		<template #title>Appearance</template>

		<div class="space-y-4">
			<SelectionDialog
				title="Theme"
				:model-value="isDark ? 'Dark' : 'Light'"
				:list="['Light', 'Dark']"
				@update:model-value="(theme: string) => toggleDark(theme === 'Dark')"
			/>

			<div class="flex items-center justify-between">
				<p class="font-medium">Turn on animation</p>
				<input type="checkbox" class="toggle" disabled />
			</div>

			<SelectionDialog title="UI language" :list="['Match system language']" disabled />
		</div>
	</CardSettings>
</template>
