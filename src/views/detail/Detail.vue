<template>
	<div id="detail">
		<!-- 导航栏 -->
		<detail-nav-bar class="detail-nav"></detail-nav-bar>
		<scroll class="context" ref="scroll">
			<!-- 1.轮播图 -->
			<detail-swiper :topImages="topImages"></detail-swiper>
			<!-- 2.商品基本信息 -->
			<detail-base-info :goods="goods"></detail-base-info>
			<!-- 3.商家信息 -->
			<detail-shop-info :shop="shop"></detail-shop-info>
			<!-- 4.商品详情信息 -->
			<detail-goods-info
				:detail-info="detailInfo"
				@imageLoad="imageLoad"
			></detail-goods-info>
		</scroll>
	</div>
</template>

<script>
	import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
	import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
	import Scroll from "@/components/common/scroll/Scroll";

	import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
	import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
	import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";

	import { getDetail, Goods, Shop } from "network/detail.js";
	export default {
		name: "Detail",
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {}
			};
		},
		components: {
			DetailNavBar,
			DetailSwiper,
			Scroll,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo
		},
		created() {
			// 1.保存传入的Id
			this.iid = this.$route.params.iid;
			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// 1.获取顶部轮播图
				console.log(res);
				this.topImages = res.result.itemInfo.topImages;
				// 2.获取商品信息
				this.goods = new Goods(
					res.result.itemInfo,
					res.result.columns,
					res.result.shopInfo.services
				);
				// 3.商家信息
				this.shop = new Shop(res.result.shopInfo);
				// 4.获取商品详情信息
				this.detailInfo = res.result.detailInfo;
			});
		},
		methods: {
			// 1.图片发生变化 更新高度
			imageLoad() {
				this.$refs.scroll.Refresh();
			}
		}
	};
</script>

<style scoped>
	#detail {
		position: relative;
		height: 100vh;
		z-index: 9;
		background-color: #fff;
	}
	.detail-nav {
		position: relative;
		z-index: 10;
		background-color: #fff;
	}
	.context {
		position: relative;
		background-color: #fff;
		z-index: 9;
		height: calc(100% - 44px);
	}
</style>
