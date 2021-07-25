<template>
	<div class="shop-info" v-if="Object.keys(shop).length != 0">
		<div class="shop-top">
			<img :src="shop.logo" />
			<span class="title">{{ shop.name }}</span>
		</div>
		<div class="shop-middle">
			<div class="shop-middle-item shop-middle-left">
				<div class="info-sells">
					<div class="sells-count">
						{{ shop.sells | sellCountFilter }}
					</div>
					<div class="sells-text">总销量</div>
				</div>
				<div class="info-goods">
					<div class="goods-count">{{ shop.goodsCount }}</div>
					<div class="goods-text">全部宝贝</div>
				</div>
			</div>
			<div class="shop-middle-item shop-middle-right">
				<div class="shop-describe" v-for="(item, index) in shop.score">
					<span class="text">{{ item.name }}</span>
					<span class="score" :class="{ 'score-better': item.isBetter }">{{
						item.score
					}}</span>
					<span class="better"
						><i :class="{ 'better-more': item.isBetter }">{{
							item.isBetter ? "高" : "低"
						}}</i></span
					>
				</div>
			</div>
		</div>
		<div class="shop-bottom">
			<div class="enter-shop">进店逛逛</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			shop: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		filters: {
			sellCountFilter(value) {
				if (value < 10000) return value;
				else return (value / 10000).toFixed(1) + "万";
			}
		}
	};
</script>

<style>
	.shop-info {
		display: flex;
		flex-direction: column;
		padding: 25px 8px;
		border-bottom: 5px solid #f2f5f8;
	}
	.shop-top {
		line-height: 45px;
		/* 让元素垂直中心对齐 */
		display: flex;
		align-items: center;
	}
	.shop-top img {
		width: 45px;
		height: 45px;
		border-radius: 50%;
		border: 1px solid rgba(0, 0, 0, 0.1);
	}
	.shop-top .title {
		margin-left: 10px;
		vertical-align: center;
	}
	.shop-middle {
		margin-top: 15px;
		display: flex;
	}
	.shop-middle-item {
		display: flex;
	}
	.shop-middle-item {
		flex: 1;
	}
	.shop-middle-left {
		display: flex;
		justify-content: space-around;
		color: #333;
		text-align: center;
		border-right: 1px solid rgba(0, 0, 0, 0.1);
		align-items: center;
	}
	.sells-count,
	.goods-count {
		font-size: 18px;
	}

	.sells-text,
	.goods-text {
		margin-top: 10px;
		font-size: 12px;
	}
	.shop-middle-right {
		display: flex;
		margin-left: 30px;
		flex-direction: column;
		font-size: 12px;
		color: #333;
	}
	.shop-describe {
		display: flex;
	}
	.shop-describe span {
		padding: 5px 0;
		flex: 1;
		text-align: center;
	}
	.shop-describe .text {
		flex: 2;
	}
	.shop-middle-right .score {
		margin-left: 3px;
		color: #5ea732;
		width: 10px;
	}
	.shop-middle-right .score-better {
		color: #f13e3a;
	}
	.shop-middle-right .better i {
		background-color: #5ea732;
		color: #fff;
	}
	.shop-middle-right .better-more {
		background-color: #f13e3a !important;
	}
	.shop-bottom {
		text-align: center;
		margin-top: 10px;
	}

	.enter-shop {
		display: inline-block;
		font-size: 14px;
		background-color: #f2f5f8;
		width: 150px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border-radius: 10px;
	}
</style>