import { request_admin } from './base_url';

export const getSupplyBySupplier = async (supplierId) => {
    const res = await request_admin.get(`/suppliers/${supplierId}`);
    return res;
};
