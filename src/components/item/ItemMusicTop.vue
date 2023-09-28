<template>
    <div class="itemMusicTop">
        <img :src="playlist.coverImgUrl" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-mknetemsczuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mknetemscsousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mknetemscbofangduilie"></use>
            </svg>
        </div>
    </div>
    <div class="itemDetail">
        <div class="itemTitle">
            <div class="itemImg">
                <img :src="playlist.coverImgUrl" class="titleimg">
                <span class="playCount">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mknetemsc24gl-play"></use>
                    </svg>
                    <span> {{ changeCount(playlist.playCount)}} </span>
                </span>
            </div>
            <div class="itemInfo">
                <div class="titleinfo"><span>{{ playlist.name }}</span></div>
                <div class="creatorinfo">
                    <img :src="creator.avatarUrl">
                    <div> {{ creator.nickname }}</div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mknetemscyoujiantou"></use>
                    </svg>
                </div>
                <div class="description">
                    <div>{{ playlist.description }}</div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-mknetemscyoujiantou"></use>
                    </svg>
                </div>
            </div>
        </div>
        <div class="itemOption">
            <div class="optionItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscpinglun"></use>
                </svg>
                <span> {{ changeCount(playlist.commentCount) }}</span>
            </div>
            <div class="optionItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscfenxiang"></use>
                </svg>
                <span> {{ changeCount(playlist.shareCount) }}</span>
            </div>
            <div class="optionItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscxiazai"></use>
                </svg>
                <span>下载</span>

            </div>
            <div class="optionItem">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mknetemscshow_duoxuan"></use>
                </svg>
                <span>多选</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        // 通过props传值，判断如果数据拿不到，就获取sessionStorage中的
        props.playlist = props.playlist == "" ? JSON.parse(sessionStorage.getItem('itemDetail')).playlist : props.playlist
        props.creator = props.creator == "" ? JSON.parse(sessionStorage.getItem('itemDetail')).creator : props.creator
        const changeCount = num => {
            if(num >= 100000000) {
                return (num/100000000).toFixed(1) + '亿'
            } else if (num >= 10000) {
                return (num/10000).toFixed(1) + '万'
            } else {
                return num
            }
        }
        return { changeCount }
    },
    props: ['playlist', 'creator']
}
</script>

<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .itemLeft,.itemRight{
        width: 25%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 .2rem;
        span {
            font-size: .4rem;
            color: #fff;
        }
        .icon {
            fill: #fff;
        }
    }
    .bgimg {
        width: 100%;
        height: 12rem;
        position: fixed;
        z-index: -1;
        filter: blur(.6rem);
    }
}
.itemDetail {
    width: 100%;
    height: 5.1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .itemTitle {
        width: 100%;
        height: 3rem;
        display: flex;
        margin-top: .6rem;
        justify-content: space-between;
       .itemImg {
            width: 37%;
            height: 3rem;
            position: relative;
            margin: 0 .2rem;
            .titleimg {
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
            .playCount{
                position: absolute;
                right: .1rem;
                color: #fff;
                margin-top: 0.06rem;
                .icon {
                    width: .3rem;
                    height: .3rem;
                    margin-right: 0.05rem;
                    fill: none;
                    fill: #fff;
                }
            }
        }
        .itemInfo {
            width: 55%;
            height: 3rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 0 .2rem 0 0;
            .titleinfo {
                width: 100%;
                color: #fff;
                font-size: .36rem;
                font-weight: bold;
            }
            .creatorinfo {
                width: 100%;
                display: flex;
                align-items: center;
                margin: .3rem 0;
                img {
                    width: .7rem;
                    height: .7rem;
                    border-radius: 50%;
                }
                div {
                    font-size: .3rem;
                    color: #e3e3e3;
                    margin: 0 .1rem;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
                .icon {
                    width: .4rem;
                    fill: #e3e3e3;
                }
            }
            .description {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #e3e3e3;
                div {
                    width: 90%;
                    font-size: .28rem;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .icon {
                    width: .3rem;
                    fill: #e3e3e3;
                }
            }
        }
    }
    .itemOption {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .optionItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon {
                width: 1.2rem;
                fill: #fff;
            }
            span {
                margin: .2rem 0 0 0;
                color: #fff;
            }
        }
    }
}
</style>