import { request_admin } from './base_url';
export const getListEmployee = async (page, size, keyword, status, departmentId) => {
    const res = await request_admin.get('/employees', {
        params: {
            page,
            size,
            keyword,
            status,
            departmentId,
        },
    });
    return res;
};

export const getOne = async (id) => {
    const res = await request_admin.get(`/employees/${id}`);
    return res;
};

export const deleteItem = async (employeeId) => {
    const res = await request_admin.delete(`/employees/${employeeId}`);
    return res;
};
