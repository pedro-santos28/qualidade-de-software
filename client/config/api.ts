import axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `${process.env.BASIC}`,
  },
};

const axiosClient = axios.create(config);
export default axiosClient;

export const fetcher = (url: string) => axiosClient.get(url).then((res) => res.data);
