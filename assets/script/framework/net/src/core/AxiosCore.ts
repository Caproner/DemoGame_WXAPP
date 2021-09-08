import { AxiosPromise, AxiosRequestConfig, METHOD, ResolvedFun, RejectedFun } from "../types/Types";
import dispatchRequest from './DispatchRequest'

interface PromiseChain<T> {
    resolved: ResolvedFun<T> | ((config: AxiosRequestConfig) => AxiosPromise)
    rejected?: RejectedFun
}

export default class Axios {

    // 支持重载
    request(url: any, config?: any): AxiosPromise {
        //url检查
        if (typeof url === 'string') {
            if (!config) {
                config = {}
            }
            config.url = url
        } else {
            config = url
        }

        const chain: PromiseChain<any>[] = [{
            resolved: dispatchRequest,
            rejected: undefined
        }]

        let promise = Promise.resolve(config)

        while (chain.length) {
            const { resolved, rejected } = chain.shift()!
            promise = promise.then(resolved, rejected)
        }

        return promise
    }

    get(url: string, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithoutData('get', url, config)
    }

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
        return this._requestMethodWithData('post', url, data, config)
    }

    //可添加其他接口put, head, option  ...

    // 辅助函数
    _requestMethodWithoutData(method: METHOD, url: string, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            method,
            url
        }))
    }
    _requestMethodWithData(method: METHOD, url: string, data?: any, config?: AxiosRequestConfig) {
        return this.request(Object.assign(config || {}, {
            method,
            url,
            data
        }))
    }
}