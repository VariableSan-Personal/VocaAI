<script lang="ts" setup>
	import { z } from 'zod'
	import type { CustomPageMeta } from '~/shared'

	type Schema = z.output<typeof schema>

	// TODO: add option to choose a deck in header
	definePageMeta({
		showBack: true,
		hideBottomNav: true,
		title: 'Add new word',
	} satisfies CustomPageMeta)

	const { getCurrentService } = useAIStore()
	const { showError, showWarning } = useGlobalStore()
	const logger = useCustomLogger('AddWord Page')

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
			const res = await currentService?.generateSuggestion(
				form.word,
				form.examples.map((e) => e.text)
			)
			const { original, translated } = currentService.formatGeneratedSuggestion(res)
			const example = form.examples[index]

			example.text = original
			example.translation = translated
		} catch (error) {
			showError('Failed to generate example. Please try again.')
			logger.error(error)
		}
	}

	const handleSubmit = async () => {
		clearValidationErrors()

		try {
			const validatedData = schema.parse(form)
			logger.info(`Form submitted: ${validatedData}`)
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
				<div class="card space-y-4 bg-base-100 p-6 shadow-xl">
					<TextField v-model="form.word" type="text" placeholder="Word" :error="errors.word" />
					<TextField
						v-model="form.transcription"
						type="text"
						placeholder="Transcription (optional)"
					/>
					<TextField
						v-model="form.translation"
						type="text"
						placeholder="Translation"
						:error="errors.translation"
					/>
				</div>

				<div class="space-y-4">
					<Button variant="primary" class="btn-outline w-full" @click="addExample">
						New example
					</Button>

					<div
						v-for="(example, index) in form.examples"
						:key="index"
						class="card bg-base-100 p-6 shadow-xl"
					>
						<div class="mb-4 flex items-center justify-between">
							<span class="font-medium">Example {{ index + 1 }}</span>
							<Button variant="ghost" class="btn-sm" @click="removeExample(index)">
								<Icon name="uil-times" class="text-xl" />
							</Button>
						</div>

						<div class="space-y-4">
							<div class="form-control">
								<!-- TODO: if possible replace textarea with lightweight text editor -->
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

							<Button
								variant="link"
								class="btn-ghost btn-sm w-full"
								@click="generateExample(index)"
							>
								Generate using AI
							</Button>
						</div>
					</div>
				</div>

				<Button type="submit" variant="primary" class="w-full">Add</Button>
			</form>
		</section>
	</div>
</template>
