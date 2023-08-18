export type Options = {
    // 定时监测间隔时间,毫秒
    intervalTime?:number
    // 有效时间,毫秒
    validTime?:number
    // 活跃回调
    onActive?:ActiveCallBack
    // 不活跃回调
    onUnActive?:ActiveCallBack
    // 是否控制台输出
    isConsole?:boolean
    // 监听事件
    eventTypes?:EventTypes
}

export type ActiveCallBack = ()=> void
export interface install {
    (app:any, options?:Options):void
}
export interface UseramPlug {
    install:install
}
declare const useramPlug:UseramPlug
export default useramPlug
export type EventTypes = Array<keyof DocumentEventMap | 'mousewheel' | 'DOMMouseScroll'>
export interface ImplementsUseram {
    start:number
    /**
     * 默认配置
     */
    readonly dafaultConfig:Options
    config:Required<Options>

    /**
     * 初始化
     */
    init():Promise<void> | void

    /**
     * 更新活跃时间
     */
    handleUserActivity():void

    /**
     * 定时查询用户是否活跃
     */
    startInactivityTimer():Promise<void> | void
}
export interface ImplementsUseramCalss extends ImplementsUseram{
    (options?:Options):ImplementsUseram
    new (options?:Options):ImplementsUseram
}

export const Useram:ImplementsUseramCalss
