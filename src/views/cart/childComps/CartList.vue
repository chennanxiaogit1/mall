<template>
	<scroll class="cart-list" ref="scorll">
		<div>
			<cart-list-item
				v-for="item in cartList"
				:itemInfo="item"
			></cart-list-item>
		</div>
	</scroll>
</template>

<script>
	import Scroll from "@/components/common/scroll/Scroll";
	import CartListItem from "@/views/cart/childComps/CartListItem";

	import { mapGetters } from "vuex";
	export default {
		name: "CartList",
		components: {
			Scroll,
			CartListItem
		},
		computed: {
			...mapGetters(["cartList"])
		},
		activated() {
			this.$refs.scorll.Refresh();
		}
	};
</script>

<style scoped>
	.cart-list {
		height: calc(100% - 44px - 49px - 40px);
		overflow: hidden;
	}
</style>