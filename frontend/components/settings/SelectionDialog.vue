<!-- eslint-disable @typescript-eslint/no-explicit-any -->

<script lang="ts" setup>
	defineProps<{
		title: string
		list?: Array<any>
		disabled?: boolean
	}>()

	const modelValue = defineModel<any>()
	const emit = defineEmits(['update:modelValue'])

	const dialog = useTemplateRef('dialog')

	const handleDialogClick = (event: MouseEvent) => {
		if (event.target === dialog.value) {
			dialog.value?.close()
		}
	}

	const onSelect = (item: any) => {
		emit('update:modelValue', item)
		dialog.value?.close()
	}

	onMounted(() => {
		dialog.value?.addEventListener('click', handleDialogClick)
	})

	onBeforeUnmount(() => {
		dialog.value?.removeEventListener('click', handleDialogClick)
	})
</script>

<template>
	<button
		class="btn btn-ghost no-animation group flex-col items-start justify-start px-0 hover:bg-transparent disabled:bg-transparent"
		:disabled="disabled"
		@click="dialog?.showModal()"
	>
		<span class="font-medium">{{ title }}</span>
		<span class="text-primary text-sm group-disabled:opacity-20">
			{{ modelValue ? modelValue : 'Not selected' }}
		</span>
	</button>

	<dialog ref="dialog" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box pt-2">
			<form method="dialog" class="flex justify-end">
				<button class="btn btn-ghost px-0 hover:bg-transparent">
					<Icon name="uil:x" size="24" />
				</button>
			</form>

			<slot></slot>

			<ul v-if="list?.length" class="menu rounded-box w-full gap-2">
				<slot
					v-for="(item, index) in list"
					:key="index"
					name="list-item"
					:item="item"
					:dialog="dialog"
				>
					<li>
						<a @click="onSelect(item)">
							{{ item }}
						</a>
					</li>
				</slot>
			</ul>
		</div>
	</dialog>
</template>
