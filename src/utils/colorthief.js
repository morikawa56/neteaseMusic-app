import ColorThief from "colorthief/dist/color-thief.mjs"

const colorthief = new ColorThief()

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
}).join('')
const Grayer = (r, g, b) => {
    let Gray = Math.floor((r + g + b) / 3)
    return Gray
}

export function changeTitleColor(bgimg, musicTitle, bacCover) {
    let grayValue = Grayer(...colorthief.getColor(bgimg))
    let colorValue = rgbToHex(...colorthief.getColor(bgimg))
    if(grayValue >= 127 && grayValue <= 255) {
        musicTitle.style.color = "#000000cf"
        musicTitle.style.fill = "#000000cf"
        bacCover.style.backgroundColor = colorValue + '4d'
    } else if (grayValue >= 0 && grayValue < 127) {
        musicTitle.style.color = "#ffffffcf"
        musicTitle.style.fill = "#ffffffcf"
        bacCover.style.backgroundColor = colorValue + '4d'
    }
}

export function changeTheme(bgImgUrl, musicTitle, bacCover) {
    // 创建crossOrigin跨域img标签传入ColorThief.getColor函数防止报错
    const bgimg = new Image()
    bgimg.crossOrigin = ''
    bgimg.onload = () => {
        changeTitleColor(bgimg, musicTitle, bacCover)
        // console.log(colorthief.getPalette(bgimg))
    }
    bgimg.src = bgImgUrl
    // console.log(musicTitle)
}

export default colorthief