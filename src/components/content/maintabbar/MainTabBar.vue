<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <img src="~assets/images/tabbar/home.svg" alt="" slot="item-icon" />
        <img
          src="~assets/images/tabbar/home_active.svg"
          slot="item-icon-active"
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img src="~assets/images/tabbar/category.svg" alt="" slot="item-icon" />
        <img
          src="~assets/images/tabbar/category_active.svg"
          slot="item-icon-active"
        />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img src="~assets/images/tabbar/shopcart.svg" alt="" slot="item-icon" />
        <img
          src="~assets/images/tabbar/shopcart_active.svg"
          slot="item-icon-active"
        />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="profile">
        <img src="~assets/images/tabbar/profile.svg" alt="" slot="item-icon" />
        <img
          src="~assets/images/tabbar/profile_active.svg"
          slot="item-icon-active"
        />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
</style>