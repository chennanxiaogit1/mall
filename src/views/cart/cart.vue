<template>
	<div class="cart">
		<nav-bar class="nav-bar"
			><div slot="center">购物车({{ cartLength }})</div></nav-bar
		>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar";

	import { mapGetters } from "vuex";
	export default {
		components: {
			NavBar
		},
		computed: {
			// 1.getters转换为计算属性
			...mapGetters(["cartLength"])
		}
	};
</script>

<style scoped>
	.nav-bar {
		background-color: #f69;
		color: #fff;
		font-size: 15px;
		font-weight: 700;
	}
</style>