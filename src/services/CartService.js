import { request_user, request_admin } from './base_url';

export const getAllCarts = async (page, size, state, customer) => {
    const res = await request_admin.get(`/carts`, {
        params: {
            page,
            size,
            state,
            customer,
        },
    });
    return res;
};

export const changeState = async (cartId, statusChange) => {
    const res = await request_user.put(`/carts/${cartId}`, {
        params: {
            statusChange,
        },
    });
    return res;
};

export const getOne = async (id) => {
    const res = await request_admin.get(`/carts/${id}`);
    return res;
};
