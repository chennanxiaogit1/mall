<template>
	<div id="tab-control">
		<div
			class="tab-control-item"
			v-for="(item, index) in title"
			@click="itemClick(index)"
		>
			<span :class="{ active: currentIndex == index }">{{ item }}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			title: {
				type: Array,
				default() {
					return [];
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			};
		},
		methods: {
			itemClick(index) {
				this.currentIndex = index;
				this.$emit("tabClick", index);
			}
		}
	};
</script>

<style>
	#tab-control {
		display: flex;
		justify-content: center;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background: #fff;
		z-index: 2;
	}
	.tab-control-item {
		flex: 1;
	}
	.tab-control-item span {
		padding: 5px;
	}
	.active {
		color: #fe909d;
		border-bottom: 3px solid #fe909d;
	}
</style>