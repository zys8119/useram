import {App} from "vue"
import {Options} from "../type";
import {merge} from "lodash";
export class Useram {
    start:number
    dafaultConfig:Options = {
        intervalTime:100,
        validTime:5000,
        isConsole:true,
    }
    config:Required<Options>
    eventTypes:Array<keyof DocumentEventMap | 'mousewheel' | 'DOMMouseScroll'> = [
        'wheel', 'mousewheel', 'DOMMouseScroll',
        'mousedown', 'mousemove',
        "keydown",
        "touchstart", "touchmove",
        "visibilitychange",
        'resize'
    ]
    constructor(public app:App, private options:Options = {}) {
        this.config = merge(this.dafaultConfig, options) as Required<Options>
        this.init()
    }

    async init(){
        this.start = performance.now()
        this.eventTypes.forEach(type=>{
            window.addEventListener(type, this.handleUserActivity.bind(this, !['visibilitychange'].includes(type)));
        })
        await this.startInactivityTimer()
    }
    handleUserActivity(isVisible){
        if(isVisible || !isVisible && document.visibilityState === 'visible'){
            // 页面在前台，用户活跃
            this.start = performance.now()
        }else {
            // 页面在后台，用户不活跃
            this.start = performance.now()
        }
    }
    async startInactivityTimer(){
        const currTime = performance.now() - this.start
        if(currTime >= this.config.validTime){
            if(this.config.isConsole){
                console.log("不活跃")
            }
            this.config.onActive?.()
        }else {
            if(this.config.isConsole) {
                console.log("活跃")
            }
            this.config.onUnActive?.()
        }
        setTimeout(async ()=>{
            await this.startInactivityTimer()
        }, this.config.intervalTime)
    }

}
const install = (app:App, config:Options)=>{
    new Useram(app, config)
}
export default {
    install
}
