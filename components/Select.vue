<script setup lang="ts">
	export interface Option {
		value: string
		label: string
		disabled?: boolean
	}

	interface Props {
		options: Option[]
		modelValue: Option
		placeholder?: string
		size?: 'xs' | 'sm' | 'md' | 'lg'
		bordered?: boolean
		disabled?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		placeholder: 'Select an option',
		size: 'md',
		bordered: true,
		disabled: false,
	})

	const emit = defineEmits<{
		(e: 'update:modelValue', value: Option): void
	}>()

	const handleChange = (event: Event) => {
		const target = event.target as HTMLSelectElement
		const selectedOption = props.options.find((option) => option.value === target.value)

		if (selectedOption) {
			emit('update:modelValue', selectedOption)
		}
	}
</script>

<template>
	<select
		:class="[
			'select w-full',
			{
				'select-bordered': bordered,
				'select-xs': size === 'xs',
				'select-sm': size === 'sm',
				'select-md': size === 'md',
				'select-lg': size === 'lg',
			},
		]"
		:value="modelValue.value"
		:disabled="disabled"
		@change="handleChange"
	>
		<option value="" disabled>{{ placeholder }}</option>
		<option
			v-for="option in options"
			:key="option.value"
			:value="option.value"
			:disabled="option.disabled"
		>
			{{ option.label }}
		</option>
	</select>
</template>
