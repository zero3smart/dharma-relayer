import React from 'react';

export default function (props) {
    let { offset, totalItemsCount, pageSize, visiblePagesCount, onPageClick } = props;

    let pagesTotal = parseInt(totalItemsCount / pageSize, 10);
    pagesTotal = (totalItemsCount / pageSize - pagesTotal) > 0 ? pagesTotal + 1 : pagesTotal;
    let currentPageNum = Math.floor(offset / pageSize);

    let prevDisabled = currentPageNum <= 0;
    let nextDisabled = currentPageNum >= (pagesTotal - 1);

    let firstShownPage = 0;
    if (pagesTotal > visiblePagesCount) {
        firstShownPage = currentPageNum - parseInt(visiblePagesCount / 2, 10);
        firstShownPage = firstShownPage < 0 ? 0 : firstShownPage;
    }

    let showPagesCount = (pagesTotal - firstShownPage) < visiblePagesCount ? (pagesTotal - firstShownPage) : visiblePagesCount;
    let pages = Object.keys(new Int8Array(showPagesCount)).map(n => Number(n) + firstShownPage);

    return (
        <nav aria-label="Page navigation" className="text-center">
            <ul className="pagination">
                <li className={'page-item ' + (prevDisabled ? 'disabled' : '')} >
                    <a className="page-link" href="javascript:void(0)" aria-label="Previous" onClick={() => !prevDisabled && onPageClick(currentPageNum - 1)}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pages.map((pageNum, index) => {
                    return (
                        <li key={index} className={'page-item ' + (currentPageNum === pageNum ? 'active' : '')} onClick={() => onPageClick(pageNum)}>
                            <a className="page-link" href="javascript:void(0)">{pageNum + 1}</a>
                        </li>
                    );
                })}
                <li className={'page-item ' + (nextDisabled ? 'disabled' : '')}>
                    <a className="page-link" href="javascript:void(0)" aria-label="Next" onClick={() => !nextDisabled && onPageClick(currentPageNum + 1)} >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
}