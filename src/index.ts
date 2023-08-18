import {App} from "vue"
import {Options, ImplementsUseram, EventTypes} from "../type";
import {merge} from "lodash";
let isUnActive = false
export class Useram implements ImplementsUseram{
    start:number
    readonly dafaultConfig:Options = {
        intervalTime:100,
        validTime:5000,
        isConsole:false,
    }
    config:Required<Options>
    private eventTypes:EventTypes = [
        'wheel', 'mousewheel', 'DOMMouseScroll',
        'mousedown', 'mousemove',
        "keydown",
        "touchstart", "touchmove",
        "visibilitychange",
        'resize'
    ]
    constructor(private options:Options = {}) {
        this.config = merge(this.dafaultConfig, options) as Required<Options>
        this.eventTypes = this.options.eventTypes || this.eventTypes
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
        isUnActive = currTime >= this.config.validTime
        if(isUnActive){
            if(this.config.isConsole){
                console.log("不活跃")
            }
            this.config.onUnActive?.()
        }else {
            if(this.config.isConsole) {
                console.log("活跃")
            }
            this.config.onActive?.()
        }
        setTimeout(async ()=>{
            await this.startInactivityTimer()
        }, this.config.intervalTime)
    }
}
const install = (app:App, config:Options)=>{
    new Useram(config)
}
export default {
    install
}
