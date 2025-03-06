<script lang="ts" setup>
	defineProps<{
		title?: string
		subtitle?: string
	}>()
	defineEmits(['confirm', 'cancel'])

	const modelValue = defineModel<boolean>()

	const dialog = useTemplateRef('dialog')

	const closeDialog = () => {
		modelValue.value = false
		dialog.value?.close()
	}

	const handleDialogClick = (event: MouseEvent) => {
		if (event.target === dialog.value) {
			closeDialog()
		}
	}

	onMounted(() => {
		dialog.value?.addEventListener('close', closeDialog)
		dialog.value?.addEventListener('click', handleDialogClick)
	})

	onBeforeUnmount(() => {
		dialog.value?.removeEventListener('close', closeDialog)
		dialog.value?.removeEventListener('click', handleDialogClick)
	})

	watch(
		() => modelValue.value,
		(val) => {
			if (val) {
				dialog.value?.showModal()
			} else {
				dialog.value?.close()
			}
		}
	)
</script>

<template>
	<dialog ref="dialog" class="modal modal-middle">
		<div class="modal-box">
			<div class="space-y-2">
				<h4 class="text-xl">
					{{ title }}
				</h4>
				<p>
					{{ subtitle }}
				</p>
			</div>

			<div class="modal-action">
				<form method="dialog" class="space-x-2" @submit="$emit('cancel')">
					<Button variant="ghost" type="submit" class="uppercase">Cancel</Button>
					<Button variant="ghost" type="button" class="uppercase" @click="$emit('confirm')">
						Ok
					</Button>
				</form>
			</div>
		</div>
	</dialog>
</template>
