import XHRInterface, { XHROptions } from '@ilovepdf/ilovepdf-js-core/utils/XHRInterface';
import ILovePDFFile from './ILovePDFFile';

export default class XHRPromise implements XHRInterface {

    public get<T>(url: string, options?: XHROptions) {
        return XHRPromise.makeRequest<T>('GET', url, undefined, options);
    }

    public post<T>(url: string, data?: any, options: XHROptions = {}) {
        const parsedData = data instanceof ILovePDFFile ? data.data : data;
        return XHRPromise.makeRequest<T>('POST', url, parsedData, options);
    }

    public put<T>(url: string, data?: any, options: XHROptions = {}) {
        return XHRPromise.makeRequest<T>('PUT', url, data, options);
    }

    public delete<T>(url: string, options: XHROptions = {}) {
        return XHRPromise.makeRequest<T>('DELETE', url, undefined, options);
    }

    private static makeRequest<T>(method: string, url: string, data?: any, options: XHROptions = {}): Promise<T> {
        return new Promise<T>(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            if (!(data instanceof FormData)) {
                XHRPromise.setHeaders(xhr, options);
            }

            XHRPromise.setEncoding(xhr, options);

            // Success handling.
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    const { transformResponse } = options;
                    const response = !!transformResponse ? transformResponse(this.response) : this.response;
                    resolve(response);
                    return;
                }

                if (XHRPromise.isBinary(options)) {
                    reject({
                        status: this.status,
                        statusText: 'File could not be downloaded.',
                    });
                    return;
                } else {
                    const parsedResponse = JSON.parse(this.responseText);
                    const { error, name, message } = parsedResponse;
                    let status;
                    let statusText;

                    if (!!error) {
                        const { code, message } = error;
                        status = code;
                        statusText = message;
                    } else {
                        status = this.status;
                        statusText = `${name} - ${message}`;
                    }

                    reject({
                        status,
                        statusText
                    });
                }
            };

            // Error handling.
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: this.statusText
                });
            };

            // Отправка данных
            xhr.send(data);
        })
        .catch(error => {
            throw error;
        });
    }

    private static setHeaders(xhr: XMLHttpRequest, options: XHROptions = {}) {
        if (!!options.headers) {
            options.headers.forEach(([ key, value ]) => {
                xhr.setRequestHeader(key, value);
            });
        }
    }

    private static setEncoding(xhr: XMLHttpRequest, options: XHROptions = {}) {
        // Enable arraybuffer as a return type when binary is enabled.
        if (XHRPromise.isBinary(options)) xhr.responseType = 'arraybuffer';
    };

    private static isBinary(options: XHROptions): boolean {
        return !!options.binary;
    }
}
