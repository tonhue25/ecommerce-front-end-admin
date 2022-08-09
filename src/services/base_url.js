import axios from 'axios';

export const public_url = 'http://localhost:8080/api/public';

export const user_url = 'http://localhost:8080/api/user';

export const admin_url = 'http://localhost:8080/api/admin';

export const request_public = axios.create({
    baseURL: public_url,
});

export const request_user = axios.create({
    baseURL: user_url,
});

export const request_admin = axios.create({
    baseURL: admin_url,
});
