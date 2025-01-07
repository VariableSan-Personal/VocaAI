<script setup lang="ts">
	import type { ConfigField } from '~/shared/ai'

	defineProps<{
		field: ConfigField
	}>()

	const modelValue = defineModel<unknown>()
</script>

<template>
	<div class="field-wrapper">
		<v-select
			v-if="field.type === 'select'"
			v-model="modelValue"
			:label="field.label"
			:items="field.options"
			:required="field.required"
			item-title="label"
			item-value="value"
		/>

		<v-number-input
			v-else-if="field.type === 'number'"
			v-model="(modelValue as number)!"
			:label="field.label"
			type="number"
			:required="field.required"
			:min="field.min"
			:max="field.max"
			:step="0.1"
			:reverse="false"
			controlVariant="default"
			:hideInput="false"
			:inset="false"
		/>

		<v-text-field v-else v-model="modelValue" :label="field.label" :required="field.required" />
	</div>
</template>
