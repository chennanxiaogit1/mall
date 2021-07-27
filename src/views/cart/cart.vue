<template>
	<div class="cart">
		<!-- 1.导航栏 -->
		<nav-bar class="nav-bar"
			><div slot="center">购物车({{ cartLength }})</div>
		</nav-bar>
		<!-- 2.购物车商品 -->
		<cart-list></cart-list>
		<!-- 3.底部导航 -->
		<bottom-bar></bottom-bar>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar";
	import CartList from "@/views/cart/childComps/CartList";
	import BottomBar from "@/views/cart/childComps/BottomBar";

	import { mapGetters } from "vuex";
	export default {
		components: {
			NavBar,
			CartList,
			BottomBar
		},
		computed: {
			// 1.getters转换为计算属性
			...mapGetters(["cartLength"])
		}
	};
</script>

<style scoped>
	.cart {
		height: 100vh;
	}
	.nav-bar {
		background-color: #f69;
		color: #fff;
		font-size: 15px;
		font-weight: 700;
	}
</style>