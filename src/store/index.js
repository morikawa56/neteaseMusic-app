import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'

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
    playModeIndex: 1,
    randomPlayList: [],
    randomPlayListIndex: 0,
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
    updatePlayMode(state) {
      let playModeIndex = state.playModeIndex
      if(state.playModeIndex + 1 > 3) {
        state.playModeIndex = 0
      } else {
        state.playModeIndex = ++playModeIndex
      }
    },
    resetRandomPlayList(state) {
      state.randomPlayList = []
      state.randomPlayListIndex = 0
      state.randomPlayList.push(state.playListIndex)
      console.log(state.randomPlayList)
    },
    changeMusic(state, info) {
      console.log(state.playListIndex)
      let playListIndex= state.playListIndex
      let playList = state.playList
      let playMode = state.playMode
      let playModeIndex = state.playModeIndex
      let indexOffset = info.indexOffset
      let trigger = info.trigger
      if(playMode[playModeIndex] === 'order') {
        if(playListIndex + indexOffset > playList.length - 1 || playListIndex + indexOffset < 0) {
          console.log('超出范围')
        } else {
          sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
          state.playListIndex= playListIndex + indexOffset
        }
      }else if(playMode[playModeIndex] === 'list_loop') {
        if(playList.length === 1) {
          sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
          state.playListIndex = 0
        } else if(playListIndex + indexOffset > playList.length - 1 || playListIndex + indexOffset < 0) {
          if(playListIndex + indexOffset > playList.length - 1) {
            sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
            state.playListIndex = 0
          } else if(playListIndex + indexOffset < 0){
            sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
            state.playListIndex = playList.length - 1
          }
        } else {
          sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
          state.playListIndex= playListIndex + indexOffset
        }
      } else if(playMode[playModeIndex] === 'single_loop') {
        if(trigger === 'ended') {
          sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
          state.playListIndex = playListIndex
        } else {
          if(playListIndex + indexOffset > playList.length - 1 || playListIndex + indexOffset < 0) {
            if(playListIndex + indexOffset > playList.length - 1) {
              sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
              state.playListIndex = 0
            } else if(playListIndex + indexOffset < 0){
              sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
              state.playListIndex = playList.length - 1
            }
          } else {
            sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
            state.playListIndex= playListIndex + indexOffset
          }
        }
      } else if(playMode[playModeIndex] === 'random') {
        let randomPlayListIndex = state.randomPlayListIndex
        let randomPlayList = state.randomPlayList
        if(randomPlayListIndex + indexOffset <= 29 && randomPlayListIndex + indexOffset >= 0) {
          if(typeof randomPlayList[randomPlayListIndex + indexOffset] === "undefined") {
            sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
            state.playListIndex = Math.floor(Math.random() * playList.length)
            randomPlayList[randomPlayListIndex + indexOffset] = state.playListIndex
            console.log('创建了新的随机索引', state.randomPlayListIndex, state.randomPlayList[state.randomPlayListIndex])
            state.randomPlayListIndex = randomPlayListIndex + indexOffset
          } else {
            sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
            state.playListIndex = randomPlayList[randomPlayListIndex + indexOffset]
            state.randomPlayListIndex = randomPlayListIndex + indexOffset
            console.log('未创建新的随机索引', state.randomPlayListIndex)
          }
        } else if(randomPlayListIndex + indexOffset > 29) {
          for(let moveindex = 0; moveindex <= 29; moveindex++) {
            randomPlayList[moveindex] = randomPlayList[moveindex + 1]
          }
          sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
          state.playListIndex = Math.floor(Math.random() * playList.length)
          randomPlayList[29] = state.playListIndex
          console.log('创建了新的随机索引', state.randomPlayListIndex, state.randomPlayList[state.randomPlayListIndex])
          randomPlayListIndex = 29
          state.randomPlayListIndex = randomPlayListIndex
        } else if(randomPlayListIndex + indexOffset < 0) {
          for(let moveindex = 29; moveindex > 0; moveindex--) {
            randomPlayList[moveindex] = randomPlayList[moveindex - 1]
          }
          sessionStorage.setItem('lastMusicId', state.playList[state.playListIndex].id)
          state.playListIndex = Math.floor(Math.random() * playList.length)
          randomPlayList[0] = state.playListIndex
          console.log('创建了新的随机索引', state.randomPlayListIndex, state.randomPlayList[state.randomPlayListIndex])
          randomPlayListIndex = 0
          state.randomPlayListIndex = randomPlayListIndex
        }
      }
      state.currentTime = 0
      state.playing = true
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
