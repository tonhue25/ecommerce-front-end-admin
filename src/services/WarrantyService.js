import { request_admin, request_public } from './base_url';

export const getOne = async (employeeId, productId) => {
    const res = await request_admin.get('/warranties', {
        params: {
            employeeId,
            productId,
        },
    });
    return res;
};
