import axios, { AxiosError, AxiosInstance } from 'axios';

import constants from '~constants';

import { HTTP_STATUS } from './constants';
import { getAccessToken, removeAccessToken, setAccessToken } from './cookies';
import { isErrorResponse, isLoginResponse } from './responseChecker';

class Http {
  private accessToken: string;
  instance: AxiosInstance;

  constructor() {
    this.accessToken = getAccessToken();
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );
    this.instance.interceptors.response.use(
      (response) => {
        if (isLoginResponse(response)) {
          this.accessToken = response.data.data.login.access_token;
          if (this.accessToken) setAccessToken(this.accessToken);
          console.log('🚀 ~ Http ~ constructor ~ this.accessToken:', this.accessToken);
        }

        if (isErrorResponse(response)) {
          const isUnAuthenticated = response.data.errors.some((error) =>
            error.message.includes(constants.MESSAGES.TOKEN_NOT_FOUND),
          );

          if (isUnAuthenticated) removeAccessToken();

          throw response.data.errors;
        }

        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
          removeAccessToken();
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
