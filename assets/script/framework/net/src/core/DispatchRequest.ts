import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/Types'
import { processHeaders } from "../helper/Headers"
import Util from "../../../util/Util"
import xhr from "./Xhr"

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    //处理请求数据 : 
    processConfig(config);
    return xhr(config).then((res) => {
        return transResponseData(res)
    })
}
// 对响应数据data做处理
function transResponseData(response: AxiosResponse): AxiosResponse {
    response.data = Util.transData(response.data)
    return response
}

function processConfig(config: AxiosRequestConfig): void {
    //config.url = transURL(config)
    config.headers = transHeaders(config) 
    config.data = transRequestData(config)
}

// 对config.data做处理
function transRequestData(config: AxiosRequestConfig): any {
    return Util.transRequest(config.data)
}
// 对config.headers做处理
function transHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}