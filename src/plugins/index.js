import { Swipe, SwipeItem, Button, Popup, Slider, ConfigProvider, Search, Dialog } from 'vant'

let plugins = [ Swipe, SwipeItem, Button, Popup, Slider, ConfigProvider, Search, Dialog ]

export default function(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}