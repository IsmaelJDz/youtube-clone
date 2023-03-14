import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_ENDPOINT;

const userBase = `${base}/api/users`;
const authBase = `${base}/api/auth`;

export function registerUser(payload: {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}) {
  return axios.post(userBase, payload).then(res => res.data);
}

export function loginUser(payload: {
  email: string;
  password: string;
}) {
  return axios
    .post(authBase, payload, {
      withCredentials: true,
    })
    .then(res => res.data);
}

export function getMe() {
  return axios
    .get(userBase, { withCredentials: true })
    .then(res => res.data)
    .catch(() => null);
}
