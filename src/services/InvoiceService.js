import { request_admin } from './base_url';

export const getOne = async (cartId) => {
    const res = await request_admin.get('/invoices', {
        params: {
            cartId,
        },
    });
    return res;
};
