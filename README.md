# useram

用户活跃监测 （User activity monitoring）

# 安装

`npm i useram`

# 使用

main.ts

```typescript
import {createApp} from "vue"
import useram from "useram"

const app = createApp(App)

app.use(useram, Options)
```

# OptionsTypes

```typescript
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
}

export type ActiveCallBack = ()=> void
```
