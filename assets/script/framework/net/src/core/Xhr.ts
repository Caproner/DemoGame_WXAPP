/**
 *  实现请求逻辑
*/

import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from "../types/Types"
import { transHeaders } from '../helper/Headers'
import { createError } from '../helper/Error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        // data默认为null，methods默认为get
        let { data = null, url, method = 'get', headers, responseType, timeout } = config

        const request = new XMLHttpRequest()

        if (responseType) {
            request.responseType = responseType
        }

        request.onreadystatechange = function handleRequest() {
            if (request.readyState !== 4) {
                return
            }
            //网络错误或超时等错误
            if (request.status === 0) {
                return
            }
            const responseHeaders = transHeaders(request.getAllResponseHeaders())
            const responseData = responseType !== 'text' ? request.response : request.responseType
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
            // 对正常情况以及异常请求做处理
            handleResponse(response)
        }

        // 网络错误处理
        request.onerror = function handleError() {
            reject(createError('Network Error', config, null, request))
        }
        // 请求超时处理 如果有规定超时时间，不传时XMLHttpRequest默认是0，意味着没有超时
        if (timeout) {
            request.timeout = timeout
        }
        request.ontimeout = function handleTimeout() {
            reject(createError(`${timeout}ms, request is timeout`, config, 'ECONNABORTED', request))
        }

        // 设置headers
        Object.keys(headers).forEach(name => {
            // data是空的话，contentType是没有意义的
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })

        if (data) {
            let queryString = ''
            Object.keys(data).forEach(key => {
                queryString += `${key}=${data[key]}&`
            })
            //去掉最后一个&
            queryString = queryString.substring(0, queryString.length - 1)
            //把queryString拼到url上
            url += '?' + queryString
        }

        //打开连接(还没有请求)
        request.open(method, url)
        //发送请求
        if (method.toUpperCase() === 'GET' || method.toUpperCase() === 'DELETE') {
            request.send()
        } else if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
            //设置请求头类型
            request.setRequestHeader('ContentType', 'application/json;charset=utf-8')
            //将data从js对象转成json string
            request.send(JSON.stringify(data))
        }

        function handleResponse(response: AxiosResponse): void {
            if (response.status >= 200 && response.status < 300) {
                resolve(response)
            } else {
                reject(createError(`STATUS: ${response.status} ,request is failed`, config, null, request, response))
            }
        }
    })
}