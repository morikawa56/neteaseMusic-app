<template>
    <div class="musicDetail">
        <img :src="playing.al.picUrl" class="bgimg">
        <div class="bacCover" ref="bacCover"></div>
        <div class="musicTitle" ref="musicTitle">
            <div class="titleLeft">
                <svg class="icon" aria-hidden="true" @click="showDetail">
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
                @click="isLyricShow = true"
                :class="{ img_al_active: playStatus, img_al_pauesd: !playStatus }"
            />
        </div>
    </div>
</template>

<script>
    import { onMounted, onUpdated, ref } from 'vue'
    import { useStore } from 'vuex'
    import { Vue3Marquee } from 'vue3-marquee'
    import { changeTheme }  from '@/utils/colorthief'
    export default {
        name: 'MusicDetail',
        setup(props){
            const store = useStore();
            let musicTitle = ref(null)
            let bacCover = ref(null)
            let songName = ref(null)

            onMounted(() => {
                console.log('Mounted')
                changeTheme(props.playing.al.picUrl, musicTitle.value, bacCover.value)
                console.log(props.playStatus)
            })

            onUpdated(() => {
                console.log('Updated')
                changeTheme(props.playing.al.picUrl, musicTitle.value, bacCover.value)
                console.log(props.playStatus)
            })
            function showDetail() {
                store.commit('setMusicDetailShow')
            }

            return { showDetail, musicTitle, bacCover, songName }
        },
        props: [ 'playing', 'playStatus' ],
        computed: {
            showTitleMarquee() {
                return this.playing.name.length > 10
            },
            showSingerMarquee() {
                return this.playing.ar.length > 4
            }
        },
        components: {
            Vue3Marquee,
        }
    }
</script>

<style lang="less" scoped>
    .musicDetail{
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
            height: 11rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
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
    }
</style>