import axios from 'axios';
import { AsyncStorage } from 'react-native';

const instance =  axios.create({
  baseURL: 'http://1c95cc65.ngrok.io'
});

instance.interceptors.request.use(
  async (config) => { // called automatically when making a request
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // To be recognized as a particular user
    }
    return config;
  },
  (err) => { // called automatically when there is an error
    return Promise.reject(err)
  }
);

export default instance;
