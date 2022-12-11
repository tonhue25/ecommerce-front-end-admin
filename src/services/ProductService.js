import { request_admin, request_public } from './base_url';

export const getOne = async (id) => {
    const res = await request_public.get(`/products/${id}`);
    return res;
};

export const getListProduct = async (page, size, status, keyword, categoryId) => {
    const res = await request_public.get('/products', {
        params: {
            page,
            size,
            status,
            keyword,
            categoryId,
        },
    });
    return res;
};

export const deleteItem = async (id) => {
    const res = await request_admin.delete('/products' + `/${id}`);
    return res;
};

export const getPoint = async (productId) => {
    const res = await request_public.get('/comments/points', {
        params: {
            productId,
        },
    });
    return res;
};

export const getProductByCategory = async (categoryId) => {
    const res = await request_admin.get(`/products/${categoryId}`);
    return res;
};

export const getBestSellingProduct = async (page, size, startDate, endDate) => {
    const res = await request_admin.get('/products/best-selling-product', {
        params: {
            page,
            size,
            startDate,
            endDate,
        },
    });
    return res;
};

export const getListForDiscountProduct = async (discountId) => {
    const res = await request_admin.get('/products/list_for_discount', {
        params: {
            discountId,
        },
    });
    return res;
};
