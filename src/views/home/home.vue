<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

		<scroll
			class="content"
			ref="scroll"
			:probe-type="3"
			@scroll="contentScroll"
			@pullingUp="loadMore"
		>
			<home-swiper :banners="banners"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-bar-control
				class="tab-bar-control"
				:title="['流行', '新款', '精选']"
				@tabClick="tabClick"
			></tab-bar-control>
			<good-list :goodsList="showGoods"></good-list>
		</scroll>

		<back-top @click.native="backTopItem" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from "@/views/home/childComps/HomeSwiper";
	import RecommendView from "@/views/home/childComps/RecommendView";
	import FeatureView from "@/views/home/childComps/FeatureView";

	import NavBar from "components/common/navbar/NavBar.vue";
	import TabBarControl from "@/components/content/tabBarControl/TabBarControl";
	import GoodList from "@/components/content/goods/GoodList";
	import Scroll from "@/components/common/scroll/Scroll";
	import BackTop from "@/components/content/backtop/BackTop";

	import { getHomeMultidata, getHomeGoods } from "network/home";
	export default {
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			NavBar,
			TabBarControl,
			GoodList,
			Scroll,
			BackTop
		},
		data() {
			return {
				banners: [],
				recommends: [],
				goods: {
					pop: { page: 0, list: [] },
					new: { page: 0, list: [] },
					sell: { page: 0, list: [] }
				},
				currentType: "pop",
				isShowBackTop: "false"
			};
		},
		created() {
			// 1.请求数据
			this.getHomeMultidata();

			// 2.请求商品数据
			this.getHomeGoods("pop");
			this.getHomeGoods("new");
			this.getHomeGoods("sell");
		},
		// mounted() {
		// 	console.log(this.isShowBackTop);
		// },
		computed: {
			showGoods() {
				return this.goods[this.currentType].list;
			}
		},
		methods: {
			// 事件监听相关的方法
			tabClick(index) {
				switch (index) {
					case 0:
						this.currentType = "pop";
						break;
					case 1:
						this.currentType = "new";
						break;
					case 2:
						this.currentType = "sell";
						break;
				}
			},
			backTopItem() {
				this.$refs.scroll.scrollto(0, 0, 500);
			},
			contentScroll(position) {
				this.isShowBackTop = Math.abs(position.y) > 1000;
				// console.log(position);
			},
			loadMore() {
				this.getHomeGoods(this.currentType);
			},
			// 网络请求相关的方法
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					this.banners = res.data.banner.list;
					this.recommends = res.data.recommend.list;
				});
			},
			getHomeGoods(type) {
				let page = this.goods[type].page + 1;
				getHomeGoods(type, page).then(res => {
					console.log(res);
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page++;
					// 一直不能用

					// this.$refs.scroll.scroll.finshPullUp();
				});
			}
		}
	};
</script>

<style scoped>
	#home {
		padding-top: 44px;
		position: relative;
		height: 100vh;
	}
	.home-nav {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;

		background: #fe909d;
		color: #fff;
		font-size: 18px;
		z-index: 2;
	}
	.tab-bar-control {
		position: sticky;
		top: 44px;
	}
	.content {
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0;
		right: 0;
		overflow: hidden;
	}
</style>