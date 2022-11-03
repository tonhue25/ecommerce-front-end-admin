import { request_admin } from './base_url';

export const getListImportDetailByImport = async (importId, page, size) => {
    const res = await request_admin.get(`/import-details`, {
        params: {
            importId,
            page,
            size,
        },
    });
    return res;
};
