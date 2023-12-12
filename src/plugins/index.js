import { Swipe, SwipeItem, Button, Popup, Slider } from 'vant'

let plugins = [ Swipe, SwipeItem, Button, Popup, Slider ]

export default function(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}