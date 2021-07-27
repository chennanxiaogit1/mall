import { debounce } from '@/common/utils'
import BackTop from "@/components/content/backtop/BackTop";


export const itemListenerMixin = {
    mounted() {
        // 1.监听全局事件
        this.$bus.$on("imageLoad", () => {
            debounce(this.$refs.scroll.Refresh, 20);
        });
    }
}

export const backTopMinxin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backTopItem() {
            this.$refs.scroll.scrollto(0, 0, 500);
        },
    }
}