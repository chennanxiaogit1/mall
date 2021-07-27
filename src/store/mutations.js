export default {
    // 1.增加商品数量
    addCounter(state, payload) {
        payload.count++;
    },
    // 2.增加商品
    addToCart(state, payload) {
        state.cartList.push(payload)
    }
}