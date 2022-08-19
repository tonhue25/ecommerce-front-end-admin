import { request_admin } from './base_url';

export const getDetailCart = async (cartId) => {
    const res = await request_admin.get(`/cart-details/${cartId}`);
    return res;
};
