import { request_public } from './base_url';
export const getOne = async (id) => {
    const res = await request_public.get(`/discount-details/${id}`);
    return res;
};
