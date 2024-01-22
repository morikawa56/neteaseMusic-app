<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="">
            <use xlink:href="#icon-mknetemsczuojiantou"></use>
        </svg>
        <van-search
            v-model="keyword"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            input-align="center"
            class="searchBar"
        />
    </div>
    <div class="searchHistory">
        <span id="historyTitle">历史</span>
        <span v-for="item in keywordList" :key="item" class="historyItem">{{item}}</span>
    </div>
</template>

<script>
    import { ref } from 'vue'
    export default {
        name: 'Search',
        setup() {
            const keywordList = ref([])
            const keyword = ref('')

            function onSearch() {
                keywordList.value.push(keyword.value)
            }
            return {
                keywordList,
                keyword,
                onSearch
            }
        }

    }
</script>

<style lang="less" scoped>
    .searchTop{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .icon {
            width: .55rem;
            height: .55rem;
        }
        .searchBar{
            width: 90%;
            height: 1rem;

        }
    }
    .searchHistory{
        width: 100%;
        padding: .2rem;
        #historyTitle {
            font-weight: bold;
        }
        .historyItem {
            background-color: #b7a9a9;
        }
    }
</style>