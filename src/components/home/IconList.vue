<template>
  <div class="iconList">
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mknetemsctuijian"></use>
        </svg>
        <span>每日推荐</span>
    </div>
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mknetemsczhiboyunfuwu"></use>
        </svg>
        <span>私人FM</span>
    </div>
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mknetemscgedan"></use>
        </svg>
        <span>歌单</span>
    </div>
    <div class="iconItem">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mknetemscpaihangbang"></use>
        </svg>
        <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    .iconList {
        width: 100%;
        height: 2rem;
        display: flex;
        margin-top: .3rem;
        justify-content: space-around;
        align-items: center;
        .iconItem {
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            .icon {
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>