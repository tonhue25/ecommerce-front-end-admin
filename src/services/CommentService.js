import { request_public, request_admin } from './base_url';
export const getListComment = async (productId, page, size, point) => {
    const res = await request_public.get(`/comments/${productId}`, {
        params: {
            page,
            size,
            point,
        },
    });
    return res;
};

export const deleteItem = async (id) => {
    const res = await request_admin.delete('/comments' + `/${id}`);
    return res;
};
