import ColorThief from "colorthief/dist/color-thief.mjs"
import colorsys from "colorsys"

const colorthief = new ColorThief()

function deepenPurity(rgb, percentage) {
    const hsl = rgbToHsv(...rgb);
    const purity = hsl[1];
    let newPurity = purity + percentage;
    if (newPurity > 100) {
        newPurity = 100;
    } else if(newPurity < 0) {
        newPurity = 0;
    }
    const newHsl = [hsl[0], newPurity, hsl[2]];
    // console.log(hsl, newHsl)
    return colorsys.hsv2Rgb(...newHsl);
}

function deepenLight(rgb, percentage) {
    const hsl = rgbToHsv(...rgb);
    const light = hsl[2];
    let newLight = light - percentage;
    if (newLight > 100) {
        newLight = 100;
    } else if(newLight < 0) {
        newLight = 0;
    }
    const newHsl = [hsl[0], hsl[1], newLight];
    // console.log(hsl, newHsl)
    return colorsys.hsv2Rgb(...newHsl)
}

function rgbToHsv(red,green,blue){
    const r=red/255;
    const g=green/255;
    const b=blue/255;
    let h, s, v;
    const min = Math.min(r, g, b);
    const max = v = Math.max(r, g, b);
    const l = (min + max) / 2;
    const difference = max - min;

    if(max==min){
        h=0;
    }else{
        switch(max){
            case r: h=(g-b)/difference+(g < b ? 6 : 0);break;
            case g: h=2.0+(b-r)/difference;break;
            case b: h=4.0+(r-g)/difference;break;
        }
        h=Math.round(h*60);
    }
    if(max==0){
        s=0;
    }else{
        s=1-min/max;
    }
    s=Math.round(s*100);
    v=Math.round(v*100);
    return [h,s,v];
}


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

export function progressBarColor(bgimg) {
    let activeColorValue = deepenPurity(colorthief.getColor(bgimg),30)
    // console.log(colorthief.getColor(bgimg), activeColorValue, barColorValue)
    console.log(activeColorValue, rgbToHex(activeColorValue.r,activeColorValue.g,activeColorValue.b))
    return rgbToHex(activeColorValue.r,activeColorValue.g,activeColorValue.b)
}
export default colorthief