<template>
	<div id="app" @touchmove="touchMove">
		<keep-alive exclude="Detail">
			<router-view></router-view>
		</keep-alive>
		<main-tab-bar></main-tab-bar>
	</div>
</template>

<script>
	import MainTabBar from "components/content/maintabbar/MainTabBar.vue";
	export default {
		name: "App",
		components: {
			MainTabBar
		},
		methods: {
			touchMove(e) {
				e.preventDefault();
			}
		}
	};
</script>

<style>
	@import url("./assets/css/base.css");
</style>
