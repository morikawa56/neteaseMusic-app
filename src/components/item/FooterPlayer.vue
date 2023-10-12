<template>
    <div class="FooterPlayer">
        <div class="FooterPlayer-left">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑可以切换上下首哦</span>
            </div>
        </div>
        <div class="FooterPlayer-right">
            <svg class="icon" aria-hidden="true" @click="handlePlay" ref="playBtn">
                <use xlink:href="#icon-mknetemscyunhang"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="handleList">
                <use xlink:href="#icon-mknetemscbofangliebiao"></use>
            </svg>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { mapState } from 'vuex'
export default {
    name: 'FooterPlayer',
    setup() {
        const audio = ref(null)
        const playBtn = ref(null)
        onMounted(() =>{
            // console.log(audio.value)
            // console.log(playBtn.value.innerHTML)
        })
        return {
            audio,
            playBtn
        }
    },
    methods: {
        handlePlay() {
            // 判断音乐是否播放
            if(this.playing) {
                this.$store.commit('setPlaying', false)
                this.$refs.audio.pause()
                this.$refs.playBtn.innerHTML = '<use xlink:href="#icon-mknetemscyunhang"></use>'
            } else {
                this.$store.commit('setPlaying', true)
                this.audio.play()
                this.playBtn.innerHTML = '<use xlink:href="#icon-mknetemscbofangzhong"></use>'
            }
            console.log(this.audio.src)
        },
        handleList() {
            console.log('handleList')
        }
    },
    computed: {
        ...mapState(['playList', 'playListIndex', 'playing'])
    },
}
</script>

<style lang="less" scoped>
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