function remSize() {
    // 获取设备的宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if(deviceWidth>=750) {
        deviceWidth = 750
    } else if(deviceWidth <= 320) {
        deviceWidth = 320
    }
    // 750px: 1rem == 100px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    // 设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
// 当窗口发生变化时进行适配
window.onresize = () => {
    remSize()
}