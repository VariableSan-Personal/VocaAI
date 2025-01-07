<script setup lang="ts">
	const fileModel = defineModel<File | File[] | null | undefined>()

	const imagePreview = ref<string | null>(null)

	const onFileChange = (event: Event) => {
		const target = event.target as HTMLInputElement

		if (target.files && target.files.length > 0) {
			const selectedFile = target.files[0]
			if (validateFileType(selectedFile)) {
				const reader = new FileReader()
				reader.onload = (e) => {
					imagePreview.value = e.target?.result as string
				}
				reader.readAsDataURL(selectedFile)
			} else {
				alert('Please upload a valid image file (JPG, JPEG, PNG).')
			}
		}
	}

	const validateFileType = (file: File) => {
		const validTypes = ['image/jpeg', 'image/png']
		return validTypes.includes(file.type)
	}
</script>

<template>
	<div class="d-flex align-center ga-4">
		<v-file-input
			v-model="fileModel"
			accept="image/*"
			label="Upload Image"
			max-width="300px"
			hide-details
			prepend-icon=""
			@change="onFileChange"
		></v-file-input>

		<div>
			<p class="text-subtitle-1">Image Preview:</p>
			<v-img v-if="imagePreview" :src="imagePreview" min-width="300"></v-img>
		</div>
	</div>
</template>
