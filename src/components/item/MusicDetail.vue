<template>
    <div class="musicDetail" :class="{light: isLight, dark:!isLight}">
        <img :src="playing.al.picUrl" class="bgimg">
        <div class="bacCover" ref="bacCover"></div>
        <div class="musicTitle">
            <div class="titleLeft">
                <svg class="icon" aria-hidden="true" @click="changeDetailShow">
                    <use xlink:href="#icon-mknetemsczuojiantou"></use>
                </svg>
                <div class="titleInfo" ref="titleInfo">
                    <Vue3Marquee class="songName" v-if="showTitleMarquee">
                        <p>{{ playing.name }}</p>
                    </Vue3Marquee>
                    <div class="songName" v-else>
                        <p>{{ playing.name }}</p>
                    </div>
                    <div class="singerInfo">
                        <Vue3Marquee class="singerList" v-if="showSingerMarquee">
                            <span v-for="singer in playing.ar" :key="singer">
                                {{ singer.name }}
                            </span>
                        </Vue3Marquee>
                        <div class="singerList" v-else>
                            <span v-for="singer in playing.ar" :key="singer">
                                {{ singer.name }}
                            </span>
                        </div>
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
        <div class="alInfo">
            <div class="alDisk" v-show="!isLyricShow" @click="changeLyricShow(true)">
                <img
                    src="@/assets/needle-ab.png"
                    alt=""
                    class="img_needle"
                    :class="{ img_needle_active: !playStatus }"
                />
                <img src="@/assets/cd.png" alt="" class="img_cd" />
                <img
                    :src="playing.al.picUrl"
                    alt=""
                    class="img_al"
                    :class="{ img_al_active: playStatus, img_al_pauesd: !playStatus }"
                />
            </div>
            <div class="musicLyric" v-show="isLyricShow" ref="musicLyric" @click="changeLyricShow(false)">
                <p
                    class="lyric"
                    v-for="(item, index) in lyric"
                    :key="index"
                    :class="{active: /* currentTime < item.pre && currentTime > item.time */index === activeIndex}"
                >
                    {{ item.lrc }}
                </p>
            </div>
        </div>
        <div class="playerBottom">
            <div class="playerTop">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscshoucang"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscxiazai"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscyinlechangpian"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscpinglun"></use>
                </svg>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemsc31liebiao"></use>
                </svg>
            </div>
            <div class="playerFunction">
                <div class="progressBar">
                    <van-slider
                        v-model="progress"
                        bar-height="4px"
                        active-color="#ee0a24"
                        :step="0.1"
                        @drag-end="changeProgress"
                    />
                </div>
                <div class="playerControl">
                    <svg class="icon" aria-hidden="true" @click="changeMode">
                        <use xlink:href="#icon-mknetemscliebiaoxunhuan"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="changeMusic(-1)">
                        <use xlink:href="#icon-mknetemscshangyiqu"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="togglePlay">
                        <use xlink:href="#icon-mknetemscyunhang" v-if="!playStatus"></use>
                        <use xlink:href="#icon-mknetemscbofangzhong" v-if="playStatus"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true" @click="changeMusic(1)">
                        <use xlink:href="#icon-mknetemscxiayiqu"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mknetemscbofangduilie"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { computed, onMounted, ref } from 'vue'
    import { useStore, mapState } from 'vuex'
    import { showToast } from 'vant'
    import { Vue3Marquee } from 'vue3-marquee'
    import { changeDetailColor }  from '@/utils/colorthief'
    export default {
        name: 'MusicDetail',
        setup(props){
            const store = useStore();
            let musicDetail = ref(null)
            let bacCover = ref(null)
            const isLyricShow = ref(false)
            const currentTime = computed(() => store.state.currentTime)
            const musicDetailShow = computed(() => store.state.musicDetailShow)
            const musicLyricShowed = computed(() => store.state.musicLyricShowed)
            const isLight = ref(false)
            const musicLyric = ref(null)

            const progress = ref(0);
            const onChange = (value) => showToast('当前值：' + value)

            onMounted(() => {
                // console.log('Mounted')
                const bgimg = new Image()
                bgimg.crossOrigin = ''
                bgimg.onload = () => {
                    isLight.value = changeDetailColor(bgimg, bacCover.value)
                }
                bgimg.src = props.playing.al.picUrl
                if(currentTime.value < 5 && isLyricShow.value) {
                    store.commit('updateMusicLyricShowed', true)
                    musicLyric.value.scrollTop = 0
                }
                props.audio.addEventListener('timeupdate',() => {
                    progress.value = (currentTime.value / props.audio.duration) * 100
                })
                // console.log(props.playing.al.picUrl)
                // console.log(lyricInfo)
            })
            // const { lyricInfo, playListIndex, playlist } = {...mapState(['lyricInfo', 'playListIndex', 'playList'])
            function changeDetailShow() {
                store.commit('setMusicDetailShow')
            }
            function changeLyricShow(status) {
                // console.log(status)
                isLyricShow.value = status
            }

            function changeMusic(indexOffset) {
                store.commit('changeMusic', indexOffset)
            }

            function changeMode() {
                console.log('Mode changed')
            }

            function changeProgress(e) {
                console.log(e)
                props.audio.currentTime = (progress.value / 100) * props.audio.duration

            }

            return {
                changeDetailShow,
                changeLyricShow,
                changeMusic,
                changeMode,
                changeProgress,
                musicDetail,
                bacCover,
                isLyricShow,
                musicDetailShow,
                musicLyricShowed,
                currentTime,
                isLight,
                musicLyric,
                progress,
                onChange}
        },
        props: [ 'playing', 'playStatus', 'togglePlay', 'audio' ],
        computed: {
            showTitleMarquee() {
                return this.playing.name.length > 10
            },
            showSingerMarquee() {
                return this.playing.ar.length > 4
            },
            ...mapState(['lyricInfo', 'playListIndex', 'playList']),
            lyric() {
                if(this.lyricInfo.lyric) {
                    let arr = this.lyricInfo.lyric.split(/[(\r\n)\r\n]+/).map((item, i)=>{
                        let min = item.slice(1, 3)
                        let sec = item.slice(4, 6)
                        let mill = item.slice(7, 9)
                        let time = parseInt(min)*60 + parseInt(sec) + parseInt(mill)/1000
                        let lrc = item.split(']')[1]
                        return {min, sec, mill, time, lrc}
                    })
                    arr.forEach((item, i) => {
                        if(i === arr.length - 1) {
                            item.pre = 0
                        } else {
                            item.pre = arr[i + 1].time
                        }
                    }); //循环获取下一句歌词
                    // console.log(arr)
                    return arr
                }
            },
            activeIndex() {
                for(let i = this.lyric.length - 1; i >= 0; i--) {
                    if(this.currentTime >= this.lyric[i].time) {
                        return i;
                    }
                }
                return -1
            }
        },
        watch:{
            playListIndex() {
                const bgimg = new Image()
                bgimg.crossOrigin = ''
                bgimg.onload = () => {
                    this.isLight = changeDetailColor(bgimg, this.$refs.bacCover)
                    // console.log(colorthief.getPalette(bgimg))
                }
                bgimg.src = this.playing.al.picUrl
                this.$store.commit('updateMusicLyricShowed', false)
                // console.log(this.playing.al.picUrl)
            },
            playList() {
                const bgimg = new Image()
                bgimg.crossOrigin = ''
                bgimg.onload = () => {
                    this.isLight = changeDetailColor(bgimg, this.$refs.bacCover)
                    // console.log(colorthief.getPalette(bgimg))
                }
                bgimg.src = this.playing.al.picUrl
                this.$store.commit('updateMusicLyricShowed', false)
            },
            activeIndex(index) {
                if (this.musicDetailShow && this.isLyricShow && index !== -1) {
                    const line = this.musicLyric.children[index]
                    const offsetTop = line.offsetTop
                    const containerHeight = this.musicLyric.clientHeight
                    const lineHeight = line.clientHeight
                    this.musicLyric.scrollTop = offsetTop - (containerHeight / 2 - lineHeight / 2)
                    // console.log(this.musicLyric.scrollTop)
                }
            },
            musicDetailShow(newval) {
                if(newval && this.isLyricShow) {
                    if(this.musicLyricShowed === false && this.currentTime < 5) {
                        this.musicLyric.scrollTop = 0
                        this.$store.commit('updateMusicLyricShowed', true)
                    }
                    else {
                        setTimeout(() => {
                            const line = this.musicLyric.children[this.activeIndex]
                            const offsetTop = line.offsetTop
                            const containerHeight = this.musicLyric.clientHeight
                            const lineHeight = line.clientHeight
                            this.musicLyric.scrollTop = offsetTop - (containerHeight / 2 - lineHeight / 2)
                            // console.log(this.musicLyric.scrollTop, line, offsetTop, containerHeight, lineHeight)
                        },10)
                    }
                }
            },
            isLyricShow(newval) {
                if(newval) {
                    if(this.musicLyricShowed === false && this.currentTime < 5) {
                        this.musicLyric.scrollTop = 0
                        this.$store.commit('updateMusicLyricShowed', true)
                    }
                    else {
                        setTimeout(() => {
                            const line = this.musicLyric.children[this.activeIndex]
                            const offsetTop = line.offsetTop
                            const containerHeight = this.musicLyric.clientHeight
                            const lineHeight = line.clientHeight
                            this.musicLyric.scrollTop = offsetTop - (containerHeight / 2 - lineHeight / 2)
                            console.log(this.musicLyric.scrollTop, line, offsetTop, containerHeight, lineHeight, this.activeIndex)
                        },10)
                    }
                }
            }
        },
        components: {
            Vue3Marquee,
        }
    }
