import { request_admin } from './base_url';

export const getList = async (page, size) => {
    const res = await request_admin.get('/discounts', {
        params: {
            page,
            size,
        },
    });
    return res;
};

export const getOne = async (id) => {
    const res = await request_admin.get(`/discounts/${id}`);
    return res;
};
