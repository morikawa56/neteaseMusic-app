import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import {computed} from "vue";

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
    musicLyricShowed: false,
    volume: 0.15,
    currentTime: 0,
    playMode: ['order', 'list_loop',  'single_loop', 'random'],
    lyricInfo: {

    }
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
    },
    updateLyric(state, lyric) {
      state.lyricInfo = lyric
      // console.log(state.lyricInfo.lyric)
    },
    updateCurrentTime(state, time) {
      state.currentTime = time
    },
    updateMusicLyricShowed(state, isShowed) {
      state.musicLyricShowed = isShowed
    },
    changeMusic(state, indexOffset) {
      let playListIndex= state.playListIndex
      let playList = state.playList
      if(playListIndex + indexOffset > playList.length - 1 || playListIndex + indexOffset < 0) {
        console.log('超出范围')
      } else {
        sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
        state.playListIndex= playListIndex + indexOffset
        state.playing =  true
      }
    }
  },
  actions: {
    getLyric: async function(context, id) {
      let res = await getMusicLyric(id)
      context.commit('updateLyric', res.data.lrc)
    }
  },
  modules: {
  }
})
