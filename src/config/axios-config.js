import axios from 'axios';
import { environment } from './environment';

let jwt = '';
export const coiUserClient = axios.create({
  baseURL: environment.coiUserContext,
  headers: {
    'Content-Type': 'application/json'
  }
});
export const coiFeedbackClient = axios.create({
  baseURL: environment.coiFeedbackContext,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Create interceptor to add the token into the header for every request
coiUserClient.interceptors.request.use((config) => {
  config.headers.Authorization = jwt
  return config;
});
coiFeedbackClient.interceptors.request.use((config) => {
  config.headers.Authorization = jwt
  return config;
});
export function refreshJwt(newJwt: string) {
  jwt = newJwt;
}
