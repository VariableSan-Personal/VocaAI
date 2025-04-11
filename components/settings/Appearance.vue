<script lang="ts" setup>
	const globalStore = useGlobalStore()
	const { isDark, toggleDark } = toRefs(globalStore)
</script>

<template>
	<SettingsCard>
		<template #title>Appearance</template>

		<div class="space-y-4">
			<ClientOnly>
				<SettingsSelectionDialog
					title="Theme"
					:model-value="isDark ? 'Dark' : 'Light'"
					:list="['Light', 'Dark']"
					@update:model-value="(theme: string) => toggleDark(theme === 'Dark')"
				/>
			</ClientOnly>

			<Checkbox label="Turn on animation" variant="toggle" disabled />

			<SettingsSelectionDialog title="UI language" :list="['Match system language']" disabled />
		</div>
	</SettingsCard>
</template>
