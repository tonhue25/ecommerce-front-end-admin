import { request_public } from './base_url';
export const getAllStates = async () => {
    const res = await request_public.get('/states');
    return res;
};
