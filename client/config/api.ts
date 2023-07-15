import axios, { AxiosRequestConfig } from 'axios';

interface CustomHeaders {
  'Content-Type': string;
  Accept: string;
}

const config: AxiosRequestConfig = {
  baseURL: 'http://localhost:3001',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    // Authorization: `${process.env.BASIC}`,
  },
};

const axiosClient = axios.create(config);

export default axiosClient;
