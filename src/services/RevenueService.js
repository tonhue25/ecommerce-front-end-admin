import { request_admin } from './base_url';

export const getRevenue = async (page, size, startDate, endDate) => {
    const res = await request_admin.get('/revenues', {
        params: {
            page,
            size,
            startDate,
            endDate,
        },
    });
    return res;
};
