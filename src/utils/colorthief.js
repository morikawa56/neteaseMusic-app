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

export function changeDetailColor(bgimg, bacCover) {
    let grayValue = Grayer(...colorthief.getColor(bgimg))
    let colorValue = rgbToHex(...colorthief.getColor(bgimg))
    if(grayValue >= 127 && grayValue <= 255) {
        bacCover.style.backgroundColor = colorValue + '4d'
        return false
    } else if (grayValue >= 0 && grayValue < 127) {
        bacCover.style.backgroundColor = colorValue + '4d'
        return true
    }
}

export function changeTheme(bgImgUrl, bacCover) {
    // 创建crossOrigin跨域img标签传入ColorThief.getColor函数防止报错
    const bgimg = new Image()
    bgimg.crossOrigin = ''
    bgimg.onload = () => {
        changeTitleColor(bgimg, bacCover)
        // console.log(colorthief.getPalette(bgimg))
    }
    bgimg.src = bgImgUrl
    // console.log(musicDetail)
}

export default colorthief