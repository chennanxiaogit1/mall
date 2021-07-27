export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            // 1.查询是否有该商品
            let oldProduct = context.state.cartList.find((item) => item.iid == payload.iid)
            // 2.判断oldProduct
            if (oldProduct) {
                context.commit("addCounter", oldProduct);
                resolve("当前商品数量+1");
            } else {
                payload.checked = true;
                payload.count = 1;
                context.commit("addToCart", payload);
                resolve("添加了新的商品");
            }
        })
    }
}