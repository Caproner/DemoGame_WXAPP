import { AxiosInstance } from './types/Types'
import Axios from './core/AxiosCore'
// 工厂类型， 创建一个axios实例，混合类型

function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        ; (to as T & U)[key] = from[key] as any
    }
    return to as T & U
}

function createInstance(): AxiosInstance {
    const context = new Axios()
   //new一个Axios类实例context的同时，将Axios原型上的方法request(主要逻辑)的this始终绑定给context。目的是防止this指向出问题。
    const instance = Axios.prototype.request.bind(context)

    extend(instance, context)

    return instance as AxiosInstance
}

const axios = createInstance()

export default axios