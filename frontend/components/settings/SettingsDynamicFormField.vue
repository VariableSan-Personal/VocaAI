<script setup lang="ts">
	import type { ConfigField } from '~/shared'

	defineProps<{
		field: ConfigField
	}>()

	const modelValue = defineModel<unknown>()
</script>

<template>
	<div class="form-control">
		<select
			v-if="field.type === 'select'"
			v-model="modelValue"
			class="select select-bordered"
			:required="field.required"
		>
			<option disabled selected>
				{{ field.label }}
			</option>
			<option v-for="opt in field.options" :key="opt.value" :value="opt.value">
				{{ opt.label }}
			</option>
		</select>

		<input
			v-else-if="field.type === 'number'"
			v-model="modelValue"
			:placeholder="field.label"
			type="number"
			:required="field.required"
			:min="field.min"
			:max="field.max"
			step="0.1"
			class="input input-bordered"
		/>

		<input
			v-else
			v-model="modelValue"
			:placeholder="field.label"
			type="text"
			class="input input-bordered"
			:required="field.required"
		/>
	</div>
</template>
