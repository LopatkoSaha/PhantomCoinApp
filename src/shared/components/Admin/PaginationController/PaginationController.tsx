import { useState } from "react";

import style from "./PaginationController.module.scss";

type TProps = {
    length: number | null,
    currentPageNumber: number,
    quantityRowsOnPage: number,
    handlerPageNumber: (numberPage: number) => void,
    handleQuantityRows: (quantity: number) => void,
}

export const PaginationController = ({length, currentPageNumber, quantityRowsOnPage, handlerPageNumber, handleQuantityRows}: TProps) => {

    const pageSizeAll = [5, 10, 20];

    const [page, setPage] = useState<number | null>(null);
    const [pageSize, setPageSize] = useState<number>(quantityRowsOnPage);

    const quantityPages = length ? Math.ceil(length/quantityRowsOnPage) : 1;

    function mappedData(quantityPages: number, currentPage: number): (number | null)[] {
        const result: (number | null)[] = [];
      
        for (let i = 1; i <= quantityPages; i++) {
          const isFirst = i === 1;
          const isLast = i === quantityPages;
          const isNearCurrent =
            i >= currentPage - 1 && i <= currentPage + 1;
      
          const isDotsLeft = i === currentPage - 2;
          const isDotsRight = i === currentPage + 2;
      
          if (isFirst || isLast || isNearCurrent) {
            result.push(i);
          } else if (isDotsLeft || isDotsRight) {
            result.push(null);
          }
        }
      
        return result.filter((item, idx, arr) => {
          return !(item === null && arr[idx - 1] === null);
        });
      };

    const mappedDataResult = mappedData(quantityPages, currentPageNumber);

    function handleChangePage (e: React.MouseEvent<HTMLElement>) {
        const clickIdx = (e.target as HTMLDivElement).dataset.idx;
        if (clickIdx && +clickIdx !== currentPageNumber) {
            handlerPageNumber(+clickIdx);
            setPage(null);
        };
    };

    function handleChangePageInput (e: React.ChangeEvent<HTMLInputElement>) {
        const pageNumber = e.target.value;
        if (+pageNumber === 0) return;
        if (length && +pageNumber > Math.ceil(length/quantityRowsOnPage)) return;
        setPage(+pageNumber);
        handlerPageNumber(+pageNumber);
    };

    function handlePageSizeChange (event: React.ChangeEvent<HTMLSelectElement>) {
        setPageSize(+event.target.value);
        handleQuantityRows(+event.target.value);
        handlerPageNumber(1);
    };

    function getRandomIntExcluding(min: number, max: number, exclude: number): number {
        if (max - min <= 0 || (max - min === 1 && (exclude === min || exclude === max))) {
          return exclude === min ? max : min;
        }
      
        let rand: number;
        do {
          rand = Math.floor(Math.random() * (max - min + 1)) + min;
        } while (rand === exclude);

        return rand;
    };

    function setRandomPageNumber () {
        handlerPageNumber(getRandomIntExcluding(1, quantityPages, currentPageNumber));
        setPage(null);
    };

    return (
        <div className={style.paginationWrapper} onClick={handleChangePage}>
            <div className={style.pageSizeContainer}>
                <label htmlFor="pagesizeDropdown">Показывать по: </label>
                <select id="pagesizeDropdown" value={pageSize} onChange={handlePageSizeChange}>
                    {pageSizeAll.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>
            {mappedDataResult.length > 1 && mappedDataResult.map((item, idx) => {
                return (
                    <div
                        className={`${style.elem} ${item === currentPageNumber ? style.active : ""}`}
                        data-idx={item && item}
                        key={idx}
                    >
                        {item ? item : "..."}
                    </div>
                )
            })}
            {mappedDataResult.length > 1 &&
                <div className={style.inputContainer}>
                    <div className={style.inputTitle}>Выбор страницы:</div>
                    <input
                        type="number"
                        min={1}
                        max={length ? Math.ceil(length/quantityRowsOnPage) : 1}
                        value={Number(page) ? Number(page) : ''}
                        onChange={handleChangePageInput}
                    />
                    <button onClick={setRandomPageNumber}>Рандом</button>
                </div>
            }
        </div>
    )
}