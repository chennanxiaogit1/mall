<template>
	<swiper>
		<swiper-item v-for="item in banners">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imageLoad" />
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import { Swiper, SwiperItem } from "components/common/swiper/index.js";
	export default {
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			banners: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				isLoad: false
			};
		},
		methods: {
			imageLoad() {
				if (!this.isLoad) {
					this.$emit("SwiperImageLoad");
					this.isLoad = !this.isLoad;
				}
			}
		}
	};
</script>

<style>
</style>