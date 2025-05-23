import React, { useState, useEffect } from "react";

import style from "./TableCommonLine.module.scss";
import { PaginationController } from "../PaginationController/PaginationController";

type TProps<T extends Record<string, string | number| boolean>> = {
  data: T[];
  matcher: Record<keyof T, {title: string, isSort: boolean}>;
  renderLine: (item: T) => JSX.Element;
};

export function TableCommon<T extends Record<string, string | number| boolean>>({ data, matcher, renderLine }: TProps<T>)  {

  type TSort = {
    field: keyof T;
    order: "asc" | "desc" | "";
  };

  const [pageNumber, setPageNumber] = useState<number>(1);
  const [quantityRowsOnPage, setQuantityRowsOnPage] = useState<number>(5);
  const [sort, setSort] = useState<TSort>({field: Object.keys(matcher)[0], order: ""});

  let sortData = data && data.sort((a, b) => {
    if (typeof +a[sort.field] === "number" && typeof +b[sort.field] === "number") {
      return +a[sort.field] - +b[sort.field];
    }
    return a[sort.field].toString().localeCompare(b[sort.field].toString());
  });

  if (sortData && sort.order === "desc") {
    sortData = sortData.reverse();
  }

  const slicedData = sortData.slice(pageNumber * quantityRowsOnPage - quantityRowsOnPage, pageNumber * quantityRowsOnPage);

  function handlerPageNumber (numberPage: number) {
      setPageNumber(numberPage);
  };
  
  function handleQuantityRows (quantity: number) {
    setQuantityRowsOnPage(quantity);
  };

  const handleSort = (field: keyof T) => {
    setPageNumber(1);
    if(field === sort.field) {
      if(sort.order === "asc") {
        return setSort({field, order: "desc"});
      }
      if (sort.order === "desc") {
        return setSort({field, order: ""});
      }
    }
    return setSort({field, order: "asc"});
  };
  
  const paginationProps = {
    length: data?.length ?? null,
    currentPageNumber: pageNumber,
    quantityRowsOnPage: quantityRowsOnPage,
    handlerPageNumber,
    handleQuantityRows
  };

  return (
      <div className={style.wrapper}>
        <div className={style.tableHeader}>
          {Object.keys(matcher).map((name, idx) => {
            const value = matcher[name];
            return (
              <div
                key={idx}
                className={`${style.cellHeader} ${style.clickabel} ${sort.field === name ? style[sort.order] : ""}`}
                onClick={() => value.isSort && handleSort(name)}
              >
                {value.title}
              </div>
            );
          })}
          <div className={style.cellHeader}></div>
        </div>
        <div className={style.content}>
          {slicedData.map((item, idx) => 
              <React.Fragment key={idx}>
                  {renderLine(item)}
              </React.Fragment>
          )}
        </div>
        <PaginationController {...paginationProps} />
      </div>
    );
  }