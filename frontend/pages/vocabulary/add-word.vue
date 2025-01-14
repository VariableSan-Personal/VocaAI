<script lang="ts" setup>
	import { z } from 'zod'
	import type { CustomPageMeta } from '~/shared'

	type Schema = z.output<typeof schema>

	definePageMeta({
		showBack: true,
		hideBottomNav: true,
		title: 'Add new word',
	} satisfies CustomPageMeta)

	const { getCurrentService } = useAIStore()
	const { showError, showWarning } = useGlobalStore()

	const schema = z.object({
		word: z.string().min(1, 'Word is required'),
		transcription: z.string().optional(),
		translation: z.string().min(1, 'Translation is required'),
		examples: z.array(
			z.object({
				text: z.string().min(1, 'Example text is required'),
				translation: z.string().min(1, 'Example translation is required'),
			})
		),
	})

	const form = reactive<Schema>({
		word: '',
		transcription: '',
		translation: '',
		examples: [],
	})

	const errors = ref<Record<string, string>>({})

	const addExample = () => {
		form.examples.push({
			text: '',
			translation: '',
		})
	}

	const removeExample = (index: number) => {
		form.examples.splice(index, 1)
	}

	const generateExample = async (index: number) => {
		const currentService = getCurrentService()
		if (!currentService) {
			showWarning('Please select a service before generating an example.')
			return
		}

		try {
			const res = await currentService?.generateSuggestion(form.word)
			const { original, translated } = currentService.formatGeneratedSuggestion(res)
			const example = form.examples[index]

			example.text = original
			example.translation = translated
		} catch (error) {
			showError('Failed to generate example. Please try again.')
			console.error(error)
		}
	}

	const handleSubmit = async () => {
		clearValidationErrors()

		try {
			const validatedData = schema.parse(form)
			console.log('Form submitted:', validatedData)
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
			<form class="space-y-6" @submit.prevent="handleSubmit">
				<div class="card bg-base-100 p-6 shadow-xl">
					<div class="form-control">
						<input
							v-model="form.word"
							type="text"
							placeholder="Word"
							class="input input-bordered w-full"
						/>
						<span v-if="errors.word" class="mt-1 text-sm text-error">
							{{ errors.word }}
						</span>
					</div>

					<div class="form-control mt-4">
						<input
							v-model="form.transcription"
							type="text"
							placeholder="Transcription (optional)"
							class="input input-bordered w-full"
						/>
					</div>

					<div class="form-control mt-4">
						<input
							v-model="form.translation"
							type="text"
							placeholder="Translation"
							class="input input-bordered w-full"
						/>
						<span v-if="errors.translation" class="mt-1 text-sm text-error">
							{{ errors.translation }}
						</span>
					</div>
				</div>

				<div class="space-y-4">
					<button type="button" class="btn btn-outline btn-primary w-full" @click="addExample">
						New example
					</button>

					<div
						v-for="(example, index) in form.examples"
						:key="index"
						class="card bg-base-100 p-6 shadow-xl"
					>
						<div class="mb-4 flex items-center justify-between">
							<span class="font-medium">Example {{ index + 1 }}</span>
							<button type="button" class="btn btn-ghost btn-sm" @click="removeExample(index)">
								<Icon name="uil-times" class="text-xl" />
							</button>
						</div>

						<div class="space-y-4">
							<div class="form-control">
								<textarea
									v-model="example.text"
									type="text"
									placeholder="Example"
									class="textarea textarea-bordered textarea-md w-full max-w-xs"
									rows="5"
								/>
							</div>

							<div class="form-control">
								<textarea
									v-model="example.translation"
									type="text"
									placeholder="Translation"
									class="textarea textarea-bordered textarea-md w-full max-w-xs"
									rows="5"
								/>
							</div>

							<button
								type="button"
								class="btn btn-ghost btn-link btn-sm w-full"
								@click="generateExample(index)"
							>
								Generate using AI
							</button>
						</div>
					</div>
				</div>

				<button type="submit" class="btn btn-primary w-full">Add</button>
			</form>
		</section>
	</div>
</template>
