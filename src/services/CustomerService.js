import { request_admin, request_user } from './base_url';
export const getListCustomers = async (page, size, keyword, status) => {
    const res = await request_admin.get('/customers', {
        params: {
            page,
            size,
            keyword,
            status,
        },
    });
    return res;
};

export const getOne = async (id) => {
    const res = await request_user.get(`/customers/${id}`);
    return res;
};

export const deleteItem = async (customerId) => {
    const res = await request_admin.delete('/customers' + `/${customerId}`);
    return res;
};
