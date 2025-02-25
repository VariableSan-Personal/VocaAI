<script setup lang="ts">
	const colorVariants = {
		neutral: 'btn-neutral',
		primary: 'btn-primary',
		secondary: 'btn-secondary',
		accent: 'btn-accent',
		info: 'btn-info',
		success: 'btn-success',
		warning: 'btn-warning',
		error: 'btn-error',
		ghost: 'btn-ghost',
		link: 'btn-link disabled:bg-transparent',
		outline: 'btn-outline',
	}

	type ColorVariants = keyof typeof colorVariants

	const props = defineProps({
		type: {
			type: String as PropType<'button' | 'submit' | 'reset'>,
			default: 'button',
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		variant: {
			type: String as PropType<ColorVariants>,
			default: 'btn-neutral',
		},
		noHover: {
			type: Boolean,
			default: false,
		},
	})

	const emit = defineEmits(['click'])

	const buttonClass = computed(() => [
		'btn',
		colorVariants[props.variant],
		{
			'btn-disabled': props.disabled,
			'hover:bg-transparent': props.noHover,
			'text-disabled': props.variant === 'link' && props.disabled,
		},
	])

	const handleClick = (event: MouseEvent) => {
		if (!props.disabled) {
			emit('click', event)
		}
	}
</script>

<template>
	<button :type="type" :class="buttonClass" :disabled="disabled" @click="handleClick">
		<slot></slot>
	</button>
</template>
