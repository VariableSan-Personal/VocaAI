<script lang="ts" setup>
	import { whenever } from '@vueuse/core'

	const { notification } = useGlobalStore()

	whenever(
		() => notification.show,
		() => {
			setTimeout(() => {
				notification.show = false
			}, notification.timeout)
		}
	)
</script>

<template>
	<transition name="fade">
		<div
			v-if="notification.show"
			role="alert"
			class="alert fixed right-4 top-4 flex w-max min-w-32 max-w-64 items-center gap-x-3"
			:class="{
				'alert-success': notification.color === 'success',
				'alert-info': notification.color === 'info',
				'alert-warning': notification.color === 'warning',
				'alert-error': notification.color === 'error',
			}"
		>
			<Icon name="uil:info-circle" />
			{{ notification.message }}
		</div>
	</transition>
</template>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.3s;
	}
	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
