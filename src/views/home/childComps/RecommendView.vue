<template>
	<div class="recommed">
		<div class="recommed-item" v-for="item in recommends">
			<a :href="item.link">
				<img :src="item.image" />
				<div class="recommed-text">{{ item.title }}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			recommends: {
				type: Array
			}
		}
	};
</script>

<style>
	.recommed {
		display: flex;
		width: 100vw;
		padding: 10px 0 20px;
		border-bottom: 7px solid #eee;
		text-align: center;
	}
	.recommed-item {
		flex: 1;
	}
	.recommed-item img {
		width: 90%;
		margin-bottom: 10px;
	}
</style>