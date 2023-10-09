import axios, { AxiosInstance } from 'axios';


export class Request {
  axiosInstance: AxiosInstance;
  accessToken?: string;
  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
  }

  async sendRequest(payload: any) {
    const { method = 'get', url, body = null, options = {}, multipart = false } = payload;
    let formData = body;

    if (multipart) {
      if (method !== 'get' && method !== 'delete') {
        if (!body) throw new Error('No request body');
        formData = new FormData();
        for (let key in body) {
          // Todo, allow null optionally with parameter
          if (body[key] == null) continue;
          if (typeof body[key] === 'string' && !body[key].length) continue;
          if (
            typeof body[key] === 'object' &&
            !Array.isArray(body[key]) &&
            body[key] != null &&
            !(body[key] instanceof File)
          ) {
            for (let key2 in body[key]) {
              formData.append(key, body[key][key2]);
            }
          } else if (Array.isArray(body[key])) {
            body[key].forEach((file: File) => formData.append(key + '[]', file));
          } else {
            formData.append(key, body[key]);
          }
        }
      }
    }

    try {
      let res = null;
      if (method === 'delete' || method === 'get') {
        res = await this.axiosInstance[method as 'get' | 'delete'](url, options);
      } else {
        res = await this.axiosInstance[method as 'put' | 'patch' | 'post'](url, formData, options);
      }
      return res.data;
    } catch (error: any) {
      let err = '';
      if (error.response) {
        if (error.response.data) {
          err = error.response.data;
        }
      } else {
        err = error.message;
      }
      return Promise.reject(err);
    }
  }
  //   requestInterceptor() {
  //     this.axiosInstance.interceptors.request.use(
  //       (request) => {
  //         const state = store!.getState();

  //         const accessToken = state.auth.token;

  //         request.headers = {
  //           ...request.headers,
  //           Authorization: `Bearer ${accessToken}`,
  //         };
  //         return request;
  //       },
  //       (err: any) => Promise.reject(err),
  //     );
  //   }
}
