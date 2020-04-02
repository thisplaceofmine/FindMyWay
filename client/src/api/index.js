import axios from 'axios';

export const server = axios.create({
  baseURL: 'http://localhost:5000/'
});

export const query =  axios.create({
  baseURL:
    'https://geodata.gov.hk/gs/api/v1.0.0/'
});

