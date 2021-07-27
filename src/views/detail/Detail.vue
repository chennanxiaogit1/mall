<template>
	<div id="detail">
		<!-- 导航栏 -->
		<detail-nav-bar
			class="detail-nav"
			@titleClick="titleClick"
			ref="navBar"
		></detail-nav-bar>
		<!-- 滑动区域 -->
		<scroll class="context" ref="scroll" @scroll="scroll">
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
			<!-- 5.商品的参数 -->
			<detail-param-info
				:param-info="paramInfo"
				ref="params"
			></detail-param-info>
			<!-- 6.商品的评论 -->
			<detail-comment-info
				:comment-info="commentInfo"
				ref="comment"
			></detail-comment-info>
			<!-- 7.商品推荐 -->
			<good-list :goods-list="recommendInfo" ref="recommend"></good-list>
		</scroll>
		<!-- 底部导航栏 -->
		<detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
		<!-- 回到顶部 -->
		<back-top @click.native="backTopItem" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
	import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
	import Scroll from "@/components/common/scroll/Scroll";
	import GoodList from "@/components/content/goods/GoodList";

	import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
	import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
	import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
	import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
	import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
	import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";

	import { debounce } from "@/common/utils";
	import { itemListenerMixin, backTopMinxin } from "@/common/mixins";

	import {
		getDetail,
		Goods,
		Shop,
		GoodsParam,
		getRecommend
	} from "network/detail.js";
	export default {
		name: "Detail",
		data() {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				recommendInfo: [],
				themeTopYs: [],
				currentIndex: 0
			};
		},
		components: {
			DetailNavBar,
			DetailSwiper,
			Scroll,
			GoodList,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			DetailBottomBar
		},
		created() {
			// 1.保存传入的Id
			this.iid = this.$route.params.iid;
			// 2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				// 1.获取顶部轮播图
				// console.log(res);
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
				// 5.保存商品的参数
				this.paramInfo = new GoodsParam(
					res.result.itemParams.info,
					res.result.itemParams.rule
				);
				// 6.保存评论信息
				if (res.result.rate.cRate != 0) {
					this.commentInfo = res.result.rate.list[0];
				}
			});
			// 3.请求推荐数据
			getRecommend().then(res => {
				// console.log(res);
				this.recommendInfo = res.data.list;
			});
		},
		methods: {
			// 1.图片发生变化 更新高度
			imageLoad() {
				this.$refs.scroll.Refresh();
				debounce(() => {
					this.themeTopYs.push(0);
					this.themeTopYs.push(this.$refs.params.$el.offsetTop);
					this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
					this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
					// console.log(this.themeTopYs);
				})();
			},
			titleClick(index) {
				// console.log(index);
				this.$refs.scroll.scrollto(0, -this.themeTopYs[index], 500);
			},
			// 详情页的滚动
			scroll(position) {
				// console.log(-position.y);
				for (let i = 0; i < this.themeTopYs.length; i++) {
					if (
						this.currentIndex != i &&
						((-position.y > this.themeTopYs[i] &&
							-position.y < this.themeTopYs[i + 1]) ||
							(i == this.themeTopYs.length - 1 &&
								-position.y > this.themeTopYs[i]))
					) {
						this.currentIndex = i;
						this.$refs.navBar.currentIndex = this.currentIndex;
					}
				}

				// 2.回到顶部
				this.isShowBackTop = Math.abs(position.y) > 1000;
			},
			// 加入购物车
			addToCart() {
				// 1.创建对象
				const obj = {};
				// 2.对象的信息
				obj.iid = this.iid;
				obj.imgURL = this.topImages[0];
				obj.title = this.goods.title;
				obj.desc = this.goods.desc;
				obj.newPrice = this.goods.nowPrice;
				// 3.添加到购物车中
				this.$store.dispatch("addCart", obj).then(res => {
					this.$toast.show(res);
					// console.log(this.$toast.show(res));
					// this.$refs.toast.show(res);
				});
			}
		},
		mounted() {
			// console.log(1);
		},
		mixins: [itemListenerMixin, backTopMinxin],
		destroyed() {
			// 取消全局事件
			this.$bus.$off("imageLoad", () => {
				debounce(this.$refs.scroll.Refresh, 20);
			});
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
		/* z-index: 9; */
		height: calc(100% - 44px - 49px);
	}
</style>
