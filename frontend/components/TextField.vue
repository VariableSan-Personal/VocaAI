<script lang="ts" setup>
	defineProps<{
		placeholder?: string
		iconName?: string
	}>()

	const modelValue = defineModel<string>()
</script>

<template>
	<label class="input input-bordered flex items-center gap-4">
		<Icon v-if="iconName" :name="iconName" />
		<input v-model="modelValue" type="text" :placeholder="placeholder" class="grow" />
	</label>
</template>
