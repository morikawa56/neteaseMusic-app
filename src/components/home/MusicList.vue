<template>
  <div class="musicList">
    <div class="musicTop">
        <div class="title">发现好歌单</div>
        <div class="more">查看更多</div>
    </div>
    <div class="mList">
        <div class="musicItem" v-for="item in listData.musicList" :key="item">
            <img :src="item.picUrl">
            <span>{{ item.name }}</span>
        </div>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home';
import { onMounted, reactive } from 'vue';
export default {
    name: 'MusicList',
    setup() {
        const listData = reactive({
            musicList: []
        })
        onMounted(async ()=>{
            let res = await getMusicList()
            listData.musicList = res.data.result
            console.log(listData.musicList)
        })
        return {listData}
    }
}
</script>

<style lang="less" scoped>
    .musicList {
        width: 100%;
        height: 5rem;
        padding: 0.2rem;
        .musicTop {
            width: 100%;
            height: 0.6rem;
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.2rem;
            .title {
                font-size: 0.4rem;
                font-weight: bold;
            }
            .more {
                border: 1px solid #ccc;
                border-radius: 0.4rem;
                text-align: center;
                line-height: 0.6rem;
                padding: 0 0.2rem;
            }
        }
        .mList{
            width: 100%;
            height: 4rem;
            display: flex;
            justify-content: space-around;
            .musicItem {
                img {
                    width: 100%;
                }
            }
        }
    }
</style>