import { request_admin } from './base_url';

export const getOrders = async (page, size) => {
    const res = await request_admin.get('/orders', {
        params: {
            page,
            size,
        },
    });
    return res;
};
