<template>
    <div class="content">
        <div class="FooterPlayer">
            <div class="FooterPlayer-left" @click="showDetail">
                <img :src="playList[playListIndex].al.picUrl" alt="">
                <div>
                    <p>{{ playList[playListIndex].name }}</p>
                    <span>横滑可以切换上下首哦</span>
                </div>
            </div>
            <div class="FooterPlayer-right">
                <svg class="icon" aria-hidden="true" @click="togglePlay" ref="playBtn">
                    <use xlink:href="#icon-mknetemscyunhang"></use>
                </svg>
                <svg class="icon" aria-hidden="true" @click="handleList">
                    <use xlink:href="#icon-mknetemscbofangliebiao"></use>
                </svg>
            </div>
            <audio 
                ref="audio" 
                :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"
                @canplay="ready"
            ></audio>
            <van-popup
                v-model:show="musicDetailShow"
                position="bottom"
                :style="{ width: '100%', height: '100%' }"
            >
                <MusicDetail :playing="playList[playListIndex]"/>
            </van-popup>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { mapState, useStore } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    name: 'FooterPlayer',
    setup() {
        const store = useStore();
        const audio = ref(null)
        const playBtn = ref(null)
        const playing = computed(() => store.state.playing)
        const audioReady = ref(false)
        onMounted(() =>{
            // console.log(audio.value)
            // console.log(playBtn.value.innerHTML)
            // console.log(store.state)
            // console.log(playing)
        })


        // watch(audio, (newValue, oldValue) => {
        //     handlePlay()
        //     console.log('audio的值变化了', newValue, oldValue)
        // })
        function handleBtn(status) {
            if(status) {
                playBtn.value.innerHTML = '<use xlink:href="#icon-mknetemscbofangzhong"></use>'
            } else {
                playBtn.value.innerHTML = '<use xlink:href="#icon-mknetemscyunhang"></use>'
            }
        }

        function handlePlay() {
            // 判断音乐是否播放
            if(!playing.value) {
                // console.log(2)
                handleBtn(false)
                audio.value.pause()
            } else {
                // console.log(1)
                handleBtn(true)
                audio.value.pause()
                audio.value.play()
            }
            console.log(audio.value.src)
        }
        function togglePlay() {
            store.commit('setPlaying', !playing.value)
            handlePlay()
        }

        function showDetail() {
            store.commit('setMusicDetailShow')
        }

        function ready() {
            audioReady.value = true
        }

        return {
            audio,
            playBtn,
            store,
            playing,
            handlePlay,
            handleBtn,
            togglePlay,
            showDetail,
            audioReady,
            ready
        }
    },
    methods: {
        handleList() {
            console.log('handleList')
        }
    },
    watch: {
        playListIndex(newValue, oldValue) {
            // console.log('playListIndex变化了', newValue, oldValue)
            if(!this.audioReady){
				return
			}
            this.$refs.audio.autoplay = true
            this.$refs.audio.play()
            console.log(this.audioReady)
            this.handleBtn(this.playing)
            this.audioReady = false
        },
        playList(newValue, oldValue) {
            if(!this.audioReady){
				return
			}
            this.$refs.audio.autoplay = true
            this.$refs.audio.play()
            console.log(this.audioReady)
            this.handleBtn(this.playing)
            this.audioReady = false
        }
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'musicDetailShow'])
    },
    components: { MusicDetail }
}
</script>

<style lang="less" scoped>
    .content {width: 100%;height: 1.4rem;} // 外层包裹div占位防止遮挡后方歌单内容
    .FooterPlayer {
        width: 100%;
        height: 1.4rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        padding: .2rem;
        justify-content: space-between;
        .FooterPlayer-left {
            width: 60%;
            height: 100%;
            display: flex;
            align-items: center;
            img {
                width: 1rem;
                height: 1rem;
                margin-right: .1rem;
                border-radius: 50%;
            }
            p {
                font-size: .32rem;
                font-weight: bold;
            }
            span {
                font-size: .26rem;
                color: #999;
            }
        }
        .FooterPlayer-right {
            width: 25%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .icon {
                width: .7rem;
                height: .7rem;
                fill: #555;
                margin: 0 .1rem;
            }
        }
    }
</style>