import { Swipe, SwipeItem, Button, Popup, Slider, ConfigProvider, Search } from 'vant'

let plugins = [ Swipe, SwipeItem, Button, Popup, Slider, ConfigProvider, Search ]

export default function(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}