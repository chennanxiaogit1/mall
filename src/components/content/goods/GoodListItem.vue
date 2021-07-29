<template>
	<div class="goods-item" @click="itemClick">
		<img v-lazy="showImage" alt="" @load="imageLoad" />
		<div class="goods-info">
			<p>{{ goodsItem.title }}</p>
			<span class="price">{{ goodsItem.price }}</span>
			<span class="collect">{{ goodsItem.cfav }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		computed: {
			showImage() {
				return this.goodsItem.image || this.goodsItem.show.img;
			}
		},
		methods: {
			imageLoad() {
				// 1.首页里面的上拉加载 与 详情页的上拉
				// if (this.$route.path.indexOf("/home")) {
				// 	this.$bus.$emit("homeItemImageLoad");
				// } else if (this.$route.path.indexOf("/detail")) {
				// 	this.$bus.$emit("detailItemImageLoad");
				// }
				this.$bus.$emit("ItemImageLoad");
			},
			itemClick() {
				this.$router.push("/detail/" + this.goodsItem.iid);
			}
		}
	};
</script>

<style>
	.goods-item {
		width: 49%;
		padding-bottom: 5px;
	}
	.goods-item img {
		width: 100%;

		border-radius: 5px;
	}
	.goods-info {
		font-size: 12px;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price {
		color: #fe909d;
		margin-right: 20px;
	}
	.goods-info .collect {
		position: relative;
	}
	.goods-info .collect::before {
		content: "";
		position: absolute;
		left: -15px;
		top: 0px;
		width: 14px;
		height: 14px;
		background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
	}
</style>