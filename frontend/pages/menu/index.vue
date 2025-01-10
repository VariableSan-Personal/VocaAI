<script setup>
	definePageMeta({
		title: 'Menu',
	})

	const menuItems = [
		{ icon: 'uil:glass-martini', text: 'Full version is active', iconClass: 'text-amber' },
		{ icon: 'uil:cog', text: 'Settings', route: 'menu-settings' },
		{ icon: 'uil:web-grid', text: 'Other languages and apps' },
		{ icon: 'uil:star', text: 'Rate' },
		{ icon: 'uil:share-alt', text: 'Share' },
		{ type: 'separator' },
		{ icon: 'uil:save', text: 'Create backup' },
		{ icon: 'uil:database-alt', text: 'Restore data' },
		{ icon: 'uil:sync', text: 'Reset all progress' },
		{ type: 'separator' },
		{ icon: 'uil:question-circle', text: 'Support' },
		{ icon: 'uil:info-circle', text: 'About' },
	]
</script>

<template>
	<div class="container">
		<ul class="menu m-0 p-0">
			<template v-for="(item, index) in menuItems" :key="index">
				<hr v-if="item.type === 'separator'" class="my-2" />
				<li v-else>
					<NuxtLink v-if="item.route" :to="{ name: item.route }" class="flex items-center px-2">
						<Icon :name="item.icon" :class="['mr-2', item.iconClass || 'text-primary']" />
						{{ item.text }}
					</NuxtLink>
					<div v-else class="flex items-center px-2">
						<Icon :name="item.icon" :class="['mr-2', item.iconClass || 'text-primary']" />
						{{ item.text }}
					</div>
				</li>
			</template>
		</ul>
	</div>
</template>
