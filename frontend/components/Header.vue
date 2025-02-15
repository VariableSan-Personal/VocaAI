<template>
	<nav class="navbar justify-between bg-base-100">
		<div class="flex">
			<Button
				v-if="$route.meta.showBack"
				class="p-2 hover:bg-inherit"
				variant="ghost"
				@click="$router.back()"
			>
				<Icon size="24" name="uil:angle-left-b" />
			</Button>

			<h1 v-if="$route.meta.title" class="text-xl">{{ $route.meta.title }}</h1>
		</div>

		<div id="headerContent"></div>
	</nav>
</template>
