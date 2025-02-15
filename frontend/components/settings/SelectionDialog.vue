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
	<Button
		variant="ghost"
		class="group no-animation flex-col items-start justify-start px-0 disabled:bg-transparent"
		:disabled="disabled"
		no-hover
		@click="dialog?.showModal()"
	>
		<span class="font-medium">{{ title }}</span>
		<span class="text-sm text-primary group-disabled:opacity-20">
			{{ modelValue ? modelValue : 'Not selected' }}
		</span>
	</Button>

	<dialog ref="dialog" class="modal modal-bottom sm:modal-middle">
		<div class="modal-box pt-2">
			<form method="dialog" class="flex justify-end">
				<Button variant="ghost" class="px-0" no-hover>
					<Icon name="uil:x" size="24" />
				</Button>
			</form>

			<slot></slot>

			<ul v-if="list?.length" class="menu w-full gap-2 rounded-box">
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
