<template>
  <div class="contentArea">
    <div class="listControl">
        <div class="playAll">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mknetemscbofang1"></use>
            </svg>
            <div class="buttonTitle">
                <span id="titleBody">播放全部</span>
                <span id="trackCount">（共{{ playlist.trackCount }}首）</span>
            </div>
        </div>
        <div class="favBtn">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mknetemscjiahao"></use>
            </svg>
            <span>收藏</span>
            <span>({{ changeCount(playlist.subscribedCount) }})</span>
        </div>
    </div>
    <div class="musicList">
        <div v-for="item in songs" :key="item" class="musicItem">
            <div class="itemLeft" @click="playMusic(songs.indexOf(item))">
                <span class="musicIndex">{{ songs.indexOf(item) + 1 }}</span>
                <div class="musicInfo">
                    <span class="musicTitle">{{ item.name }}</span>
                    <div class="singerInfo">
                        <span v-for="singer in item.ar" :key="singer">
                            {{ singer.name }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="itemRight">
                <div class="musicVideo" v-if="item.mv">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mknetemscbofangMV"></use>
                    </svg>
                </div>
                <div class="musicVideo-null" v-if="!item.mv"></div>
                <div class="musicOperate">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mknetemsc31liebiao"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
    import { useStore } from 'vuex'
    export default {
        name: 'ItemMusicList',
        setup(props) {
            const store = useStore()
            // console.log(props)
            const changeCount = num => {
                if(num >= 100000000) {
                    return (num/100000000).toFixed(1) + '亿'
                } else if (num >= 10000) {
                    return (num/10000).toFixed(1) + '万'
                } else {
                    return num
                }
            }
            function playMusic(Index) {
                store.commit('sessionPut')
                store.commit('updatePlayList', props.songs)
                store.commit('updatePlayIndex', Index)
                store.commit('setPlaying', true)
            }
            return { changeCount, playMusic }
        },
        props: ['songs', 'playlist']
    }
</script>

<style lang="less" scoped>
    .contentArea{
        margin-top: .3rem;
        background-color: white;
        border-radius: .5rem .5rem 0 0;
        .listControl {
            width: 100%;
            height: 1rem;
            padding: .1rem .2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .playAll {
                width: 60%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .icon {
                    width: .5rem;
                    height: .5rem;
                }
                .buttonTitle {
                    width: 85%;
                    #titleBody {
                        font-size: .32rem;
                        font-weight: bold;
                    }
                    #trackCount {
                        font-size: .24rem;
                        color: #999;
                    }
                }
            }
            .favBtn {
                width: 2.5rem;
                height: 100%;
                display: flex;
                align-items: center;

                justify-content: center;
                background-color: #ff2600;
                border-radius: .5rem;
                .icon {
                    width: .4rem;
                    height: .4rem;
                    fill: #eee;
                }
                span {
                    color: #eee;
                }
            }
        }
        .musicList {
            display: flex;
            flex-direction: column;
            margin: 0 .2rem;
            .musicItem {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: .2rem 0;
                .itemLeft{
                    width: 80%;
                    display: flex;
                    align-items: center;
                    .musicImg {
                        width: .8rem;
                        height: .8rem;
                        border-radius: .4rem;
                        margin-right: .2rem;
                    }
                    .musicIndex {
                        width: 15%;
                        font-size: .4rem;
                        text-align: center;
                        color: #999;

                    }
                    .musicInfo {
                        width: 85%;
                        display: flex;
                        flex-direction: column;
                        .musicTitle {
                            font-size: .32rem;
                            font-weight: bold;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                        }
                        .singerInfo {
                            font-size: .28rem;
                            width: 90%;
                            color: #999;
                            margin-top: .1rem;
                            font-size: .28rem;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            span {
                                margin-right: .1rem;
                            }
                        }
                    }
                }
                .itemRight{
                    width: 20%;
                    display: flex;
                    align-items: center;
                    .musicVideo {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        .icon {
                            fill: #999;
                        }
                    }
                    .musicVideo-null {
                        width: 50%;
                        height: 100%;
                    }
                    .musicOperate {
                        width: 50%;
                        height: 100%;
                        display: flex;
                        justify-content: center; /* 水平居中 */
                        align-items: center;
                        .icon {
                            fill: #999;
                        }
                    }
                }
                
            }
        }
    }
</style>