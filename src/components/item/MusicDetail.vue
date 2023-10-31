<template>
    <div class="musicDetail">
        <img :src="playing.al.picUrl" class="bgimg">
        <div class="musicTitle">
            <div class="titleLeft">
                <svg class="icon" aria-hidden="true" @click="showDetail">
                    <use xlink:href="#icon-mknetemsczuojiantou"></use>
                </svg>
                <div class="titleInfo">
                    <p>{{ playing.name }}</p>
                    <div class="singerInfo">
                        <span v-for="singer in playing.ar" :key="singer">
                            {{ singer.name }}
                        </span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-mknetemscyoujiantou"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="titleRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscfenxiang"></use>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import { useStore } from 'vuex'
    export default {
        name: 'MusicDetail',
        setup(props){
            const store = useStore();
            onMounted(() => {
                console.log(props.playing)
            })
            function showDetail() {
                store.commit('setMusicDetailShow')
            }
            return { showDetail }
        },
        props: [ 'playing' ]
    }
</script>

<style lang="less" scoped>
    .musicDetail{
        .bgimg {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: -1;
            filter: blur(.6rem);
        }
        .musicTitle{
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .titleLeft{
                width: 70%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .icon {
                    width: 0.5rem;
                    height: 0.5rem;
                    margin: 0 .2rem;
                    fill: #999;
                }
                .titleInfo {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p {
                        width: 100%;
                        height: 60%;
                        font-size: .4rem;
                        margin-top: .2rem;
                    }
                    .singerInfo{
                        width: 100%;
                        height: 40%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        margin-top: .1rem;
                        margin-bottom: .2rem;
                        span{
                            font-size: 0.28rem;
                            font-weight: 600;
                            margin-right: 0.1rem;
                        }
                        .icon {
                            width: 0.28rem;
                            height: 0.28rem;
                            fill: #999;
                        }
                    }
                }
            }
            .titleRight{
                width: 30%;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                .icon{
                    width: 0.6rem;
                    height: 0.6rem;
                    margin-right: 0.2rem;
                }
            }
        }
    }
    
</style>