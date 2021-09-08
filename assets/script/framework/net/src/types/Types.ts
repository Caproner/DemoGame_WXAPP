/**
 *  公共类型定义文件
 */

export type METHOD = 'get' | 'GET' | 'delete' | 'DELETE' | 'head' | 'HEAD' | 'options' | 'OPTIONS' | 'post' | 'POST' | 'put' | 'PUT' | 'patch' | 'PATCH'

//请求数据类型
export interface AxiosRequestConfig {
    url?: string,
    method?: METHOD,
    headers?: any,
    data?: any,
    params?: any,
    responseType?: XMLHttpRequestResponseType,
    timeout?: number 
}


// 响应数据类型
export interface AxiosResponse<T = any> {
    data: T,
    status: number,
    statusText: string,
    headers: any,
    config: AxiosRequestConfig,
    request: any
}

// 返回一个Promise对象  继承于泛型接口
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> { }

// 描述Axios类中的公共方法
export interface Axios {
    
    request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
    <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

    <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 类型接口
export interface ResolvedFun<T> {
    (val: T): T | Promise<T>
}
export interface RejectedFun {
    (error: any): any
}