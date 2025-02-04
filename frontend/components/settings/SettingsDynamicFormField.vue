<script setup lang="ts">
	import SelectionDialog from '@/components/settings/SelectionDialog.vue'
	import type { ConfigField } from '~/shared'

	defineProps<{
		field: ConfigField
	}>()

	defineEmits(['update:modelValue'])

	const modelValue = defineModel<unknown>()
</script>

<template>
	<div class="form-control">
		<SelectionDialog
			v-if="field.type === 'select'"
			v-model="modelValue"
			:title="field.label"
			:list="field.options"
		>
			<template #list-item="{ item, dialog }">
				<li>
					<a
						@click="
							() => {
								$emit('update:modelValue', item?.value)
								dialog?.close()
							}
						"
					>
						{{ item?.label }}
					</a>
				</li>
			</template>
		</SelectionDialog>

		<div v-else-if="field.type === 'number'">
			<label class="label px-0">
				<span class="label-text">
					{{ field.label }}
				</span>
			</label>

			<input
				v-model="modelValue"
				type="number"
				:required="field.required"
				:min="field.min"
				:max="field.max"
				step="0.1"
				class="input input-bordered w-full"
			/>
		</div>

		<div v-else>
			<label class="label px-0">
				<span class="label-text">
					{{ field.label }}
				</span>
			</label>

			<input
				v-model="modelValue"
				type="text"
				class="input input-bordered w-full"
				:required="field.required"
			/>
		</div>
	</div>
</template>
