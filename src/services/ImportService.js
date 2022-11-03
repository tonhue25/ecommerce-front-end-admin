import { request_admin } from './base_url';

export const getImports = async (page, size) => {
    const res = await request_admin.get('/imports', {
        params: {
            page,
            size,
        },
    });
    return res;
};
