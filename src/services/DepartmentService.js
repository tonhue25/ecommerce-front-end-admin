import { request_admin } from './base_url';

export const getAllDepartments = async () => {
    const res = await request_admin.get('/departments');
    return res;
};
