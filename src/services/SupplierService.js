import { request_admin } from './base_url';

export const getAllSuppliers = async () => {
    const res = await request_admin.get('/suppliers');
    return res;
};
