<template>
	<div class="card bg-base-100 shadow-xl">
		<div class="card-body">
			<h2 class="mb-2 text-sm text-base-content/70">
				<slot name="title"></slot>
			</h2>

			<slot></slot>
		</div>
	</div>
</template>
