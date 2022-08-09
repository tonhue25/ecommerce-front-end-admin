import { request_user } from './base_url';

export const getAllCarts = async (state) => {
    const res = await request_user.get(`/carts/all`, {
        params: {
            state: state,
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
