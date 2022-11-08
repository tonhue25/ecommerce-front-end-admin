import { request_admin, request_public } from './base_url';
export const getOne = async (id) => {
    const res = await request_public.get(`/discount-details/${id}`);
    return res;
};

export const getListDiscountDetail = async (discountId) => {
    const res = await request_admin.get(`/discount-details`, {
        params: {
            discountId,
        },
    });
    return res;
};
