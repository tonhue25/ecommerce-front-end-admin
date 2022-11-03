import { request_admin } from './base_url';

export const getListOrderDetailByOrder = async (orderId, page, size, importId, productId) => {
    const res = await request_admin.get(`/order-details/${orderId}`, {
        params: {
            page,
            size,
            importId,
            productId,
        },
    });
    return res;
};

export const deleteItem = async (orderId, productId) => {
    const res = await request_admin.delete(`/order-details`, {
        params: {
            orderId,
            productId,
        },
    });
    return res;
};
