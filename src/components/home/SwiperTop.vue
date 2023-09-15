<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import axios from 'axios'
import { getBanner } from '@/request/api/home'
import { onMounted, reactive } from 'vue'
export default {
    name: 'SwiperTop',
    setup() {
        const state = reactive({
            images:[]
        })
        onMounted(async ()=>{
            let res = await getBanner()
            res.data.banners.forEach(item => {
                state.images.push(item.pic)
            })
        })
        return { state }
    },
}
</script>

<style lang="less">
    #swiperTop {
        .van-swipe {
            width: 100%;
            height: 3rem;
            .van-swipe-item {
                padding: 0 0.2rem;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 0.2rem;
                }
            }
        }
        .van-swipe__indicator--active {
            background-color: rgb(219, 130, 130);
        }
    }
</style>