<template>
	<div class="wipper" ref="wipper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from "better-scroll";
	export default {
		data() {
			return {
				scroll: null
			};
		},
		props: {
			probType: {
				type: Number,
				default: 0
			},
			pullUpLoad: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			// 1.创建BScroll对象
			this.$nextTick(() => {
				this.scroll = new BScroll(this.$refs.wipper, {
					click: true,
					// 1. 0/1是不监听 2是监听（在手指滑动的时候监听） 3是（只要滚动就监听）
					probeType: this.probType,
					// 上拉加载更多
					pullUpLoad: true
				});
				// 2.监听滚动事件
				this.scroll.on("scroll", position => {
					// console.log(position);
					this.$emit("scroll", position);
				});
				// 3.监听上拉事件
				this.scroll.on("pullingUp", () => {
					this.$emit("pullingUp");
				});
			});
		},
		methods: {
			scrollto(x, y, time = 300) {
				this.scroll.scrollTo(x, y, time);
			}
			// finishPullup() {
			// 	this.scroll.finishPullUp();
			// }
		}
	};
</script>

<style scoped>
</style>>

