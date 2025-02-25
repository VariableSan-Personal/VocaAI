<script lang="ts" setup>
	import { z } from 'zod'
	import type { CustomPageMeta } from '~/shared'

	type Schema = z.output<typeof schema>

	definePageMeta({
		hideBottomNav: true,
		showBack: true,
		title: 'New deck',
	} satisfies CustomPageMeta)

	const router = useRouter()
	const cardStore = useCardStore()

	const iconList = [
		'uil:angry',
		'uil:smile',
		'uil:sad',
		'uil:confused',
		'uil:grin',
		'uil:heart',
		'uil:star',
		'uil:sun',
		'uil:moon',
		'uil:cloud',
		'uil:thunderstorm',
		'uil:snowflake',
		'uil:wind',
		'uil:rainbow',
		'uil:fire',
		'uil:bolt',
		'uil:eye',
		'uil:clock',
		'uil:calendar',
		'uil:bell',
		'uil:bookmark',
		'uil:home',
		'uil:map',
		'uil:compass',
		'uil:music',
		'uil:camera',
		'uil:video',
		'uil:phone',
		'uil:envelope',
	]

	const schema = z.object({
		name: z.string().min(1, 'Name is required'),
		icon: z.string().min(1, 'Icon is required'),
	})

	const form = reactive<Schema>({
		name: '',
		icon: '',
	})
	const errors = ref<Record<string, string>>({})

	// TODO: Extract repeated validation schema creation into a separate composable for better code reusability and maintainability
	const onSubmit = async () => {
		clearValidationErrors()

		try {
			const { icon, name } = schema.parse(form)
			await cardStore.addDeck(name, icon)
			router.push({ name: 'vocabulary' })
		} catch (err) {
			if (err instanceof z.ZodError) {
				err.errors.forEach((error) => {
					const path = error.path.join('.')
					errors.value[path] = error.message
				})
			}
		}
	}

	const clearValidationErrors = () => {
		errors.value = {}
	}
</script>

<template>
	<div class="container">
		<section>
			<form class="space-y-4" @submit.prevent="onSubmit">
				<TextField v-model="form.name" placeholder="Deck name" :error="errors.name" />

				<div class="input-bordered space-y-4 rounded-md border p-4">
					<div class="space-y-1">
						<p class="text-sm">Deck icon</p>
						<span v-if="errors.icon" class="text-xs text-error">
							{{ errors.icon }}
						</span>
					</div>

					<div class="grid grid-cols-4 gap-4">
						<div
							v-for="(icon, index) in iconList"
							:key="index"
							:class="[
								'mx-auto flex cursor-pointer rounded-full p-1',
								{
									'bg-primary text-white': form.icon === icon,
								},
							]"
						>
							<Icon size="34" :name="icon" @click="() => (form.icon = icon)" />
						</div>
					</div>
				</div>

				<Button
					type="submit"
					variant="primary"
					class="fixed bottom-6 right-1/2 w-1/2 !translate-x-1/2 rounded-xl"
				>
					Add
				</Button>
			</form>
		</section>
	</div>
</template>
