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
			<ClientOnly>
				<SelectionDialog
					title="Theme"
					:model-value="isDark ? 'Dark' : 'Light'"
					:list="['Light', 'Dark']"
					@update:model-value="(theme: string) => toggleDark(theme === 'Dark')"
				/>
			</ClientOnly>

			<Checkbox label="Turn on animation" variant="toggle" disabled />

			<SelectionDialog title="UI language" :list="['Match system language']" disabled />
		</div>
	</CardSettings>
</template>
