<template>
  <ItemMusicTop :playlist="state.playlist" :creator="state.creator"/>
</template>

<script>
  import { onMounted, reactive } from 'vue';
  import { useRoute } from 'vue-router';
  import { getMusicItemList } from '@/request/api/item';
  import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
  export default {
    name: 'ItemMusic',
    setup() {
      const state = reactive({
        playlist: {},
        creator: {}
      })
      onMounted(async ()=>{
        let id = useRoute().query.id
        let res = await getMusicItemList(id)
        state.playlist = res.data.playlist
        state.creator = res.data.playlist.creator
        sessionStorage.setItem('itemDetail', JSON.stringify(state))
        // console.log(state.playlist)
      })
      return {state}
    },
    components: {
      ItemMusicTop
    }
  }
</script>

<style>

</style>