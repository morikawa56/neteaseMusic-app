<template>
  <router-view/>
   <FooterPlayer/>
</template>

<script>
  import FooterPlayer from './components/item/FooterPlayer.vue';
  export default {
    components: {
      FooterPlayer
    }
  }
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .icon {
    width: .5rem;
    height: .5rem;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  a {
    color: black;
  }
</style>
