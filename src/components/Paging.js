import * as Constant from '../../src/services/constant';

function PagingItem(page, totalPages, setPage) {
    const Items = [];
    for (let i = 1; i <= totalPages; ++i) {
        Items.push(
            <li className={page == i ? 'page-item active' : 'page-item'} key={i}>
                <a value={i} className="page-link" onClick={() => setPage(i)}>
                    {i}
                </a>
            </li>,
        );
    }

    const handleClickPrevious = () => {
        setPage(--page);
    };
    const handleClickNext = () => {
        setPage(++page);
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                <li className={page == Constant.PAGE_ONE ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={(e) => handleClickPrevious(e.target.value)}>
                        Trang trước
                    </a>
                </li>
                {Items}
                <li className={page == totalPages ? 'page-item disabled' : 'page-item'}>
                    <a className="page-link" onClick={(e) => handleClickNext(e.target.value)}>
                        Trang sau
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default PagingItem;
