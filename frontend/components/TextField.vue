<script lang="ts" setup>
	defineProps<{
		placeholder?: string
		iconName?: string
		error?: string
		disabled?: boolean
	}>()

	const modelValue = defineModel<string>()
</script>

<template>
	<div class="form-control">
		<label
			:class="[
				'input input-bordered flex w-full items-center gap-4',
				{
					'text-disabled': disabled,
				},
			]"
		>
			<Icon v-if="iconName" :name="iconName" />
			<input
				v-model="modelValue"
				type="text"
				:placeholder="placeholder"
				class="grow"
				:disabled="disabled"
			/>
		</label>

		<span v-if="error" class="mt-1 text-xs text-error">
			{{ error }}
		</span>
	</div>
</template>
