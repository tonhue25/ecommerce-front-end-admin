export const PAGE_ONE = 1;
export const PAGE_SIZE = 6;
export const PRODUCT_ACTIVE = 1;
export const PRODUCT_INACTIVE = 0;

export const ALL = 0;
export const INACTIVE = 1;
export const ACTIVE = 2;
export const WAIT = 3;
export const PAID = 4;
export const DELIVERING = 5;
export const DELIVERED = 6;
export const CANCEL = 7;
export const COMMENTED = 8;

export function convertState(state) {
    let result = '';
    if (state == 1) {
        result = 'Đã xóa';
    } else if (state == 2) {
        result = 'Đang hoạt động';
    } else if (state == 3) {
        result = 'Chờ xác nhận';
    } else if (state == 4) {
        result = 'Đã thanh toán';
    } else if (state == 5) {
        result = 'Đang vận chuyển';
    } else if (state == 6) {
        result = 'Đã giao';
    } else if (state == 7) {
        result = 'Đã hủy';
    } else if (state == 8) {
        result = 'Đã nhận xét';
    }
    return result;
}
