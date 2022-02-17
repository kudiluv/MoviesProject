import axios from 'axios';
import {API_URL} from '@env';
import {useUser} from '../store/user.context';

const useAxiosInstance = () => {
  const {accessToken, setAccessToken} = useUser();
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: 'Bearer ' + accessToken,
      'Content-Type': 'application/json',
    },
  });
  instance.interceptors.response.use(
    response => response,
    async error => {
      setAccessToken?.('');
      return Promise.reject(error);
    },
  );
  return instance;
};

export {useAxiosInstance};
