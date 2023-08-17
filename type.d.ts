export type Options = {
    // 定时监测间隔时间
    intervalTime?:number
    // 有效时间
    validTime?:number
    // 活跃回调
    onActive?:ActiveCallBack
    // 不活跃回调
    onUnActive?:ActiveCallBack
    // 是否控制台输出
    isConsole?:boolean
}

export type ActiveCallBack = ()=> void
