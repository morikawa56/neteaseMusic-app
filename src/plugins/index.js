import { Swipe, SwipeItem, Button, Popup } from 'vant'

let plugins = [ Swipe, SwipeItem, Button, Popup ]

export default function(app) {
    plugins.forEach((item)=>{
        return app.use(item)
    })
}