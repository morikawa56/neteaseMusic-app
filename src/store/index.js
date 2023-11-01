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
      },
      ar: [
        {
            "id": 14885023,
            "name": "花玲",
            "tns": [],
            "alias": []
        },
        {
            "id": 55361446,
            "name": "张安琪",
            "tns": [],
            "alias": []
        },
        {
            "id": 55256785,
            "name": "沐霏",
            "tns": [],
            "alias": []
        }
      ]
    }],
    playListIndex:0,
    playing:false,
    musicDetailShow: false,
  },
  getters: {
  },
  mutations: {
    setPlaying(state, isPlaying) {
      state.playing = isPlaying
    },
    sessionPut(state) {
      sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
    },
    updatePlayList(state, playList) {
      state.playList = playList
    },
    updatePlayIndex(state, index) {
      state.playListIndex = index
    },
    setMusicDetailShow(state) {
      state.musicDetailShow = !state.musicDetailShow
    }
  },
  actions: {
  },
  modules: {
  }
})
