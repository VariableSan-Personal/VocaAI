<script lang="ts" setup>
	defineProps<{
		placeholder?: string
		iconName?: string
		error?: string
	}>()

	const modelValue = defineModel<string>()
</script>

<template>
	<div class="form-control">
		<label class="input input-bordered flex w-full items-center gap-4">
			<Icon v-if="iconName" :name="iconName" />
			<input v-model="modelValue" type="text" :placeholder="placeholder" class="grow" />
		</label>

		<span v-if="error" class="mt-1 text-xs text-error">
			{{ error }}
		</span>
	</div>
</template>
