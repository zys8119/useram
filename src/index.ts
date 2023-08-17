import {App} from "vue"
import {Options} from "../type";
import {merge} from "lodash";
export class Useram {
    dafaultConfig:Partial<Options> = {
        time:1000
    }
    config:Options
    constructor(public app:App, private options:Partial<Options> = {}) {
        this.config = merge(this.dafaultConfig, options) as Options
        this.init()
    }

    async init(){
        document.addEventListener('mousemove', this.handleUserActivity.bind(null, true));
        document.addEventListener('keydown', this.handleUserActivity.bind(null, true));
        document.addEventListener('visibilitychange', this.handleUserActivity.bind(null, false));
        await this.startInactivityTimer()
    }
    handleUserActivity(isVisible){
        if(isVisible || !isVisible && document.visibilityState === 'visible'){
            // 页面在前台，用户活跃
        }else {
            setInterval(()=>{
                console.log(111)
            })
            // 页面在后台，用户不活跃
        }
    }
    async startInactivityTimer(){
        // console.log(111)
        // setTimeout(async ()=>{
        //     await this.startInactivityTimer()
        // }, this.config.time)
    }

}
const install = (app:App, config:Options)=>{
    new Useram(app, config)
}
export default {
    install
}
