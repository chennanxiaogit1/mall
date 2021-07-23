<template>
	<div class="goods">
		<good-list-item
			v-for="item in goodsList"
			:goodsItem="item"
		></good-list-item>
	</div>
</template>

<script>
	import GoodListItem from "@/components/content/goods/GoodListItem";
	export default {
		props: {
			goodsList: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		components: {
			GoodListItem
		}
	};
</script>

<style>
	.goods {
		width: 100vw;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;

		padding: 2px;
	}
</style>