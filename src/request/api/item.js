import service from '../axios'
// 获取歌单详情页的数据
export function getMusicListDetail(data) {
    return service({
        method:'GET',
        url: `/playlist/detail?id=${data}`
    })
}

export function getMusicLyric(data) {
    return service({
        method:'GET',
        url: `/lyric?id=${data}`
    })
}