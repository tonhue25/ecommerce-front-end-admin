import { useEffect, useState } from 'react';
import * as ProductService from '../../services/ProductService';
import { PAGE_ONE, PAGE_SIZE } from '../../services/constant';
import { Pagination } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import TopProductItem from './TopProductItem';
function TopProduct() {
    const [page, setPage] = useState(PAGE_ONE);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState();

    useEffect(() => {
        const getBestSellingProduct = async () => {
            const result = await ProductService.getBestSellingProduct(page, PAGE_SIZE);
            setProducts(result.data.list);
            setTotalPages(result.data.totalPages);
            return result.data.list;
        };
        getBestSellingProduct();
    }, [page]);

    function ShowProducts(products) {
        return products.map((item) => <TopProductItem key={item.productId} data={item} />);
    }

    function handleChange(page) {
        setPage(page);
    }

    return (
        <div className="main-panel">
            <ToastContainer />
            <div className="content">
                <div className="page-inner">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div className="col-md-6 col-lg-4">
                                            <h3>Top sản phẩm bán chạy</h3>
                                        </div>
                                        <div className="col-md-4 col-lg-6"></div>
                                        <div className="col-md-2 col-lg-2"></div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-4"></div>
                                        <br />
                                        <div className="col-md-4 col-lg-6"></div>
                                        <br />
                                        <div className="col-md-2 col-lg-2"></div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="display table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Mã</th>
                                                    <th>Ảnh</th>
                                                    <th>Tên sản phẩm</th>
                                                    <th></th>
                                                    <th>Số lượng tồn</th>
                                                    <th>Số lượng bán</th>
                                                    <th>Doanh thu</th>
                                                    <th>Bình luận</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>{ShowProducts(products)}</tbody>
                                        </table>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {totalPages > 1 ? (
                                            <Pagination
                                                color="primary"
                                                count={totalPages}
                                                size="large"
                                                page={page}
                                                showFirstButton
                                                showLastButton
                                                onChange={(e, page) => handleChange(page)}
                                            />
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TopProduct;
