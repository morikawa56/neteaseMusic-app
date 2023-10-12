<template>
    <div class="topNav">
      <div class="topleft">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mknetemsc31liebiao"></use>
          </svg>
      </div>
      <div class="top-content">
          <span>我的</span>
          <span class="active">发现</span>
          <span>社区</span>
          <span>视频</span>
      </div>
      <div class="topright">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-mknetemscsousuo"></use>
          </svg>
      </div>
    </div>
</template>

<script>
  export default {

  }
</script>

<style lang="less" scoped>
      .topNav {
          width: 100%;
          height: 1.2rem;
          padding: .2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .top-content {
              width: 65%;
              height: 100%;
              display: flex;
              justify-content: space-around;
              align-items: center;
              font-size: .36rem;
              .active {
                  font-weight: bold;
              }
          }
      }
</style>