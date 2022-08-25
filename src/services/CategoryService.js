import { request_admin, request_public } from './base_url';
export const getAllCategories = async () => {
    const res = await request_public.get('/categories');
    return res;
};

export const getListCategories = async (page, size, keyword) => {
    const res = await request_admin.get('/categories', {
        params: {
            page,
            size,
            keyword,
        },
    });
    return res;
};

export const getOne = async (id) => {
    const res = await request_public.get(`/categories/${id}`);
    return res;
};
