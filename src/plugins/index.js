import { Swipe, SwipeItem, Button, Popup, Slider, ConfigProvider } from 'vant'

let plugins = [ Swipe, SwipeItem, Button, Popup, Slider, ConfigProvider ]

export default function(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}