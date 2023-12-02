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
            <div class="alInfo">
                
            </div>
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
            })

            onUpdated(() => {
                console.log('Updated')
                changeTheme(props.playing.al.picUrl, musicTitle.value, bacCover.value)
            })
            function showDetail() {
                store.commit('setMusicDetailShow')
            }

            return { showDetail, musicTitle, bacCover, songName }
        },
        props: [ 'playing' ],
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
            background-color: rgba(255, 255, 255, 0.3);
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
                    margin-right: 0.2rem;
                }
            }
        }
    }
    
</style>