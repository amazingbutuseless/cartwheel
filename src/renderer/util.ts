enum XHRMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
};

interface XHRData {
    [key: string]: any,
}

interface XHRParams {
    url: string,
    method: XHRMethod,
    headers?: XHRData,
    data?: any,
    responseType?: 'json',
}

const XHR = {
    buildQuery(data: XHRData): string {
        let query = '';

        for (const key in data) {
            if (query.length > 0) query += '&';
            query += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        }

        return '?' + query;
    },

    request({ url, method, headers, data, responseType }: XHRParams) {
        const xhr = new XMLHttpRequest();

        return new Promise((resolve, reject) => {
            let reqUrl = url;

            if (method === XHRMethod.GET && data) reqUrl += this.buildQuery(data);

            xhr.open(method || 'GET', reqUrl);

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = xhr.response;
                    if (responseType) response = JSON.parse(response);
                    resolve(response);

                } else {
                    reject(xhr.statusText);
                }
            };

            xhr.onerror = () => reject(xhr.statusText);
            xhr.send(method != 'GET' ? data : '');
        });
    }
};

const Util = {
    xhr: XHR,
};

export default Util;
