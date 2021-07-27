<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

		<tab-bar-control
			class="tab-bar-control"
			:title="['流行', '新款', '精选']"
			@tabClick="tabClick"
			ref="tabControl1"
			v-show="isShow"
			:class="{ fixed: true }"
		></tab-bar-control>

		<scroll
			class="content"
			ref="scroll"
			:probe-type="3"
			@scroll="contentScroll"
			@pullingUp="loadMore"
		>
			<home-swiper
				@SwiperImageLoad="imageLoad"
				:banners="banners"
			></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-bar-control
				class="tab-bar-control"
				:title="['流行', '新款', '精选']"
				@tabClick="tabClick"
				ref="tabControl2"
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
	import { debounce } from "@/common/utils.js";
	import { itemListenerMixin } from "@/common/mixins.js";

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
				isShowBackTop: "false",
				tabOffSetToP: 0,
				isShow: false,
				saveY: 0
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
		// 使home离开的时候保持原本的位置
		activated() {
			this.$refs.scroll.scrollto(0, this.saveY, 0);
			this.$refs.scroll.Refresh();
		},
		deactivated() {
			// 1.保存Y值
			this.saveY = this.$refs.scroll.scrollY();
			// 2.取消全局监听事件
			this.$bus.$off("itemImageLoad", () => {
				debounce(this.$refs.scroll.Refresh, 20);
			});
		},

		mounted() {
			// this.$bus.$on("imageLoad", () => {
			// 	debounce(this.$refs.scroll.Refresh, 20);
			// });
		},
		mixins: [itemListenerMixin],
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
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
			backTopItem() {
				this.$refs.scroll.scrollto(0, 0, 500);
			},
			contentScroll(position) {
				this.isShowBackTop = Math.abs(position.y) > 1000;
				this.isShow = Math.abs(position.y) > this.tabOffSetToP;
			},
			// 上拉加载
			loadMore() {
				this.getHomeGoods(this.currentType);
				this.$refs.scroll.finishPullup();
			},
			imageLoad() {
				// 所有组件都有一个属性$el:用于获取组件中的元素
				// console.log(this.$refs.tabControl.$el.offsetTop);
				this.tabOffSetToP = this.$refs.tabControl2.$el.offsetTop;
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
					// console.log(res);
					this.goods[type].list.push(...res.data.list);
					this.goods[type].page++;
				});
			}
		}
	};
</script>

<style scoped>
	#home {
		/* padding-top: 44px; */
		position: relative;
		height: 100vh;
	}
	.home-nav {
		background: #fe909d;
		color: #fff;
		font-size: 18px;
		z-index: 2;
	}
	.fixed {
		position: relative;
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