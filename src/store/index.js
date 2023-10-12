import { createStore } from 'vuex'

export default createStore({
  state: {
    playList:[{
      id: 2014336709,
      name: "我不曾忘记",
      al:{
        id: 158206361,
        name: "我不曾忘记",
        picUrl: "http://p1.music.126.net/dM_2lEqG7ZP7l0NjoApPFg==/109951168232666774.jpg",
        pic_str: "109951168232666774",
        pic: 109951168232666770
      }
    }],
    playListIndex:0,
    playing:false,
  },
  getters: {
  },
  mutations: {
    setPlaying(state, isPlaying) {
      state.playing = isPlaying
      console.log(state.playing)
    },
    updatePlayList(state, playList) {
      state.playList = playList
      console.log(state.playList)
    },
    updatePlayIndex(state, index) {
      state.playListIndex = index
    },
  },
  actions: {
  },
  modules: {
  }
})
