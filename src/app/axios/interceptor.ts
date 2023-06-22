import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const apiConfig: any = {
  baseURL: process.env.NEXT_PUBLIC_URL,
};

const APi: AxiosInstance = axios.create(apiConfig);

const isRequest = (config: InternalAxiosRequestConfig) => {
  const { method, url } = config;

  config.headers['Content-Type'] = 'application/json';

  console.log(`[API] ${method?.toUpperCase()} ${url} |Request`);

  if (method === 'get') {
    config.timeout = 15000;
  }

  return config;
};
const isErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message } = error;
    const { status } = (error.response as AxiosResponse) ?? {};

    switch (status) {
      case 401: {
        alert(message);
        break;
      }
      case 403: {
        alert(message);
        break;
      }
      case 404: {
        alert(message);
        break;
      }
      case 500: {
        alert(message);
        break;
      }
      default: {
        break;
      }
    }
  } else {
    console.log(`[API] | Error ${error.message}`);
  }

  return Promise.reject(error);
};

const isResponse = (response: AxiosResponse) => {
  const { method, url } = response.config;
  const { status } = response;

  console.log(`[API] ${method?.toUpperCase()} ${url} |Request`);

  return response;
};

const setUpIntercepters = (instance: AxiosInstance) => {
  instance.interceptors.request.use(isRequest, isErrorResponse);
  instance.interceptors.response.use(isResponse, isErrorResponse);

  return instance;
};

export const axiosInterceptor = setUpIntercepters(APi);