</script>

<style lang="less" scoped>
    .musicDetail{
        width: 100%;
        height: 100%;
        position: relative;
        .bgimg {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: -2;
            filter: blur(.6rem);
        }
        .bacCover{
            width: 100%;
            height: 100%;
            position: fixed;
            background-color: #ffffff4d;
            z-index: -1;
            // filter: blur(.6rem);
        }
        .musicTitle{
            width: 100%;
            height: 1.3rem;
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
                    // fill: #999;
                }
                .titleInfo {
                    width: 80%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .songName {
                        width: 100%;
                        height: 65%;
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
                        .singerList {
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            overflow: hidden;
                            span{
                                font-size: 0.28rem;
                                font-weight: 600;
                                margin-right: 0.1rem;
                            }
                        }
                        .icon {
                            width: 0.28rem;
                            height: 0.28rem;
                            margin: 0;
                            // fill: #999;
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
                    margin: 0 .2rem 0 0;
                }
            }
        }
        .alInfo {
            width: 100%;
            height: 90%;
            overflow: hidden;
            position: relative;
            .alDisk {
                width: 100%;
                height: 70%;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                overflow: hidden;
                .img_needle {
                    width: 2rem;
                    z-index: 2;
                    position: absolute;
                    left: 46%;
                    bottom: 5.6rem;
                    transform-origin: 0 0;
                    transform: rotate(0deg);
                    transition: all 1.5s;
                }
                .img_needle_active {
                    width: 2rem;
                    z-index: 2;
                    position: absolute;
                    left: 46%;
                    bottom: 5.6rem;
                    transform-origin: 0 0;
                    transform: rotate(-13deg);
                    transition: all 1.5s;
                }
                .img_cd {
                    width: 5rem;
                    height: 5rem;
                    z-index: 1;
                    position: absolute;
                    bottom: 2rem;
                }
                .img_al {
                    width: 3.5rem;
                    height: 3.5rem;
                    border-radius: 50%;
                    z-index: 0;
                    position: absolute;
                    bottom: 2.7rem;
                    animation: rotate_ar 10s linear infinite;
                }
                .img_al_active {
                    animation-play-state: running;
                }
                .img_al_pauesd {
                    animation-play-state: paused;
                }
                @keyframes rotate_ar {
                    0% {
                        transform: rotateZ(0deg);
                    }
                    100% {
                        transform: rotateZ(360deg);
                    }
                }
            }
            .musicLyric {
                width: 100%;
                height: 70%;
                padding: 0 .5rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                bottom: 3.5rem;
                overflow-y: scroll;
                overflow-x: hidden;
                p.lyric {
                    width: 100%;
                    margin: .2rem;
                    text-align: center;
                    word-wrap: break-word; /* 超出容器范围自动换行 */
                    overflow-wrap: break-word; /* 兼容性更好的属性 */
                    transition: all 0.5s ease;
                }
                p.lyric.active {
                    font-size: .5rem;
                }
            }
        }
        .playerBottom {
            width: 100%;
            position: fixed;
            bottom: 0;
            overflow: hidden;
            .playerTop {
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0 .4rem;
                .icon {
                    width: .6rem;
                    height: .6rem;
                    margin: 0 .4rem;
                }
            }
            .playerFunction {
                width: 100%;
                height: 2rem;
                .progressBar {
                    width: 100%;
                    height: 20%;
                    padding: 0 .2rem;
                    display: flex;
                    align-items: center;
                }
                .playerControl {
                    width: 100%;
                    height: 80%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .icon {
                        width: .6rem;
                        height: .6rem;
                        margin: 0 .4rem;
                    }
                    .icon:nth-child(2n+1) {
                        width: .5rem;
                        height: .5rem;
                        margin: 0 .4rem;
                    }
                    .icon:nth-child(2) {
                        width: .8rem;
                        height: .8rem;
                        margin-right: .2rem;
                    }
                    .icon:nth-child(4) {
                        width: .8rem;
                        height: .8rem;
                        margin-left: .2rem;
                    }
                    .icon:nth-child(3) {
                        width: 1.2rem;
                        height: 1.2rem;
                        margin: 0 .4rem;
                    }
                }
            }
        }
    }
    .musicDetail.light {
        color: #dfdfdfcf;
        fill: #dfdfdfcf;
        p.active {
            color: #fff;
        }
    }
    .musicDetail.dark {
        color: #232323cf;
        fill: #232323cf;
        p.active {
            color: #000;
        }
    }
</style>