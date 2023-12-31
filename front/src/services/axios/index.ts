import axios from 'axios';

const URI = 'http://localhost:3001/';

export const postData = async <T>(route: string, body: T) => {
  try {
    return axios.post(`${URI}${route}`, body);
  } catch (error) {
    console.error(error);
  }
};

export const getData = async (route: string) => {
  try {
    return axios.get(`${URI}${route}`);
  } catch (error) {
    console.error(error);
  }
};
