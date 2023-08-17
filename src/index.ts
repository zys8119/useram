import {App} from "vue"
import {Options} from "../type";
import {merge} from "lodash";
let isActive = false
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
            window.addEventListener(type, this.handleUserActivity.bind(this));
        })
        await this.startInactivityTimer()
    }
    handleUserActivity(){
        this.start = performance.now()
    }
    async startInactivityTimer(){
        const currTime = performance.now() - this.start
        isActive = currTime >= this.config.validTime
        if(isActive){
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
