<template>
	<div class="detail">
		<nav-bar>
			<div slot="left" class="back" @click="backClick">
				<img src="~assets/images/common/back.svg" alt="" />
			</div>
			<div slot="center" class="title">
				<div
					class="title-item"
					v-for="(item, index) in titles"
					@click="titleClick(index)"
					:class="{ active: currentIndex == index }"
				>
					{{ item }}
				</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
	import NavBar from "@/components/common/navbar/NavBar";
	export default {
		components: {
			NavBar
		},
		data() {
			return {
				titles: ["商品", "参数", "评论", "推荐"],
				currentIndex: 0
			};
		},
		methods: {
			titleClick(index) {
				this.currentIndex = index;
			},
			backClick() {
				this.$router.back();
			}
		}
	};
</script>

<style scoped>
	.title {
		display: flex;
		text-align: center;
		/* font-size: 13px; */
	}
	.title-item {
		flex: 1;
	}
	.active {
		color: #fe909d;
		border-bottom: 0px;
	}
	.back img {
		width: 18px;
		height: 18px;
	}
</style>