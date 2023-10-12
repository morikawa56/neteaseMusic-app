<template>
  <ItemMusicTop :playlist="state.playlist" :creator="state.creator"/>
  <ItemMusicList :songs="state.songs" :playlist="state.playlist" />
</template>

<script>
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { getMusicListDetail } from '@/request/api/item';
  import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
  import ItemMusicList from '@/components/item/ItemMusicList.vue'
  export default {
    name: 'ItemMusic',
    setup() {
      const state = reactive({
        playlist: {},
        creator: {},
        songs: []
      })
      onMounted(async ()=>{
        let id = useRoute().query.id
        // 获取歌单详情页
        let res = await getMusicListDetail(id)
        state.playlist = res.data.playlist
        state.creator = res.data.playlist.creator
        // 获取歌单的歌曲
        state.songs = res.data.playlist.tracks
        sessionStorage.setItem('itemDetail', JSON.stringify(state))
        // console.log(state.playlist)
      })
      return {state}
    },
    components: {
      ItemMusicTop,
      ItemMusicList
    }
  }
</script>

<style>

</style>