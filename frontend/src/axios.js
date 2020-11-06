import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'http://localhost:7089'
});

export default myAxios;
