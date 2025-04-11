<script lang="ts" setup>
	defineProps<{
		id?: string
		label?: string
		disabled?: boolean
		variant?: 'checkbox' | 'toggle'
	}>()

	const modelValue = defineModel<boolean>()
</script>

<template>
	<div class="form-control">
		<label class="label cursor-pointer px-0">
			<span class="label-text" :class="{ 'text-disabled': disabled }">{{ label }}</span>
			<input
				:id="id"
				v-model="modelValue"
				type="checkbox"
				:checked="modelValue"
				:disabled="disabled"
				:class="[variant === 'checkbox' ? 'checkbox-primary checkbox' : 'toggle']"
			/>
		</label>
	</div>
</template>
