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
                    <use xlink:href="#icon-mknetemscyunhang" v-if="!playing"></use>
                    <use xlink:href="#icon-mknetemscbofangzhong" v-if="playing"></use>
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
                <MusicDetail 
                    :playing="playList[playListIndex]" 
                    :playStatus="playing" 
                    :togglePlay="togglePlay"
                    :audio="audio"
                />
            </van-popup>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, onUpdated, ref } from 'vue'
import { mapState, useStore } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    name: 'FooterPlayer',
    setup(props) {
        const store = useStore();
        const audio = ref(null)
        const playBtn = ref(null)
        const playing = computed(() => store.state.playing)
        const volume = computed(() => store.state.volume)
        const interval = ref(null)
        const playModeIndex = computed(() => store.state.playModeIndex)
        const playMode = computed(() => store.state.playMode)
        // const progress = computed(() => {
        //     if (audio.value) {
        //         return audio.value.currentTime
        //     } else {
        //         return 0;
        //     }
        // });
        
        function endedChange() {
            store.commit('changeMusic', {indexOffset: 1, trigger: 'ended'})
        }
        function ModeSL() {
            store.commit('changeMusic', {indexOffset: 0, trigger: 'ended'})
            audio.value.currentTime = 0
            audio.value.play()
        }

        onMounted(()=> {
            audio.value.addEventListener('timeupdate', () => {
                // console.log(audio.value.currentTime)
                store.commit('updateCurrentTime', audio.value.currentTime)
            })
            if(playModeIndex === 2) {
                audio.value.addEventListener('ended', ModeSL)
            } else {
                audio.value.addEventListener('ended', endedChange)
            }
            audio.value.volume = volume.value
        })

        // watch(audio, (newValue, oldValue) => {
        //     handlePlay()
        //     console.log('audio的值变化了', newValue, oldValue)
        // })
        // function handleBtn(status, playbtn) {
        //     if(status) {
        //         playbtn.innerHTML = '<use xlink:href="#icon-mknetemscbofangzhong"></use>'
        //     } else {
        //         playbtn.innerHTML = '<use xlink:href="#icon-mknetemscyunhang"></use>'
        //     }
        // }

        // 获取时间节流写法
        // function updateTime() {
        //     if(interval.value) clearInterval(interval.value)
        //     interval.value = setInterval(()=>{
        //         console.log(audio.value.currentTime)
        //         store.commit('updateCurrentTime', audio.value.currentTime)
        //     },250)
        // }

        function handlePlay() {
            // 判断音乐是否播放
            if(!playing.value) {
                audio.value.pause()
                // clearInterval(interval.value) 节流写法
            } else {
                audio.value.pause()
                audio.value.play()
                // updateTime() 获取时间节流写法
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

        return {
            audio,
            playBtn,
            store,
            playing,
            togglePlay,
            showDetail,
            interval,
            volume,
            playMode,
            playModeIndex,
            endedChange,
            ModeSL
            // updateTime
        }
    },
    methods: {
        handleList() {
            console.log('handleList')
        },
    },
    watch: {
        playListIndex: {
            // immediate: true,
            handler() {
                // console.log('playListIndex变化了', newValue, oldValue)
                if(this.playList[this.playListIndex].id === Number(sessionStorage.getItem('lastMusicId'))) {
                    this.$refs.audio.play()
                } else {
                    this.$refs.audio.autoplay = true
                }
                // this.updateTime() 获取时间节流写法
                sessionStorage.removeItem('lastMusicId')
                this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
            }
        },
        playList() {
            if(this.playList[this.playListIndex].id === Number(sessionStorage.getItem('lastMusicId'))) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.autoplay = true
            }
            this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
            // this.updateTime() 获取时间节流写法
            sessionStorage.removeItem('lastMusicId')
        },
        playModeIndex(newValue) {
            if(newValue === 2) {
                this.$refs.audio.removeEventListener('ended', this.endedChange)
                this.$refs.audio.addEventListener('ended', this.ModeSL)
            } else {
                this.$refs.audio.removeEventListener('ended', this.ModeSL)
                this.$refs.audio.addEventListener('ended', this.endedChange)

            }
        }
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'musicDetailShow'])
    },
    components: { MusicDetail },
    mounted() {
        this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    }
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