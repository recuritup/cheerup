import { LOCAL_STORAGE_KEY } from '@/constants/storage';
import type { ApiErrorScheme } from '@/exceptions';
import { ApiException, CustomException, errorMessage } from '@/exceptions';
import { isProd } from '@/utils';
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { Storage } from '../storage';

const DEVELOPMENT_API_URL = 'http://localhost:8088';
const PRODUCTION_API_URL = 'http://localhost:8088';

const instance = axios.create({
  baseURL: isProd(process.env.NODE_ENV) ? PRODUCTION_API_URL : DEVELOPMENT_API_URL,
  timeout: 15000,
});

const interceptorRequestFulfilled = (config: InternalAxiosRequestConfig) => {
  if (typeof window === 'undefined') {
    return config;
  }
  const accessToken = Storage.getItem(LOCAL_STORAGE_KEY.accessToken);
  if (!config.headers) {
    return config;
  }
  if (!accessToken) {
    return config;
  }

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
};

instance.interceptors.request.use(interceptorRequestFulfilled);

// Response interceptor
const interceptorResponseFulfilled = (res: AxiosResponse) => {
  if (200 <= res.status && res.status < 300) {
    return res.data;
  }

  return Promise.reject(res.data);
};

// Response interceptor
const interceptorResponseRejected = (error: AxiosError<ApiErrorScheme>) => {
  if (error.response?.data?.['response_messages']) {
    return Promise.reject(new ApiException(error.response.data, error.response.status));
  }

  if (error.message.startsWith('timeout')) {
    return Promise.reject(new CustomException(errorMessage.TIMEOUT, 'NETWORK_TIMEOUT'));
  }

  return Promise.reject(new CustomException(errorMessage.UNKNOWN_400, 'NETWORK_ERROR'));
};

instance.interceptors.response.use(interceptorResponseFulfilled, interceptorResponseRejected);

export const get = <T>(...args: Parameters<typeof instance.get>) => {
  return instance.get<T, T>(...args);
};

export const post = <T>(...args: Parameters<typeof instance.post>) => {
  return instance.post<T, T>(...args);
};

export const put = <T>(...args: Parameters<typeof instance.put>) => {
  return instance.put<T, T>(...args);
};

export const patch = <T>(...args: Parameters<typeof instance.patch>) => {
  return instance.patch<T, T>(...args);
};

export const del = <T>(...args: Parameters<typeof instance.delete>) => {
  return instance.delete<T, T>(...args);
};
